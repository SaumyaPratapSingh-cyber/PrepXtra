
import { RoadmapTrack } from './types';

export const devopsRoadmap: RoadmapTrack = {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Step by step guide to becoming a DevOps Engineer in 2025',
    category: 'role-based',
    icon: '🔄',
    accentColor: '#6366f1',
    rootNodeId: 'devops-root',
    nodes: {
        'devops-root': {
            id: 'devops-root',
            label: 'DevOps Engineer',
            description: 'Mastering the cultural philosophy, practices, and tools that automate and integrate the processes between software development and IT teams.',
            children: ['os-fundamentals', 'scripting', 'networking-basics'],
            resources: [
                { type: 'article', title: 'Roadmap.sh - DevOps', url: 'https://roadmap.sh/devops', isFree: true },
                { type: 'video', title: 'What is DevOps? - IBM Technology', url: 'https://www.youtube.com/watch?v=0yWAtQ6wX5k', isFree: true },
                { type: 'course', title: 'Google Professional Cloud DevOps Engineer', url: 'https://www.cloudskillsboost.google/paths/20', isFree: true },
                { type: 'article', title: 'The Phoenix Project - A Novel About IT and DevOps', url: 'https://itrevolution.com/book/the-phoenix-project/', isFree: false }
            ],
            content: {
                overview: 'DevOps is more than just a job title; it is a cultural shift and a set of practices designed to shorten the systems development life cycle and provide continuous delivery with high software quality. It focuses on breaking down the traditional silos between "Dev" (who build features) and "Ops" (who maintain stability). \n\nAs a DevOps Engineer, you are responsible for building the automated "highway" that code travels on from a developer\'s laptop to production. This involves mastering CI/CD pipelines, containerization, Infrastructure as Code (IaC), and advanced monitoring. Success in this role requires a "You build it, you run it" mindset and a relentless focus on automation to eliminate manual, error-prone tasks (Toil).',
                keyConcepts: [
                    'Continuous Integration (CI) and Continuous Deployment (CD)',
                    'Infrastructure as Code (IaC) and GitOps',
                    'Microservices Architecture and Decoupling',
                    'Containerization (Docker) and Orchestration (Kubernetes)',
                    'Site Reliability Engineering (SRE): Error Budgets and SLAs',
                    'Monitoring, Logging, and Distributed Tracing (Observability)',
                    'Security Integration: DevSecOps and "Shifting Left"',
                    'Cultural Philosophy: Collaboration, Automation, and Lean'
                ],
                practiceQuestions: [
                    { question: 'What is "Toil" in the context of SRE/DevOps?', hint: 'Repetitive, manual work that can be automated.', difficulty: 'easy' },
                    { question: 'Explain the "Blue-Green Deployment" strategy.', hint: 'Running two identical production environments to reduce downtime.', difficulty: 'medium' },
                    { question: 'What is the purpose of an "Error Budget"?', hint: 'The acceptable amount of downtime before new feature releases are halted.', difficulty: 'hard' },
                    { question: 'What does "Idempotent" mean in the context of automation?', hint: 'Running an operation multiple times has the same result as running it once.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Automate everything that needs to be done more than once.',
                    'Prioritize system stability and observability from the beginning of a project.',
                    'Use version control for both your application code and your infrastructure.',
                    'Implement "Blameless Post-mortems" to learn from failures without pointing fingers.',
                    'Focus on reducing "Feedback Loops" to help developers deploy faster.',
                    'Secure your secrets (API keys, passwords) using specialized tools like HashiCorp Vault.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'DevOps Overview', description: 'Understand the DevOps culture and practices.', tasks: ['Learn about DevOps principles and culture', 'Understand CI/CD pipeline concepts', 'Explore the DevOps lifecycle'] },
            ]
        },

        // ─── OS & Linux ───
        'os-fundamentals': {
            id: 'os-fundamentals',
            label: 'OS Fundamentals & Linux Security',
            description: 'Mastering the underlying operating system concepts and Linux administration required for effective automation and scaling.',
            parentId: 'devops-root',
            children: ['linux-commands', 'shell-scripting'],
            resources: [
                { type: 'course', title: 'Linux Foundation - Certified System Administrator', url: 'https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/', isFree: false },
                { type: 'article', title: 'Full Stack Python - Linux Server Guide', url: 'https://www.fullstackpython.com/linux-servers.html', isFree: true },
                { type: 'video', title: 'Linux System Administration Full Course', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', isFree: true },
                { type: 'article', title: 'The Linux Command Line - William Shotts', url: 'https://linuxcommand.org/tlcl.php', isFree: true }
            ],
            content: {
                overview: 'The Operating System is the foundation upon which all infrastructure is built. In DevOps, Linux is the dominant OS for servers, containers, and cloud nodes. Mastery of the Linux terminal, file systems, permissions, and process management is non-negotiable. \n\nA DevOps engineer needs to know how to efficiently manage system resources (CPU, RAM, I/O), secure the environment from unauthorized access, and automate repetitive tasks using shell scripts. Whether you are debugging a container or tuning a production server, your OS knowledge determines your effectiveness.',
                keyConcepts: [
                    'The Linux File System Hierarchy (FHS)',
                    'Permissions and Ownership: chmod, chown, and ACLs',
                    'Process Management: Signals, foreground/background, and htop',
                    'Package Management: apt, yum, and apk',
                    'Storage Management: LVM, Partitions, and Mount points',
                    'Systemd: Managing services, logs, and timers',
                    'User and Group Management: sudo and PAM',
                    'Kernel Internals: Syscalls, I/O Wait, and Load Average'
                ],
                practiceQuestions: [
                    { question: 'What is the "Load Average" and what does it represent?', hint: 'The number of processes in the run queue or waiting for I/O.', difficulty: 'medium' },
                    { question: 'Explain the difference between a "Hard Link" and a "Soft Link" (Symlink).', hint: 'Pointer to the inode vs Pointer to the filename.', difficulty: 'medium' },
                    { question: 'What is an "Inode" in a Linux file system?', hint: 'A data structure describing a file object (size, ownership, etc.).', difficulty: 'hard' },
                    { question: 'How do you check for open network ports on a live server?', hint: 'Using netstat, ss, or lsof.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Never log in as the "root" user directly; use sudo for administrative tasks.',
                    'Store sensitive system configurations in environment variables or vault tools.',
                    'Implement regular SSH hardening: disable root login and use key-based auth.',
                    'Keep your system packages updated using automated security updates.',
                    'Use "Infrastructure as Code" to provision and configure your OS environments.',
                    'Monitor system logs (journalctl) to detect early signs of hardware or software failure.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Linux Basics', description: 'Navigate and manage a Linux system.', tasks: ['Learn file system navigation (cd, ls, pwd)', 'Manage files (cp, mv, rm, mkdir)', 'Understand file permissions (chmod, chown)'] },
                { day: 2, title: 'Process & System Management', description: 'Monitor and manage system resources.', tasks: ['View running processes (ps, top, htop)', 'Manage services (systemctl, journalctl)', 'Monitor disk, memory, and CPU usage'] },
            ]
        },

        'linux-commands': {
            id: 'linux-commands',
            label: 'Linux Commands',
            description: 'Essential Linux commands for file management, text processing (grep, sed, awk), networking, and system administration.',
            parentId: 'os-fundamentals',
            resources: [
                { type: 'article', title: 'Linux Commands Cheat Sheet', url: 'https://www.linuxtrainingacademy.com/linux-commands-cheat-sheet/', isFree: true },
            ],
        },

        'shell-scripting': {
            id: 'shell-scripting',
            label: 'Shell Scripting',
            description: 'Automate tasks with Bash scripting. Learn variables, loops, conditionals, functions, and common scripting patterns.',
            parentId: 'os-fundamentals',
            resources: [
                { type: 'article', title: 'Bash Scripting Guide', url: 'https://tldp.org/LDP/abs/html/', isFree: true },
                { type: 'video', title: 'Bash Scripting Tutorial', url: 'https://www.youtube.com/watch?v=tK9Oc6AEnR4', isFree: true },
            ],
        },

        'scripting': {
            id: 'scripting',
            label: 'Scripting Languages',
            description: 'Learn Python or Go for DevOps automation, infrastructure scripts, and building internal tools.',
            parentId: 'devops-root',
            children: ['python-devops', 'go-devops'],
            resources: [
                { type: 'course', title: 'Python for DevOps', url: 'https://www.udemy.com/course/python-for-devops/', isFree: false },
            ],
        },

        'python-devops': {
            id: 'python-devops',
            label: 'Python for DevOps',
            description: 'Use Python for automation, scripting, infrastructure management, and building DevOps tools.',
            parentId: 'scripting',
            resources: [
                { type: 'article', title: 'Python for DevOps', url: 'https://www.oreilly.com/library/view/python-for-devops/9781492057680/', isFree: false },
            ],
        },

        'go-devops': {
            id: 'go-devops',
            label: 'Go for DevOps',
            description: 'Go is the language behind Docker, Kubernetes, and Terraform. Great for building performant DevOps tools.',
            parentId: 'scripting',
            resources: [
                { type: 'documentation', title: 'Go Documentation', url: 'https://go.dev/doc/', isFree: true },
            ],
        },

        'networking-basics': {
            id: 'networking-basics',
            label: 'Networking & Infrastructure Security',
            description: 'Mastering the networking protocols and security layers that connect and protect distributed systems and cloud services.',
            parentId: 'devops-root',
            children: ['cicd', 'docker-devops', 'cloud-providers'],
            resources: [
                { type: 'video', title: 'Computer Networking Full Course', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', isFree: true },
                { type: 'article', title: 'Cloudflare - Learning Networking', url: 'https://www.cloudflare.com/learning/', isFree: true },
                { type: 'video', title: 'DNS Explained', url: 'https://www.youtube.com/watch?v=72snZctFFtA', isFree: true },
                { type: 'documentation', title: 'AWS Networking Fundamentals', url: 'https://aws.amazon.com/networking/', isFree: true }
            ],
            content: {
                overview: 'Networking is the connective tissue of the modern internet. In DevOps, you must understand how data moves between services, how to secure those data paths, and how to troubleshoot connectivity issues at scale. \n\nThis involves mastering the OSI model, understanding the difference between Layer 4 and Layer 7 load balancing, and knowing how to configure firewalls and VPCs. Whether you are managing public-facing traffic or securing internal microservice communication, networking knowledge is essential for building resilient and secure infrastructure.',
                keyConcepts: [
                    'The OSI Model: Layers 1 through 7',
                    'TCP/IP Protocol Suite: Handshakes, flow control, and error recovery',
                    'DNS: Resolving names to IPs and record types (A, CNAME, TXT)',
                    'HTTP/HTTPS: SSL/TLS handshakes and certificates',
                    'Load Balancers: Round-robin, least connections, and sticky sessions',
                    'Firewalls and Security Groups: Ingress vs Egress rules',
                    'VPCs and Subnetting: CIDR notation and public vs private subnets',
                    'VPNs and Direct Connect: Securing remote connections'
                ],
                practiceQuestions: [
                    { question: 'What is the purpose of the "Three-way Handshake" in TCP?', hint: 'To establish a reliable connection before data transfer begins.', difficulty: 'medium' },
                    { question: 'Explain the difference between a "Public Subnet" and a "Private Subnet".', hint: 'Direct internet access via IGW vs Access only through a NAT gateway.', difficulty: 'medium' },
                    { question: 'What is "CIDR Notation" used for?', hint: 'Representing an IP range and the number of bits for the network prefix.', difficulty: 'hard' },
                    { question: 'What is the "TTL" (Time To Live) in a DNS record?', hint: 'The duration for which a record is cached by resolvers.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always follow the "Principle of Least Privilege" when configuring security groups.',
                    'Use SSL/TLS for all data in transit—no exceptions.',
                    'Implement regular VPC flow log analysis to detect unusual traffic patterns.',
                    'Use "Content Delivery Networks" (CDNs) to reduce latency and origin load.',
                    'Keep your DNS records clean and remove unused entries promptly.',
                    'Automate your infrastructure deployments using VPC-native tools and templates.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Networking Essentials', description: 'Core networking concepts.', tasks: ['Understand OSI model layers', 'Learn TCP/IP, UDP, and DNS', 'Explore subnetting and CIDR notation'] },
            ]
        },

        // ─── CI/CD ───
        'cicd': {
            id: 'cicd',
            label: 'CI/CD Pipelines & Automation',
            description: 'Mastering the tools and strategies that automate the software delivery lifecycle from code commit to production deployment.',
            parentId: 'networking-basics',
            children: ['github-actions', 'jenkins'],
            resources: [
                { type: 'article', title: 'GitLab - Scaling CI/CD Pipelines', url: 'https://about.gitlab.com/topics/ci-cd/', isFree: true },
                { type: 'video', title: 'CI/CD Pipeline with GitHub Actions', url: 'https://www.youtube.com/watch?v=R8_veQiYBhI', isFree: true },
                { type: 'article', title: 'Continuous Delivery by Jez Humble & David Farley', url: 'https://continuousdelivery.com/', isFree: false },
                { type: 'documentation', title: 'Jenkins Pipeline Syntax', url: 'https://www.jenkins.io/doc/book/pipeline/syntax/', isFree: true }
            ],
            content: {
                overview: 'Continuous Integration (CI) and Continuous Deployment (CD) are the engines of modern software development. CI ensures that every code change is automatically tested and integrated, while CD automates the delivery of those changes to production. \n\nA DevOps engineer must design pipelines that are fast, reliable, and secure. This involves managing build environments, handling secrets, and implementing automated testing at every stage. A well-oiled CI/CD pipeline reduces "Time to Market" and allows teams to deploy multiple times a day with confidence.',
                keyConcepts: [
                    'Continuous Integration: Automating builds and unit tests',
                    'Continuous Delivery vs Continuous Deployment',
                    'Pipeline as Code: Defining workflows in YAML or Groovy',
                    'Artifact Management: Storing binaries, images, and packages',
                    'Deployment Strategies: Rolling, Blue/Green, and Canary',
                    'Automated Testing: Unit, Integration, E2E, and Smoke tests',
                    'Secret Management in Pipelines (Vault, GitHub Secrets)',
                    'Feedback Loops: Monitoring build success and failure'
                ],
                practiceQuestions: [
                    { question: 'What is the "Canary Deployment" strategy?', hint: 'Releasing a change to a small subset of users before a full rollout.', difficulty: 'medium' },
                    { question: 'Explain the difference between "Continuous Delivery" and "Continuous Deployment".', hint: 'Manual approval vs Automated deployment to production.', difficulty: 'medium' },
                    { question: 'What is a "Pipeline Stage" and why use multiple?', hint: 'To separate build, test, and deploy concerns and provide early failure feedback.', difficulty: 'easy' },
                    { question: 'Contrast "Self-hosted" vs "Cloud-managed" CI/CD runners.', hint: 'Control/Security vs Ease of use/Scalability.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Keep your build environments identical to production whenever possible.',
                    'Fail fast: implement the cheapest and most important tests first.',
                    'Treat your pipeline code with the same rigor as your application code.',
                    'Maintain "Single Source of Truth" by using version control for everything.',
                    'Secure your pipelines: only privileged users should trigger production deployments.',
                    'Automate manual verification steps using automated testing frameworks.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'CI/CD Fundamentals', description: 'Automate your deployment pipeline.', tasks: ['Understand CI vs CD vs CD (Delivery vs Deployment)', 'Set up a basic pipeline with GitHub Actions', 'Add automated testing to your pipeline'] },
                { day: 2, title: 'Advanced Pipelines', description: 'Production-grade CI/CD.', tasks: ['Implement multi-stage pipelines', 'Add caching and artifact management', 'Set up deployment to staging and production'] },
            ]
        },

        'github-actions': {
            id: 'github-actions',
            label: 'GitHub Actions',
            description: 'Native CI/CD platform for GitHub repositories. Define workflows in YAML to automate builds, tests, and deployments.',
            parentId: 'cicd',
            resources: [
                { type: 'documentation', title: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions', isFree: true },
            ],
        },

        'jenkins': {
            id: 'jenkins',
            label: 'Jenkins',
            description: 'Open-source automation server for building, testing, and deploying software with extensive plugin ecosystem.',
            parentId: 'cicd',
            resources: [
                { type: 'documentation', title: 'Jenkins Documentation', url: 'https://www.jenkins.io/doc/', isFree: true },
            ],
        },

        // ─── Containers & Orchestration ───
        'docker-devops': {
            id: 'docker-devops',
            label: 'Containerization with Docker',
            description: 'Mastering the art of packaging applications into portable, consistent, and lightweight containers for seamless delivery.',
            parentId: 'networking-basics',
            children: ['kubernetes'],
            resources: [
                { type: 'documentation', title: 'Docker - Getting Started Guide', url: 'https://docs.docker.com/get-started/', isFree: true },
                { type: 'video', title: 'Docker for Beginners - Full Course', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo', isFree: true },
                { type: 'article', title: 'Docker Best Practices - Multi-stage Builds', url: 'https://docs.docker.com/develop/develop-images/multistage-build/', isFree: true },
                { type: 'course', title: 'Docker Mastery (Udemy)', url: 'https://www.udemy.com/course/docker-mastery/', isFree: false }
            ],
            content: {
                overview: 'Docker revolutionized the way we build and run software by introducing containerization—a lightweight alternative to virtual machines. Containers package an application and its dependencies together, ensuring that it runs the same way on a developer\'s laptop as it does in production. \n\nAs a DevOps engineer, you must master the Dockerfile syntax, understand how Docker images are layered, and know how to optimize them for size and security. You also need to manage multi-container applications using Docker Compose and understand the intricacies of container networking and storage persistent.',
                keyConcepts: [
                    'Containers vs Virtual Machines: The lightweight revolution',
                    'Docker Images and Layers: Copy-on-write and caching',
                    'Dockerfiles: Designing build steps and base images',
                    'Docker Compose: Managing multi-service applications locally',
                    'Container Networking: Bridge, Host, and Overlay networks',
                    'Docker Volumes: Persistent storage for ephemeral containers',
                    'Docker Registry: Storing and sharing images securely',
                    'Multi-stage Builds: Optimizing for production efficiency'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a "Docker Image" and a "Docker Container"?', hint: 'The blueprint vs The running instance.', difficulty: 'easy' },
                    { question: 'Explain "Multi-stage Builds" and why they are useful.', hint: 'Using multiple FROM statements to keep the final image minimal.', difficulty: 'medium' },
                    { question: 'What is the purpose of the ".dockerignore" file?', hint: 'Excluding files/directories from the build context to speed up builds and reduce image size.', difficulty: 'easy' },
                    { question: 'How do you persist data in a container after it is deleted?', hint: 'Using Docker Volumes or Bind Mounts.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always use specific image tags instead of "latest" to ensure reproducibility.',
                    'Keep your final production images as small as possible using Alpine or Distroless.',
                    'Never store secrets or credentials inside Dockerfiles or images.',
                    'Run your containers as a non-privileged user to enhance security.',
                    'Implement health checks to allow orchestrators to monitor container health.',
                    'Use "Multi-stage builds" to separate build-time dependencies from the runtime image.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Docker Basics', description: 'Learn containerization fundamentals.', tasks: ['Install Docker and run your first container', 'Write Dockerfiles and build images', 'Manage containers with docker commands'] },
                { day: 2, title: 'Docker Compose', description: 'Multi-container applications.', tasks: ['Write docker-compose.yml for multi-service apps', 'Configure volumes and networks', 'Manage environments with .env files'] },
                { day: 3, title: 'Docker Best Practices', description: 'Production-ready containers.', tasks: ['Optimize Dockerfile with multi-stage builds', 'Implement health checks', 'Set up a private Docker registry'] },
            ]
        },

        'kubernetes': {
            id: 'kubernetes',
            label: 'Kubernetes Orchestration',
            description: 'Mastering the industry-standard platform for automating deployment, scaling, and management of containerized applications.',
            parentId: 'docker-devops',
            resources: [
                { type: 'documentation', title: 'Kubernetes - Official Docs', url: 'https://kubernetes.io/docs/', isFree: true },
                { type: 'video', title: 'Kubernetes Crash Course for Engineers', url: 'https://www.youtube.com/watch?v=s_o8dwzRlu4', isFree: true },
                { type: 'course', title: 'Certified Kubernetes Administrator (CKA) Preparation', url: 'https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/', isFree: false },
                { type: 'article', title: 'The Illustrated Children\'s Guide to Kubernetes', url: 'https://www.cncf.io/phippy/', isFree: true }
            ],
            content: {
                overview: 'Kubernetes (K8s) is the global standard for container orchestration. It allows you to manage clusters of machines as a single resource, automating deployment, scaling, and operational tasks. \n\nLearning Kubernetes involves mastering its core API objects (Pods, Deployments, Services), understanding its architecture (Control Plane vs Worker Nodes), and knowing how to implement complex features like Horizontal Pod Autoscaling, Ingress controllers, and persistent storage. Kubernetes is complex but powerful, enabling truly cloud-native and highly available applications.',
                keyConcepts: [
                    'Cluster Architecture: Control Plane, API Server, etcd, and Kubelet',
                    'Pods and Deployments: The basic units of compute and scaling',
                    'Services and Ingress: Networking within and outside the cluster',
                    'ConfigMaps and Secrets: Decoupling configuration from code',
                    'Volumes and PVCs: Managing persistent storage in a dynamic environment',
                    'Autoscaling: HPA and VPA for dynamic capacity management',
                    'Namespaces: Logical isolation of resources within a cluster',
                    'Helm: The package manager for Kubernetes applications'
                ],
                practiceQuestions: [
                    { question: 'What is a "Pod" in Kubernetes?', hint: 'The smallest deployable unit, containing one or more containers.', difficulty: 'easy' },
                    { question: 'Explain the difference between a "Deployment" and a "StatefulSet".', hint: 'Managing stateless vs stateful applications (with persistent IDs).', difficulty: 'hard' },
                    { question: 'What is the role of the "etcd" component?', hint: 'The cluster\'s distributed key-value store for configuration and state.', difficulty: 'hard' },
                    { question: 'What is a "Service" of type "LoadBalancer"?', hint: 'Exposes a service externally using a cloud provider\'s load balancer.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always define Resource Limits and Requests for your containers.',
                    'Use "Namespaces" to organize and isolate your project environments.',
                    'Implement robust "Liveness" and "Readiness" probes for every pod.',
                    'Never store sensitive data in ConfigMaps; always use Secrets (ideally encrypted).',
                    'Use "Helm" to manage complex application deployments and versioning.',
                    'Monitor your cluster using Prometheus and Grafana for deep observability.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'K8s Fundamentals', description: 'Core Kubernetes concepts.', tasks: ['Understand Pods, Deployments, and Services', 'Set up a local cluster with minikube', 'Deploy your first application'] },
                { day: 2, title: 'K8s Advanced', description: 'Production Kubernetes.', tasks: ['Configure ConfigMaps and Secrets', 'Set up horizontal pod autoscaling', 'Implement Ingress controllers'] },
            ]
        },

        // ─── Cloud Providers ───
        'cloud-providers': {
            id: 'cloud-providers',
            label: 'Cloud Providers',
            description: 'Learn cloud infrastructure with AWS, Azure, or GCP. Understand compute, storage, networking, and managed services.',
            parentId: 'networking-basics',
            children: ['aws', 'gcp'],
            resources: [
                { type: 'article', title: 'AWS vs Azure vs GCP', url: 'https://www.datacamp.com/blog/aws-vs-azure-vs-gcp', isFree: true },
            ],
        },

        'aws': {
            id: 'aws',
            label: 'AWS',
            description: 'Amazon Web Services - the most widely used cloud platform. Learn EC2, S3, Lambda, RDS, and IAM.',
            parentId: 'cloud-providers',
            resources: [
                { type: 'documentation', title: 'AWS Documentation', url: 'https://docs.aws.amazon.com/', isFree: true },
                { type: 'course', title: 'AWS Certified Solutions Architect', url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', isFree: false },
            ],
            dayWisePlan: [
                { day: 1, title: 'AWS Core Services', description: 'Get started with AWS.', tasks: ['Set up an AWS account and configure IAM', 'Launch an EC2 instance', 'Store objects in S3 and configure permissions'] },
                { day: 2, title: 'AWS Advanced', description: 'Managed services and serverless.', tasks: ['Deploy with Lambda and API Gateway', 'Set up RDS and DynamoDB', 'Configure VPC and security groups'] },
            ]
        },

        'gcp': {
            id: 'gcp',
            label: 'GCP / Azure',
            description: 'Google Cloud Platform and Microsoft Azure offering compute, storage, and AI/ML services for cloud-native applications.',
            parentId: 'cloud-providers',
            resources: [
                { type: 'documentation', title: 'GCP Documentation', url: 'https://cloud.google.com/docs', isFree: true },
                { type: 'documentation', title: 'Azure Documentation', url: 'https://docs.microsoft.com/azure/', isFree: true },
            ],
        },

        // ─── Infrastructure as Code ───
        'iac': {
            id: 'iac',
            label: 'Infrastructure as Code (IaC)',
            description: 'Mastering the tools and methodologies for provisioning and managing infrastructure through machine-readable definition files.',
            children: ['terraform', 'ansible'],
            resources: [
                { type: 'article', title: 'HashiCorp - What is Infrastructure as Code?', url: 'https://www.hashicorp.com/resources/what-is-infrastructure-as-code', isFree: true },
                { type: 'video', title: 'Terraform Explained in 15 Minutes', url: 'https://www.youtube.com/watch?v=l5k1ai_GBNE', isFree: true },
                { type: 'article', title: 'Red Hat - Ansible Automation Guide', url: 'https://www.redhat.com/en/technologies/management/ansible', isFree: true },
                { type: 'course', title: 'Terraform for AWS Beginners (Udemy)', url: 'https://www.udemy.com/course/terraform-beginner-to-advanced/', isFree: false }
            ],
            content: {
                overview: 'Infrastructure as Code (IaC) is the practice of managing and provisioning computing infrastructure through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools. This allows for version control, reproducibility, and consistency across environments. \n\nAs a DevOps engineer, you must choose between declarative tools like Terraform (which define the "what") and imperative or configuration management tools like Ansible (which define the "how"). IaC enables you to treat your infrastructure exactly like your application code—testing it, reviewing it, and deploying it through a CI/CD pipeline.',
                keyConcepts: [
                    'Declarative vs Imperative IaC: Defining state vs Defining steps',
                    'Idempotency: Ensuring consistent results every time',
                    'Immutable Infrastructure: Replacing rather than updating servers',
                    'State Management: Keeping track of the current environment state',
                    'Provisioning (Terraform) vs Configuration Management (Ansible)',
                    'Modularity: Building reusable infrastructure components',
                    'GitOps: Using Git as the single source of truth for infrastructure',
                    'Drift Management: Detecting and fixing manual changes'
                ],
                practiceQuestions: [
                    { question: 'What is the main advantage of "Immutable Infrastructure"?', hint: 'Eliminates configuration drift and makes rollbacks easier.', difficulty: 'medium' },
                    { question: 'Explain the concept of "State" in Terraform.', hint: 'A file that tracks the relationship between your code and real-world resources.', difficulty: 'hard' },
                    { question: 'What is the "Idempotency" property in Ansible?', hint: 'Running a playbook multiple times results in the same final system state.', difficulty: 'medium' },
                    { question: 'Contrast "Push" vs "Pull" models in IaC.', hint: 'Ansible (Push) vs Chef/Puppet (Pull).', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always store your IaC files in a version control system (Git).',
                    'Use "Remote State" files with locking to prevent conflicts in teams.',
                    'Keep your IaC code modular and reusable to avoid duplication.',
                    'Implement automated linting and security scanning (e.g., tfsec) for your code.',
                    'Test your infrastructure changes in a dedicated staging environment.',
                    'Avoid manual changes ("Console drifts") at all costs; keep all changes in code.'
                ]
            }
        },

        'terraform': {
            id: 'terraform',
            label: 'Terraform',
            description: 'HashiCorp Terraform enables infrastructure provisioning across cloud providers using declarative HCL configuration.',
            parentId: 'iac',
            resources: [
                { type: 'documentation', title: 'Terraform Documentation', url: 'https://developer.hashicorp.com/terraform/docs', isFree: true },
                { type: 'video', title: 'Terraform Crash Course', url: 'https://www.youtube.com/watch?v=SLB_c_ayRMo', isFree: true },
            ],
        },

        'ansible': {
            id: 'ansible',
            label: 'Ansible',
            description: 'Agentless configuration management and automation tool using YAML playbooks for server provisioning and deployment.',
            parentId: 'iac',
            resources: [
                { type: 'documentation', title: 'Ansible Documentation', url: 'https://docs.ansible.com/', isFree: true },
            ],
        },

        // ─── Monitoring & Observability ───
        'monitoring': {
            id: 'monitoring',
            label: 'Monitoring & Observability',
            description: 'Mastering the stacks that provide deep insight into application health, performance, and user behavior in real-time.',
            children: ['prometheus-grafana', 'logging'],
            resources: [
                { type: 'article', title: 'Splunk - What is Observability?', url: 'https://www.splunk.com/en_us/data-insider/what-is-observability.html', isFree: true },
                { type: 'video', title: 'Prometheus & Grafana Setup Guide', url: 'https://www.youtube.com/watch?v=h4Sl21AK9fA', isFree: true },
                { type: 'article', title: 'Google - SRE Book: Monitoring Distributed Systems', url: 'https://sre.google/sre-book/monitoring-distributed-systems/', isFree: true },
                { type: 'documentation', title: 'Elastic Stack - ELK Guide', url: 'https://www.elastic.co/what-is/elk-stack', isFree: true }
            ],
            content: {
                overview: 'Monitoring and Observability are the eyes and ears of a DevOps engineer. Monitoring tells you "Is the system working?", while Observability helps you answer "Why is it not working?". \n\nModern observability focuses on three main pillars: Metrics (numerical measurements), Logging (textual event records), and Tracing (tracking a request across services). By mastering tools like Prometheus for metrics, the ELK stack for logs, and Jaeger for tracing, you can detect, diagnose, and resolve production issues before they impact a large number of users.',
                keyConcepts: [
                    'The Three Pillars: Metrics, Logs, and Traces',
                    'White-box vs Black-box Monitoring',
                    'The Four Golden Signals: Latency, Traffic, Errors, and Saturation',
                    'Prometheus Architecture: Pull model and Time-series data',
                    'Log Aggregation: Forwarding, indexing, and visualizing logs',
                    'Distributed Tracing: Understanding request flow in microservices',
                    'Alerting: Designing meaningful, non-fatiguing alerts',
                    'Dashboards: Visualizing health for both business and technical teams'
                ],
                practiceQuestions: [
                    { question: 'What are the "Four Golden Signals" of monitoring?', hint: 'Latency, Traffic, Errors, and Saturation.', difficulty: 'medium' },
                    { question: 'Explain the difference between "Monitoring" and "Observability".', hint: 'Passive health checks vs Debugging internal state from external outputs.', difficulty: 'hard' },
                    { question: 'Why is "Alert Fatigue" a problem in DevOps?', hint: 'Too many low-priority alerts lead to engineers ignoring real issues.', difficulty: 'medium' },
                    { question: 'What is the purpose of "Distributed Tracing"?', hint: 'Following a request across multiple microservice boundaries.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Prioritize "Actionable" alerts—if an alert triggers, there must be a clear next step.',
                    'Use "Dashboards as Code" to ensure observability settings are versioned.',
                    'Monitor from the user\'s perspective (Synthetic testing).',
                    'Keep your logs structured (JSON) for easier searching and analysis.',
                    'Implement regular "Game Days" to test your observability and alerting.',
                    'Document your "Runbooks" so responders know exactly how to handle common alerts.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Monitoring Setup', description: 'Set up observability stack.', tasks: ['Install Prometheus for metrics collection', 'Create Grafana dashboards', 'Set up alerting rules'] },
            ]
        },

        'prometheus-grafana': {
            id: 'prometheus-grafana',
            label: 'Prometheus & Grafana',
            description: 'Prometheus collects metrics; Grafana visualizes them. Together they form the most popular open-source monitoring stack.',
            parentId: 'monitoring',
            resources: [
                { type: 'documentation', title: 'Prometheus Docs', url: 'https://prometheus.io/docs/', isFree: true },
                { type: 'documentation', title: 'Grafana Docs', url: 'https://grafana.com/docs/', isFree: true },
            ],
        },

        'logging': {
            id: 'logging',
            label: 'Logging (ELK)',
            description: 'Centralized logging with Elasticsearch, Logstash, and Kibana (ELK Stack) or alternatives like Loki and Fluentd.',
            parentId: 'monitoring',
            resources: [
                { type: 'documentation', title: 'ELK Stack Guide', url: 'https://www.elastic.co/guide/index.html', isFree: true },
            ],
        },
    }
};
