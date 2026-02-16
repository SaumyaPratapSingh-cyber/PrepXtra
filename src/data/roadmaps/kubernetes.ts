
import { RoadmapTrack } from './types';

export const kubernetesRoadmap: RoadmapTrack = {
    id: 'kubernetes',
    title: 'Kubernetes',
    description: 'Master container orchestration at scale',
    category: 'skill-based',
    icon: '☸️',
    accentColor: '#326ce5',
    rootNodeId: 'k8s-root',
    nodes: {
        'k8s-root': {
            id: 'k8s-root',
            label: 'Kubernetes Mastery',
            description: 'Learn to deploy, scale, and manage containerized applications in production.',
            children: ['k8s-basics', 'k8s-workloads', 'k8s-networking', 'k8s-storage', 'k8s-operations'],
            resources: [
                { type: 'documentation', title: 'Kubernetes Official Docs', url: 'https://kubernetes.io/docs/', isFree: true },
                { type: 'video', title: 'Kubernetes Course - TechWorld by Nana', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', isFree: true },
                { type: 'article', title: 'Kubernetes The Hard Way', url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way', isFree: true },
                { type: 'course', title: 'CKA Certification Course', url: 'https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/', isFree: false }
            ],
            content: {
                overview: 'Kubernetes (K8s) is the industry standard for container orchestration — it automates the deployment, scaling, and management of containerized applications. While Docker lets you run a single container, Kubernetes manages thousands of containers across a cluster of machines. It handles self-healing (restarting failed containers), horizontal scaling (adding more replicas when load increases), rolling updates (deploying new versions without downtime), service discovery (containers finding each other), and load balancing. Originally developed by Google based on their internal system (Borg), Kubernetes was open-sourced in 2014 and is now maintained by the Cloud Native Computing Foundation (CNCF). Every major cloud provider (AWS EKS, Google GKE, Azure AKS) offers managed Kubernetes services.',
                keyConcepts: [
                    'Cluster architecture: control plane and worker nodes',
                    'Pods: the smallest deployable unit',
                    'Deployments for managing replicas and rollouts',
                    'Services for networking and load balancing',
                    'Namespaces for resource isolation',
                    'ConfigMaps and Secrets for configuration',
                    'Persistent Volumes for stateful storage',
                    'kubectl: the Kubernetes command-line tool'
                ],
                practiceQuestions: [
                    { question: 'What is a Pod and why is it not just a container?', hint: 'A Pod can contain one or more containers that share networking and storage. It is the atomic unit K8s manages.', difficulty: 'easy' },
                    { question: 'How does K8s achieve self-healing?', hint: 'It continuously compares desired state with actual state and takes action (restart, reschedule) to reconcile them.', difficulty: 'medium' },
                    { question: 'What is the difference between a Deployment and a StatefulSet?', hint: 'Deployments are for stateless apps (web servers). StatefulSets are for stateful apps (databases) with stable network IDs and persistent storage.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use managed Kubernetes (EKS, GKE, AKS) instead of self-hosting for production.',
                    'Always set resource requests and limits on pods.',
                    'Use namespaces to separate environments (dev, staging, prod).',
                    'Store all K8s manifests in version control.',
                    'Use Helm charts for packaging and deploying complex applications.',
                    'Implement health checks (liveness and readiness probes) on every service.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'K8s Concepts', description: 'Architecture and core objects.', tasks: ['Set up a local cluster with minikube or kind', 'Learn about Pods, Deployments, and Services', 'Deploy a sample app with kubectl'] },
                { day: 2, title: 'Workloads & Networking', description: 'Managing applications in K8s.', tasks: ['Create Deployments with replicas and rolling updates', 'Expose services with ClusterIP, NodePort, and LoadBalancer', 'Use ConfigMaps and Secrets for configuration'] },
                { day: 3, title: 'Production Readiness', description: 'Storage, monitoring, and Helm.', tasks: ['Set up persistent volumes for a database', 'Implement liveness and readiness probes', 'Deploy a multi-service app using Helm'] }
            ]
        },
        'k8s-basics': {
            id: 'k8s-basics',
            label: 'Architecture & Basics',
            description: 'Cluster components, Pods, kubectl, and the declarative model.',
            parentId: 'k8s-root',
            resources: [
                { type: 'documentation', title: 'K8s Concepts', url: 'https://kubernetes.io/docs/concepts/', isFree: true }
            ],
            content: {
                overview: 'A Kubernetes cluster has two main parts: the control plane and worker nodes. The control plane runs the API server (the interface for all operations), the scheduler (decides where to place pods), the controller manager (ensures desired state matches actual state), and etcd (a key-value store for all cluster data). Worker nodes run the kubelet (an agent that manages pods on the node) and kube-proxy (handles networking). The fundamental concept is declarative configuration: you write YAML manifests describing your desired state (I want 3 replicas of my web app), submit them to the API server with kubectl apply, and Kubernetes continuously works to make reality match your declaration. This is different from imperative commands where you tell Kubernetes exactly what to do step by step.',
                keyConcepts: [
                    'Control plane: API server, scheduler, controller manager, etcd',
                    'Worker nodes: kubelet and kube-proxy',
                    'Declarative vs imperative management',
                    'YAML manifests: apiVersion, kind, metadata, spec',
                    'kubectl: apply, get, describe, delete, logs, exec',
                    'Namespaces for logical isolation',
                    'Labels and selectors for organizing resources',
                    'Contexts for managing multiple clusters'
                ],
                practiceQuestions: [
                    { question: 'What is etcd and why is it critical?', hint: 'It is the key-value store that holds all cluster state. If etcd is lost, the cluster loses its configuration.', difficulty: 'medium' },
                    { question: 'What does kubectl apply -f do?', hint: 'It creates or updates resources defined in a YAML file to match the desired state.', difficulty: 'easy' },
                    { question: 'What are labels in Kubernetes?', hint: 'Key-value pairs attached to resources for organization and selection (e.g., app: frontend, env: production).', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always use declarative YAML files (kubectl apply) over imperative commands.',
                    'Use labels consistently to organize and select resources.',
                    'Use separate namespaces for different teams or environments.',
                    'Back up etcd regularly in production clusters.'
                ]
            }
        },
        'k8s-workloads': {
            id: 'k8s-workloads',
            label: 'Workloads',
            description: 'Deployments, StatefulSets, DaemonSets, Jobs, and CronJobs.',
            parentId: 'k8s-root',
            resources: [
                { type: 'documentation', title: 'K8s Workloads', url: 'https://kubernetes.io/docs/concepts/workloads/', isFree: true }
            ],
            content: {
                overview: 'Kubernetes provides several workload types for different use cases. Deployments are the most common — they manage a set of identical pods (replicas) and handle rolling updates and rollbacks. StatefulSets are for stateful applications like databases that need stable network identities and persistent storage. DaemonSets ensure that a pod runs on every node in the cluster (useful for logging agents and monitoring). Jobs run a task to completion (like a batch process), and CronJobs run jobs on a schedule. Each workload type has specific lifecycle management, scaling behavior, and update strategies suited to its use case.',
                keyConcepts: [
                    'Deployments: replicas, rolling updates, rollbacks',
                    'ReplicaSets (managed by Deployments)',
                    'StatefulSets for stateful applications',
                    'DaemonSets for per-node workloads',
                    'Jobs for one-time tasks',
                    'CronJobs for scheduled tasks',
                    'Pod lifecycle: Pending, Running, Succeeded, Failed',
                    'Init containers and sidecar containers'
                ],
                practiceQuestions: [
                    { question: 'When would you use a StatefulSet instead of a Deployment?', hint: 'When pods need stable network identities, ordered deployment, and persistent storage (like databases).', difficulty: 'medium' },
                    { question: 'What is a DaemonSet?', hint: 'A workload that ensures one pod runs on every node. Common for log collectors like Fluentd or monitoring agents.', difficulty: 'medium' },
                    { question: 'What is an init container?', hint: 'A container that runs before the main containers in a pod, used for setup tasks like waiting for a database to be ready.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use Deployments for stateless workloads, StatefulSets for stateful ones.',
                    'Set maxSurge and maxUnavailable for controlled rolling updates.',
                    'Use Jobs for database migrations and batch processing.',
                    'Always define resource requests and limits for every container.'
                ]
            }
        },
        'k8s-networking': {
            id: 'k8s-networking',
            label: 'Networking & Services',
            description: 'Services, Ingress, DNS, network policies, and load balancing.',
            parentId: 'k8s-root',
            resources: [
                { type: 'documentation', title: 'K8s Services', url: 'https://kubernetes.io/docs/concepts/services-networking/', isFree: true }
            ],
            content: {
                overview: 'Kubernetes networking follows a flat network model where every pod gets its own IP address and can communicate with every other pod. Services provide stable networking endpoints for a set of pods (since pod IPs change when pods restart). ClusterIP services are only reachable within the cluster. NodePort services expose a port on every node. LoadBalancer services provision a cloud load balancer. Ingress resources manage external HTTP/HTTPS access to services, handling routing rules, TLS termination, and virtual hosting. Network Policies act as firewalls, controlling which pods can communicate with each other.',
                keyConcepts: [
                    'Flat pod networking: every pod has a unique IP',
                    'Service types: ClusterIP, NodePort, LoadBalancer, ExternalName',
                    'Selectors: how Services discover Pods',
                    'Ingress controllers and Ingress resources',
                    'DNS in K8s: service-name.namespace.svc.cluster.local',
                    'Network Policies for traffic control',
                    'Service Mesh (Istio, Linkerd) for advanced networking'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between ClusterIP and LoadBalancer Service types?', hint: 'ClusterIP is internal-only; LoadBalancer provisions an external cloud load balancer.', difficulty: 'easy' },
                    { question: 'What is an Ingress controller?', hint: 'A reverse proxy (like Nginx or Traefik) that reads Ingress resources and routes external traffic to services.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use Ingress for HTTP/HTTPS routing instead of exposing each service with LoadBalancer.',
                    'Implement Network Policies to restrict pod-to-pod communication.',
                    'Use headless services for StatefulSets that need per-pod DNS names.',
                    'Choose an Ingress controller (Nginx, Traefik, or cloud-specific) early.'
                ]
            }
        },
        'k8s-storage': {
            id: 'k8s-storage',
            label: 'Storage & Config',
            description: 'PersistentVolumes, PersistentVolumeClaims, ConfigMaps, and Secrets.',
            parentId: 'k8s-root',
            resources: [
                { type: 'documentation', title: 'K8s Storage', url: 'https://kubernetes.io/docs/concepts/storage/', isFree: true }
            ],
            content: {
                overview: 'Containers are ephemeral by default — when they restart, all data is lost. Kubernetes provides PersistentVolumes (PV) and PersistentVolumeClaims (PVC) for durable storage. A PV is a piece of storage in the cluster (could be a cloud disk, NFS, or local storage). A PVC is a request for storage by a pod. StorageClasses enable dynamic provisioning — when a PVC is created, the storage is automatically provisioned. ConfigMaps store non-sensitive configuration (like API URLs), and Secrets store sensitive data (like passwords and API keys). Both can be mounted as files or exposed as environment variables in pods.',
                keyConcepts: [
                    'PersistentVolumes (PV) and PersistentVolumeClaims (PVC)',
                    'StorageClasses for dynamic provisioning',
                    'Access modes: ReadWriteOnce, ReadOnlyMany, ReadWriteMany',
                    'ConfigMaps for application configuration',
                    'Secrets for sensitive data (base64 encoded)',
                    'Volume mounts and subPaths',
                    'EmptyDir for temporary shared storage between containers'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a PV and a PVC?', hint: 'PV is the actual storage resource; PVC is a request for storage that binds to an available PV.', difficulty: 'easy' },
                    { question: 'Are Kubernetes Secrets truly secure?', hint: 'They are base64 encoded, not encrypted by default. You should enable encryption at rest and use external secret managers for real security.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use StorageClasses with dynamic provisioning instead of manually creating PVs.',
                    'Use external secret managers (Vault, AWS Secrets Manager) for production secrets.',
                    'Set appropriate access modes based on your workload needs.',
                    'Use ConfigMaps for environment-specific settings that change between deployments.'
                ]
            }
        },
        'k8s-operations': {
            id: 'k8s-operations',
            label: 'Operations & Helm',
            description: 'Monitoring, logging, Helm charts, and cluster management.',
            parentId: 'k8s-root',
            resources: [
                { type: 'documentation', title: 'Helm Documentation', url: 'https://helm.sh/docs/', isFree: true },
                { type: 'article', title: 'Prometheus + Grafana on K8s', url: 'https://prometheus.io/docs/introduction/overview/', isFree: true }
            ],
            content: {
                overview: 'Running Kubernetes in production requires monitoring, logging, and package management. Helm is the package manager for Kubernetes — it bundles multiple K8s manifests into "charts" that can be installed, upgraded, and rolled back with a single command. Prometheus collects metrics from your pods and cluster, and Grafana visualizes them in dashboards. Centralized logging with tools like Fluentd or Loki aggregates logs from all pods into a searchable system. Health checks (liveness and readiness probes) let Kubernetes detect and recover from application failures. Horizontal Pod Autoscaler (HPA) automatically scales pods based on CPU/memory usage or custom metrics.',
                keyConcepts: [
                    'Helm: charts, values, releases, and repositories',
                    'Liveness probes: restart unresponsive containers',
                    'Readiness probes: control when traffic is sent to a pod',
                    'Horizontal Pod Autoscaler (HPA)',
                    'Prometheus for metrics collection',
                    'Grafana for dashboards and visualization',
                    'Centralized logging with Fluentd/Loki',
                    'Resource quotas and limit ranges'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a liveness probe and a readiness probe?', hint: 'Liveness: is the container alive? (restart if not). Readiness: can the container handle traffic? (remove from service if not).', difficulty: 'medium' },
                    { question: 'What is a Helm chart?', hint: 'A package of pre-configured Kubernetes resources (like a template) that can be installed with a single command.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Define liveness and readiness probes for every service.',
                    'Use Helm for repeatable, version-controlled deployments.',
                    'Set up monitoring (Prometheus + Grafana) from day one.',
                    'Use HPA for services with variable traffic patterns.',
                    'Centralize logs for easy debugging across all pods.'
                ]
            }
        }
    }
};
