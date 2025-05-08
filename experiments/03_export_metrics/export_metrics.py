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

    prometheus_url = os.environ.get("PROM_URL")
    if not prometheus_url:
        raise RuntimeError("Please set PROM_URL environment variable to your Prometheus endpoint")

    # Load Kubernetes config (from ~/.kube/config or in-cluster)
    try:
        config.load_kube_config()
    except:
        config.load_incluster_config()

    v1 = client.CoreV1Api()
    prom = PrometheusConnect(url=prometheus_url, disable_ssl=True)

    # Ensure output directory exists
    os.makedirs(args.output_dir, exist_ok=True)

    # List singleuser pods
    pods = v1.list_namespaced_pod(
        namespace=args.namespace,
        label_selector="component=singleuser-server"
    ).items

    for pod in pods:
        pod_name = pod.metadata.name
        creation_ts = pod.metadata.creation_timestamp
        # Use deletion timestamp if pod is terminated
        end_ts = pod.metadata.deletion_timestamp or datetime.now(timezone.utc)

        print(f"Processing pod {pod_name}, start {creation_ts}, end {end_ts}")

        # Query Prometheus for scaphandre power consumption metric
        metric_name = "scaph_process_power_consumption_microwatts"
        try:
            data = prom.get_metric_range_data(
                metric_name=metric_name,
                start_time=creation_ts,
                end_time=end_ts,
                label_config={"pod": pod_name}
            )
        except Exception as e:
            print(f"Failed to fetch metrics for {pod_name}: {e}")
            continue

        # Transform into DataFrame
        # data is list of dicts: {'metric': {...}, 'values': [(ts, val), ...]}
        if not data:
            print(f"No data for {pod_name}")
            continue

        # We assume single time series per pod
        series = data[0]
        rows = []
        for ts, val in series.get('values', []):
            # Prom API returns ts as string of epoch float
            timestamp = datetime.fromtimestamp(float(ts), tz=timezone.utc)
            rows.append({'timestamp': timestamp, 'value_microwatts': float(val)})

        df = pd.DataFrame(rows)
        csv_path = os.path.join(args.output_dir, f"{pod_name}.csv")
        df.to_csv(csv_path, index=False)
        print(f"Written {len(df)} metric points to {csv_path}")

if __name__ == "__main__":
    main()
