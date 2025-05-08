#!/usr/bin/env python3
"""
Script to export per-session Scaphandre energy metrics for all active JupyterHub singleuser pods.
Detects pods in the "jhub" namespace with label "component=singleuser-server",
fetches the power consumption metric from Prometheus over each pod's lifetime,
and writes a CSV file per pod.

Requirements:
  pip install kubernetes prometheus_api_client pandas

Usage:
  export PROM_URL=http://<prometheus-host>:9090
  python export_scaphandre_metrics.py [--namespace jhub] [--output-dir ./metrics]
"""
import os
import argparse
from datetime import datetime, timezone
from kubernetes import client, config
from prometheus_api_client import PrometheusConnect
import pandas as pd

def main():
    parser = argparse.ArgumentParser(
        description="Export Scaphandre metrics per JupyterHub singleuser pod."
    )
    parser.add_argument(
        "--namespace", default="jhub",
        help="Kubernetes namespace where JupyterHub runs"
    )
    parser.add_argument(
        "--output-dir", default="./metrics",
        help="Directory to write CSV files into"
    )
    args = parser.parse_args()

    # prometheus_url = os.environ.get("PROM_URL")
    prometheus_url = "http://localhost:3000" # temporary for testing
    if not prometheus_url:
        raise RuntimeError("Please set PROM_URL environment variable to your Prometheus endpoint")

    # Load Kubernetes config
    try:
        config.load_kube_config()
    except:
        config.load_incluster_config()

    v1 = client.CoreV1Api()
    prom = PrometheusConnect(url=prometheus_url, disable_ssl=True)

    # Ensure output directory exists
    os.makedirs(args.output_dir, exist_ok=True)

    # Discover all Scaphandre metric names
    all_metric_names = prom.get_label_values(label_name="__name__")
    scaph_metrics = [m for m in all_metric_names if m.startswith("scaph_")]
    print(f"Found Scaphandre metrics: {scaph_metrics}")

    # List all singleuser-server pods
    pods = v1.list_namespaced_pod(
        namespace=args.namespace,
        label_selector="component=singleuser-server"
    ).items

    for pod in pods:
        pod_name = pod.metadata.name
        start_ts = pod.metadata.creation_timestamp
        end_ts = pod.metadata.deletion_timestamp or datetime.now(timezone.utc)
        print(f"Processing pod {pod_name} from {start_ts} to {end_ts}")

        # Create directory for this pod
        pod_dir = os.path.join(args.output_dir, pod_name)
        os.makedirs(pod_dir, exist_ok=True)

        for metric in scaph_metrics:
            try:
                data = prom.get_metric_range_data(
                    metric_name=metric,
                    start_time=start_ts,
                    end_time=end_ts,
                    label_config={"pod": pod_name}
                )
            except Exception as e:
                print(f"Failed to fetch {metric} for {pod_name}: {e}")
                continue

            if not data:
                print(f"No data for {metric} in {pod_name}")
                continue

            # Assume a single timeseries per metric/pod
            series = data[0]
            rows = []
            for ts, val in series.get('values', []):
                timestamp = datetime.fromtimestamp(float(ts), tz=timezone.utc)
                rows.append({'timestamp': timestamp, metric: float(val)})

            df = pd.DataFrame(rows)
            csv_file = os.path.join(pod_dir, f"{metric}.csv")
            df.to_csv(csv_file, index=False)
            print(f"Written {len(df)} points for {metric} to {csv_file}")

if __name__ == '__main__':
    main()