resource "helm_release" "kube_prometheus_stack" {
  name       = "kube-prometheus-stack"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = "ops-monitoring"
  create_namespace = true

  set {
    name  = "grafana.adminPassword"
    value = var.grafana_password
  }

  set {
    name  = "prometheus.prometheusSpec.retention"
    value = "30d" # Operations needs longer retention for post-mortems
  }
  
  set {
    name  = "alertmanager.config.global.slack_api_url"
    value = var.slack_webhook_url
  }
}
