
import { RoadmapTrack } from './types';

export const dockerRoadmap: RoadmapTrack = {
    id: 'docker',
    title: 'Docker',
    description: 'Master containerization with Docker',
    category: 'skill-based',
    icon: '🐳',
    accentColor: '#2496ed',
    rootNodeId: 'docker-root',
    nodes: {
        'docker-root': {
            id: 'docker-root',
            label: 'Docker Mastery',
            description: 'Learn to build, ship, and run any app anywhere with containers.',
            children: ['docker-basics', 'docker-images', 'docker-networking', 'docker-compose', 'docker-security'],
            resources: [
                { type: 'documentation', title: 'Docker Official Docs', url: 'https://docs.docker.com/', isFree: true },
                { type: 'video', title: 'Docker Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo', isFree: true },
                { type: 'course', title: 'Docker & Kubernetes (Udemy)', url: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/', isFree: false },
                { type: 'article', title: 'Docker Curriculum', url: 'https://docker-curriculum.com/', isFree: true }
            ],
            content: {
                overview: 'Docker is a platform that packages applications and their dependencies into lightweight, portable containers. Before Docker, the classic problem was "it works on my machine" — an application might run fine on a developer\'s laptop but crash in production because of different OS versions, library versions, or configurations. Docker solves this by bundling everything the application needs (code, runtime, libraries, system tools) into a single image that runs identically everywhere. Containers are isolated processes that share the host OS kernel, making them much lighter than virtual machines (a container starts in seconds, not minutes). Docker has become the foundation of modern DevOps, CI/CD pipelines, microservices architecture, and cloud-native development.',
                keyConcepts: [
                    'Containers vs Virtual Machines',
                    'Docker Images and Layers (copy-on-write)',
                    'Dockerfiles for building images',
                    'Docker Hub and container registries',
                    'Container lifecycle: create, start, stop, remove',
                    'Volumes for persistent data storage',
                    'Docker networking: bridge, host, overlay',
                    'Docker Compose for multi-container applications'
                ],
                practiceQuestions: [
                    { question: 'How are containers different from virtual machines?', hint: 'Containers share the host OS kernel and are much lighter. VMs include their own entire OS.', difficulty: 'easy' },
                    { question: 'What happens to data inside a container when it stops?', hint: 'Data in the writable layer is lost unless you use volumes or bind mounts for persistence.', difficulty: 'medium' },
                    { question: 'What is a Docker layer?', hint: 'Each instruction in a Dockerfile creates a read-only layer. Layers are cached and reused to speed up builds.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use official base images from Docker Hub.',
                    'Keep images small with multi-stage builds.',
                    'Do not store secrets in Docker images.',
                    'Use .dockerignore to exclude unnecessary files from the build context.',
                    'Tag images with specific versions, never rely only on "latest".',
                    'Run containers as non-root users for security.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Docker Fundamentals', description: 'Install and run your first containers.', tasks: ['Install Docker Desktop', 'Run containers from existing images (nginx, node)', 'Learn docker run, docker ps, docker stop, docker rm'] },
                { day: 2, title: 'Building Images', description: 'Create your own Docker images.', tasks: ['Write a Dockerfile for a Node.js or Python app', 'Use multi-stage builds to reduce image size', 'Push your image to Docker Hub'] },
                { day: 3, title: 'Multi-Container Apps', description: 'Docker Compose and networking.', tasks: ['Write a docker-compose.yml for a web app + database', 'Configure volumes and networks', 'Use Docker in a CI/CD workflow'] }
            ]
        },
        'docker-basics': {
            id: 'docker-basics',
            label: 'Containers & Architecture',
            description: 'How Docker works under the hood — the daemon, CLI, images, and containers.',
            parentId: 'docker-root',
            resources: [
                { type: 'documentation', title: 'Docker Overview', url: 'https://docs.docker.com/get-started/overview/', isFree: true }
            ],
            content: {
                overview: 'Docker uses a client-server architecture. The Docker CLI (client) communicates with the Docker daemon (server) which builds, runs, and manages containers. Images are read-only templates that contain the application and its dependencies. Containers are running instances of images. You can think of images like classes and containers like objects in OOP. Docker uses Linux kernel features (namespaces for isolation and cgroups for resource management) to create containers. On macOS and Windows, Docker Desktop runs a lightweight Linux VM behind the scenes. Understanding the relationship between the Docker CLI, daemon, images, containers, and registries is fundamental before diving deeper.',
                keyConcepts: [
                    'Docker daemon and Docker CLI',
                    'Images: read-only templates with layers',
                    'Containers: running instances of images',
                    'Docker Hub: public container registry',
                    'docker pull, docker run, docker exec, docker logs',
                    'Container isolation: namespaces and cgroups',
                    'Docker Desktop for Mac/Windows',
                    'Image tagging and versioning'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a Docker image and a container?', hint: 'An image is a template (blueprint); a container is a running instance of that image.', difficulty: 'easy' },
                    { question: 'How do you get a shell inside a running container?', hint: 'Use docker exec -it <container> /bin/sh or /bin/bash.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Clean up unused images and containers regularly with docker system prune.',
                    'Use named containers for easier management.',
                    'Check container logs with docker logs when debugging issues.',
                    'Understand which containers are running with docker ps (and docker ps -a for all).'
                ]
            }
        },
        'docker-images': {
            id: 'docker-images',
            label: 'Images & Dockerfiles',
            description: 'Writing Dockerfiles, multi-stage builds, and optimizing image sizes.',
            parentId: 'docker-root',
            children: ['dockerfile-best-practices'],
            resources: [
                { type: 'documentation', title: 'Dockerfile Reference', url: 'https://docs.docker.com/engine/reference/builder/', isFree: true }
            ],
            content: {
                overview: 'A Dockerfile is a text file that contains instructions for building a Docker image. Each instruction (FROM, RUN, COPY, WORKDIR, EXPOSE, CMD) creates a new layer in the image. The FROM instruction specifies the base image (like node:20-alpine or python:3.12-slim). RUN executes commands during the build (like npm install). COPY adds files from your project into the image. CMD defines what command runs when the container starts. Multi-stage builds use multiple FROM instructions to create intermediate build stages, keeping the final image small by only copying the build output (not the build tools). Image optimization matters because smaller images download faster, start faster, and have a smaller attack surface.',
                keyConcepts: [
                    'FROM: base image selection (-alpine, -slim variants)',
                    'RUN: execute commands during build',
                    'COPY and ADD: add files to the image',
                    'WORKDIR: set the working directory',
                    'CMD vs ENTRYPOINT',
                    'EXPOSE: document which ports the container uses',
                    'ENV and ARG for build-time and runtime variables',
                    'Multi-stage builds for smaller images'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between CMD and ENTRYPOINT?', hint: 'CMD provides default arguments that can be overridden. ENTRYPOINT sets the executable that always runs.', difficulty: 'medium' },
                    { question: 'Why should you use alpine-based images?', hint: 'Alpine Linux is about 5MB (vs 100MB+ for Debian), resulting in much smaller Docker images.', difficulty: 'easy' },
                    { question: 'How does layer caching work in Docker builds?', hint: 'Docker caches each layer. If a layer has not changed, it reuses the cached version. Order your instructions from least to most frequently changing.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use specific base image tags (node:20-alpine, not node:latest).',
                    'Order Dockerfile instructions from least to most frequently changing for better caching.',
                    'Copy package.json BEFORE source code so npm install layer is cached.',
                    'Use multi-stage builds to separate build dependencies from runtime.',
                    'Minimize the number of RUN layers by chaining commands with &&.'
                ]
            }
        },
        'dockerfile-best-practices': {
            id: 'dockerfile-best-practices',
            label: 'Dockerfile Best Practices',
            description: 'Multi-stage builds, layer caching, security, and production optimization.',
            parentId: 'docker-images',
            resources: [
                { type: 'article', title: 'Docker Best Practices', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', isFree: true }
            ],
            content: {
                overview: 'Production Dockerfiles require careful optimization. Multi-stage builds let you use a full development image (with compilers, build tools) in one stage and copy only the compiled output to a minimal production image. Layer caching means you should order your instructions so that dependencies (which change rarely) are installed before source code (which changes often). Security best practices include running as a non-root user (USER node), scanning images for vulnerabilities (docker scout, trivy), and not including secrets or development tools in production images. The .dockerignore file works like .gitignore, preventing unnecessary files (node_modules, .git, .env) from being included in the build context.',
                keyConcepts: [
                    'Multi-stage builds for production images',
                    'Layer caching optimization (least to most changed)',
                    'Running as non-root user',
                    '.dockerignore for build context management',
                    'Image scanning with Docker Scout or Trivy',
                    'Healthchecks with HEALTHCHECK instruction',
                    'Minimizing image attack surface'
                ],
                practiceQuestions: [
                    { question: 'Why should you run containers as a non-root user?', hint: 'If a container is compromised, the attacker has limited privileges instead of full root access.', difficulty: 'medium' },
                    { question: 'What should be in your .dockerignore file?', hint: 'node_modules, .git, .env, build artifacts — anything not needed inside the container.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always add a .dockerignore file to your projects.',
                    'Use HEALTHCHECK to let Docker monitor container health.',
                    'Scan images for vulnerabilities before deployment.',
                    'Use read-only file systems where possible (--read-only flag).',
                    'Pin exact versions of system packages installed with apt-get.'
                ]
            }
        },
        'docker-networking': {
            id: 'docker-networking',
            label: 'Networking & Volumes',
            description: 'Container networking, data persistence, bind mounts, and named volumes.',
            parentId: 'docker-root',
            resources: [
                { type: 'documentation', title: 'Docker Networking', url: 'https://docs.docker.com/network/', isFree: true },
                { type: 'documentation', title: 'Docker Volumes', url: 'https://docs.docker.com/storage/volumes/', isFree: true }
            ],
            content: {
                overview: 'Docker networking controls how containers communicate with each other and the outside world. The default bridge network lets containers on the same host communicate by IP address. User-defined bridge networks allow communication by container name (DNS). The host network gives a container direct access to the host\'s network (no port mapping needed). Overlay networks span multiple Docker hosts for swarm/cluster setups. For data persistence, Docker provides volumes (managed by Docker, stored in a Docker area) and bind mounts (mapping a host directory into a container). Volumes are preferred for databases and persistent data because they are managed by Docker and work across platforms.',
                keyConcepts: [
                    'Bridge network: default container networking',
                    'User-defined networks with DNS resolution',
                    'Host network for direct host access',
                    'Port mapping: -p host:container',
                    'Named volumes vs bind mounts',
                    'Volume drivers and remote storage',
                    'tmpfs mounts for temporary data',
                    'Container-to-container communication'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a named volume and a bind mount?', hint: 'Named volumes are managed by Docker and stored in a Docker directory. Bind mounts map a specific host path into the container.', difficulty: 'medium' },
                    { question: 'How do containers on the same user-defined network communicate?', hint: 'By container name — Docker provides built-in DNS resolution on user-defined networks.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use user-defined bridge networks instead of the default bridge.',
                    'Use named volumes for database data, not bind mounts.',
                    'Map only the ports you need with -p, avoid --network host in production.',
                    'Use bind mounts during development for live code reloading.'
                ]
            }
        },
        'docker-compose': {
            id: 'docker-compose',
            label: 'Docker Compose',
            description: 'Define and run multi-container applications with a single YAML file.',
            parentId: 'docker-root',
            resources: [
                { type: 'documentation', title: 'Docker Compose', url: 'https://docs.docker.com/compose/', isFree: true }
            ],
            content: {
                overview: 'Docker Compose lets you define a multi-container application in a single docker-compose.yml file. Instead of running multiple long docker run commands, you describe all your services (web app, database, cache, message queue), their networks, and their volumes in YAML, then start everything with a single docker compose up command. Each service can be built from a Dockerfile or pulled from a registry. Compose handles service dependencies (depends_on), environment variables, port mapping, volume mounting, and restart policies. It is essential for local development environments and testing. For production deployments of multi-container apps, you would typically use Kubernetes or a managed container service instead.',
                keyConcepts: [
                    'docker-compose.yml structure and syntax',
                    'Services: defining containers from images or Dockerfiles',
                    'Volumes: named volumes and bind mounts in Compose',
                    'Networks: custom networks for service isolation',
                    'Environment variables and .env files',
                    'depends_on for service ordering',
                    'docker compose up, down, build, logs, exec',
                    'Profiles for optional services'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between docker compose up and docker compose up -d?', hint: 'The -d flag runs containers in detached mode (background) instead of showing logs in the terminal.', difficulty: 'easy' },
                    { question: 'How do you rebuild images after changing a Dockerfile?', hint: 'Use docker compose up --build to force a rebuild.', difficulty: 'easy' },
                    { question: 'Does depends_on wait for a service to be healthy?', hint: 'No, it only waits for the container to start, not for the application inside to be ready. Use healthchecks for that.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use .env files for environment variables, not hardcoded values in docker-compose.yml.',
                    'Define healthchecks for services that others depend on.',
                    'Use named volumes for database data to persist across restarts.',
                    'Keep docker-compose.yml files in version control.',
                    'Use separate compose files for development and production (docker-compose.override.yml).'
                ]
            }
        },
        'docker-security': {
            id: 'docker-security',
            label: 'Container Security',
            description: 'Secure your containers with least privilege, scanning, and runtime best practices.',
            parentId: 'docker-root',
            resources: [
                { type: 'article', title: 'Docker Security Best Practices', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html', isFree: true }
            ],
            content: {
                overview: 'Container security is critical because a compromised container could potentially access the host system or other containers. The most important principle is least privilege: run containers as non-root, drop unnecessary Linux capabilities, and use read-only file systems when possible. Image security means using trusted base images, scanning for vulnerabilities (CVEs) with tools like Docker Scout, Trivy, or Snyk, and keeping images updated. Runtime security includes limiting container resources (CPU and memory), using seccomp profiles, and enabling Docker Content Trust for image verification. Network security means not exposing unnecessary ports and isolating containers on separate networks.',
                keyConcepts: [
                    'Running containers as non-root users',
                    'Image vulnerability scanning (Docker Scout, Trivy)',
                    'Dropping Linux capabilities (--cap-drop ALL)',
                    'Read-only root filesystem (--read-only)',
                    'Resource limits: --memory and --cpus',
                    'Secrets management (Docker Secrets, environment variables)',
                    'Network isolation and firewall rules',
                    'Docker Content Trust for signed images'
                ],
                practiceQuestions: [
                    { question: 'What is the biggest security risk of running containers as root?', hint: 'If the container is compromised, the attacker has root privileges, which could lead to container escape.', difficulty: 'medium' },
                    { question: 'How do you prevent a container from consuming all host resources?', hint: 'Use --memory and --cpus flags to set limits.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Never run containers as root in production.',
                    'Scan every image for vulnerabilities before deployment.',
                    'Use the smallest base image possible (distroless or alpine).',
                    'Do not store secrets in environment variables or images — use a secrets manager.',
                    'Set memory and CPU limits on all containers.'
                ]
            }
        }
    }
};
