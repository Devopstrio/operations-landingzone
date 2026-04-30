resource "aws_eks_cluster" "ops_cluster" {
  name     = "ops-landingzone-cluster-${var.environment}"
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = var.subnet_ids
    endpoint_private_access = true
    endpoint_public_access  = false # Operations systems must not be public
  }

  tags = {
    Name        = "ops-landingzone-cluster-${var.environment}"
    Environment = var.environment
    Platform    = "Operations"
  }
}

resource "aws_eks_node_group" "ops_nodes" {
  cluster_name    = aws_eks_cluster.ops_cluster.name
  node_group_name = "ops-system-nodes"
  node_role_arn   = aws_iam_role.eks_node_role.arn
  subnet_ids      = var.subnet_ids

  scaling_config {
    desired_size = 3
    max_size     = 10
    min_size     = 3
  }

  instance_types = ["m5.large"] # Ops tooling needs compute

  tags = {
    Name = "ops-system-nodes"
  }
}
