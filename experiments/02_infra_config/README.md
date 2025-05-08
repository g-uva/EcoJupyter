### GreenDIGIT Infra config
This is a configuration for the server: https://mc-a4.lab.uvalight.net/.

- [ ] Move this to a separate repository.

> The reference for the steps come from the official Zero to Jupyter documentation.
1. Install Helm.
2. Install Kubernetes and `kubectl`.
3. Install all the repositories from Helm using the `yaml` files.
```sh
# -------------
# JupyterHub chart installation.
# -------------
helm install jhub jupyterhub/jupyterhub \
-n jhub --create-namespace \
--values ./jhub-config.yaml # Point to the configuration file for JupyterHub.

# -------------
# Monitoring (Prometheus + Grafana) chart installation.
# -------------
helm install monitoring prometheus-community/kube-prometheus-stack \
-n monitoring --create-namespace \
--values ./monitoring-config.yaml # Point to the configuration file for Monitoring.
```
4. Apply PodMonitor and Nginx configurations.
5. The app should be ready to use! 👍