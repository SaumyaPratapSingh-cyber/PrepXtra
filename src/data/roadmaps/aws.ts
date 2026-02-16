
import { RoadmapTrack } from './types';

export const awsRoadmap: RoadmapTrack = {
    id: 'aws',
    title: 'AWS',
    description: 'Master Amazon Web Services cloud platform',
    category: 'skill-based',
    icon: '☁️',
    accentColor: '#ff9900',
    rootNodeId: 'aws-root',
    nodes: {
        'aws-root': {
            id: 'aws-root',
            label: 'AWS Mastery',
            description: 'Learn the world\'s leading cloud platform from core services to advanced architecture.',
            children: ['aws-core', 'aws-compute', 'aws-storage', 'aws-networking', 'aws-serverless'],
            resources: [
                { type: 'documentation', title: 'AWS Documentation', url: 'https://docs.aws.amazon.com/', isFree: true },
                { type: 'course', title: 'AWS Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', isFree: true },
                { type: 'video', title: 'AWS Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=3hLmDS179YE', isFree: true },
                { type: 'article', title: 'AWS Well-Architected Framework', url: 'https://aws.amazon.com/architecture/well-architected/', isFree: true }
            ],
            content: {
                overview: 'Amazon Web Services (AWS) is the world\'s most comprehensive cloud platform, holding roughly 32% of the cloud market. It offers over 200 services spanning compute, storage, databases, networking, machine learning, analytics, and IoT. Instead of buying and maintaining physical servers, you rent computing resources on demand — paying only for what you use. AWS services are available across 30+ geographic regions worldwide, each with multiple availability zones for redundancy. Understanding the core AWS services (EC2 for virtual machines, S3 for storage, RDS for databases, Lambda for serverless, VPC for networking) is essential for any modern backend developer or DevOps engineer. AWS certifications (Cloud Practitioner, Solutions Architect, Developer) are highly valued in the job market.',
                keyConcepts: [
                    'Regions and Availability Zones',
                    'IAM: Identity and Access Management',
                    'EC2: Elastic Compute Cloud (virtual machines)',
                    'S3: Simple Storage Service (object storage)',
                    'RDS: Relational Database Service',
                    'Lambda: Serverless compute',
                    'VPC: Virtual Private Cloud (networking)',
                    'CloudFormation: Infrastructure as Code'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a Region and an Availability Zone?', hint: 'A Region is a geographic area (e.g., us-east-1). Each Region has multiple AZs, which are isolated data centers.', difficulty: 'easy' },
                    { question: 'What is IAM and why is it important?', hint: 'IAM controls who can access which AWS resources. It is the foundation of AWS security.', difficulty: 'easy' },
                    { question: 'When would you use Lambda vs EC2?', hint: 'Lambda for short-lived, event-driven tasks. EC2 for long-running applications or when you need full server control.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Follow the principle of least privilege for all IAM roles and policies.',
                    'Enable MFA on the root account and all IAM users.',
                    'Use multiple AZs for high availability.',
                    'Tag all resources for cost tracking and organization.',
                    'Use Infrastructure as Code (CloudFormation or Terraform) for all deployments.',
                    'Set up billing alerts to avoid unexpected costs.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'AWS Foundations', description: 'Core concepts and IAM.', tasks: ['Create a free-tier AWS account', 'Set up IAM users and policies', 'Explore the AWS Console and understand Regions/AZs'] },
                { day: 2, title: 'Compute and Storage', description: 'EC2 and S3 hands-on.', tasks: ['Launch an EC2 instance and SSH into it', 'Deploy a web application to EC2', 'Create S3 buckets and upload/download files'] },
                { day: 3, title: 'Database and Serverless', description: 'RDS and Lambda.', tasks: ['Set up an RDS database (PostgreSQL or MySQL)', 'Create and test Lambda functions', 'Connect Lambda to API Gateway for a serverless API'] }
            ]
        },
        'aws-core': {
            id: 'aws-core',
            label: 'Core Concepts & IAM',
            description: 'AWS fundamentals, IAM, billing, the shared responsibility model.',
            parentId: 'aws-root',
            resources: [
                { type: 'documentation', title: 'AWS IAM', url: 'https://docs.aws.amazon.com/iam/', isFree: true }
            ],
            content: {
                overview: 'Before using any AWS service, you need to understand foundational concepts. The Shared Responsibility Model defines what AWS secures (physical infrastructure, hypervisors) vs what you secure (your data, OS patches, firewall rules). IAM (Identity and Access Management) is the service that controls access to everything in AWS. Users represent individual people, Groups organize users, Roles are assumed by services, and Policies (JSON documents) define permissions. Billing is based on usage — you pay for compute hours, storage GB, data transfer, and API requests. AWS Free Tier provides 12 months of limited free usage for many services. Understanding cost management is critical to avoid surprise bills.',
                keyConcepts: [
                    'Shared Responsibility Model',
                    'IAM Users, Groups, Roles, and Policies',
                    'Policy documents: JSON-based permission definitions',
                    'Root account security and MFA',
                    'AWS Organizations for multi-account management',
                    'Billing and Cost Explorer',
                    'Free Tier limits and gotchas',
                    'AWS CLI and SDK for programmatic access'
                ],
                practiceQuestions: [
                    { question: 'What is the Shared Responsibility Model?', hint: 'AWS is responsible for security of the cloud (infrastructure). You are responsible for security in the cloud (your data and configurations).', difficulty: 'easy' },
                    { question: 'Why should you not use the root account for daily tasks?', hint: 'The root account has unrestricted access. If compromised, an attacker controls everything. Use IAM users instead.', difficulty: 'easy' },
                    { question: 'What is an IAM Role and when would you use one?', hint: 'A Role is an identity with permissions that can be assumed by services (like EC2 or Lambda) instead of users.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Never use the root account except for initial setup.',
                    'Enable MFA on all user accounts.',
                    'Use IAM Roles instead of access keys for services.',
                    'Set up AWS Budget alerts to monitor spending.',
                    'Use AWS Organizations for managing multiple accounts.'
                ]
            }
        },
        'aws-compute': {
            id: 'aws-compute',
            label: 'Compute (EC2)',
            description: 'Virtual machines, auto scaling, load balancing, and Elastic Beanstalk.',
            parentId: 'aws-root',
            resources: [
                { type: 'documentation', title: 'Amazon EC2', url: 'https://docs.aws.amazon.com/ec2/', isFree: true }
            ],
            content: {
                overview: 'EC2 (Elastic Compute Cloud) provides resizable virtual machines (instances) in the cloud. You choose the instance type (CPU, memory, storage), operating system (Amazon Linux, Ubuntu, Windows), and networking configuration. Instance types range from t3.micro (1 vCPU, 1 GB RAM, free tier eligible) to powerful GPU instances for machine learning. Auto Scaling Groups automatically add or remove instances based on demand. Elastic Load Balancers (ALB, NLB) distribute traffic across instances. Security Groups act as virtual firewalls controlling inbound/outbound traffic. Elastic Beanstalk is a higher-level service that deploys and manages EC2 instances, load balancers, and auto scaling for you.',
                keyConcepts: [
                    'Instance types and families (t3, m5, c5, r5, p3)',
                    'AMIs: Amazon Machine Images',
                    'Key pairs for SSH access',
                    'Security Groups: stateful virtual firewalls',
                    'Elastic IPs for static public IP addresses',
                    'Auto Scaling Groups and scaling policies',
                    'Application Load Balancer (ALB) and Network Load Balancer (NLB)',
                    'Elastic Beanstalk for PaaS deployments'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between on-demand, reserved, and spot instances?', hint: 'On-demand is full price. Reserved offers discounts for 1-3 year commitments. Spot is cheapest but can be interrupted.', difficulty: 'medium' },
                    { question: 'What is a Security Group?', hint: 'A stateful firewall that controls inbound and outbound traffic at the instance level.', difficulty: 'easy' },
                    { question: 'What is an AMI?', hint: 'A template that contains the OS, application server, and apps. It is used to launch identical instances.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use the smallest instance type that meets your needs (start small, scale up).',
                    'Use Auto Scaling to handle variable traffic.',
                    'Use Spot Instances for fault-tolerant workloads (batch processing, CI/CD).',
                    'Restrict Security Group rules to specific IP ranges.',
                    'Use Systems Manager instead of SSH for instance management.'
                ]
            }
        },
        'aws-storage': {
            id: 'aws-storage',
            label: 'Storage (S3 & RDS)',
            description: 'S3 object storage, RDS databases, DynamoDB, and ElastiCache.',
            parentId: 'aws-root',
            resources: [
                { type: 'documentation', title: 'Amazon S3', url: 'https://docs.aws.amazon.com/s3/', isFree: true },
                { type: 'documentation', title: 'Amazon RDS', url: 'https://docs.aws.amazon.com/rds/', isFree: true }
            ],
            content: {
                overview: 'AWS provides multiple storage services for different use cases. S3 (Simple Storage Service) is object storage for files, images, backups, and static websites — it provides 11 nines (99.999999999%) of durability. Storage classes (Standard, Infrequent Access, Glacier) let you optimize cost based on access patterns. RDS (Relational Database Service) manages PostgreSQL, MySQL, MariaDB, Oracle, and SQL Server databases with automated backups, patching, and replication. DynamoDB is a fully managed NoSQL database with single-digit millisecond performance at any scale. ElastiCache provides managed Redis or Memcached for caching. Choosing the right storage service depends on your data access patterns, consistency requirements, and budget.',
                keyConcepts: [
                    'S3 buckets, objects, and keys',
                    'S3 storage classes: Standard, IA, Glacier',
                    'S3 lifecycle policies for automatic tier transitions',
                    'S3 presigned URLs for secure temporary access',
                    'RDS instances, multi-AZ, and read replicas',
                    'DynamoDB: tables, items, partition keys, sort keys',
                    'ElastiCache: Redis and Memcached for caching',
                    'EBS volumes for block storage attached to EC2'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between S3 Standard and S3 Glacier?', hint: 'Standard is for frequently accessed data (instant access). Glacier is for archival with retrieval times from minutes to hours.', difficulty: 'easy' },
                    { question: 'What is a multi-AZ deployment in RDS?', hint: 'A standby replica in another Availability Zone for automatic failover if the primary fails.', difficulty: 'medium' },
                    { question: 'When would you use DynamoDB over RDS?', hint: 'DynamoDB for simple key-value access patterns at massive scale. RDS for complex queries with joins and transactions.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Enable versioning on S3 buckets to protect against accidental deletion.',
                    'Use lifecycle policies to move old data to cheaper storage classes.',
                    'Enable automated backups and point-in-time recovery on RDS.',
                    'Use read replicas for read-heavy RDS workloads.',
                    'Use S3 for static assets and serve them through CloudFront CDN.'
                ]
            }
        },
        'aws-networking': {
            id: 'aws-networking',
            label: 'Networking (VPC)',
            description: 'VPC, subnets, route tables, NAT gateways, and CloudFront.',
            parentId: 'aws-root',
            resources: [
                { type: 'documentation', title: 'Amazon VPC', url: 'https://docs.aws.amazon.com/vpc/', isFree: true }
            ],
            content: {
                overview: 'VPC (Virtual Private Cloud) is your isolated network space in AWS. Every resource you create (EC2, RDS, Lambda) lives inside a VPC. You divide a VPC into subnets — public subnets (accessible from the internet via an Internet Gateway) and private subnets (not directly accessible). Route tables control traffic routing. NAT Gateways let instances in private subnets access the internet without being directly reachable. Network ACLs are stateless firewalls at the subnet level. CloudFront is AWS\'s CDN that caches content at edge locations worldwide for low-latency access. Route 53 is the DNS service for domain name management and routing.',
                keyConcepts: [
                    'VPC, CIDR blocks, and IP addressing',
                    'Public subnets vs private subnets',
                    'Internet Gateway for public access',
                    'NAT Gateway for private subnet internet access',
                    'Route tables and routing rules',
                    'Network ACLs (stateless) vs Security Groups (stateful)',
                    'CloudFront: CDN for global content delivery',
                    'Route 53: DNS service and domain management'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a public subnet and a private subnet?', hint: 'A public subnet has a route to an Internet Gateway. A private subnet does not.', difficulty: 'easy' },
                    { question: 'Why would you put a database in a private subnet?', hint: 'To prevent direct internet access to the database, improving security.', difficulty: 'easy' },
                    { question: 'What is the difference between a Network ACL and a Security Group?', hint: 'NACLs are stateless (evaluate both inbound and outbound rules). Security Groups are stateful (return traffic is automatically allowed).', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Place databases and backend services in private subnets.',
                    'Use NAT Gateways in multiple AZs for high availability.',
                    'Use CloudFront to serve static assets for better performance.',
                    'Follow the three-tier architecture: public (load balancer), private (app), private (database).',
                    'Use VPC Flow Logs for network traffic analysis and debugging.'
                ]
            }
        },
        'aws-serverless': {
            id: 'aws-serverless',
            label: 'Serverless',
            description: 'Lambda, API Gateway, DynamoDB, SQS, and serverless architecture patterns.',
            parentId: 'aws-root',
            resources: [
                { type: 'documentation', title: 'AWS Lambda', url: 'https://docs.aws.amazon.com/lambda/', isFree: true },
                { type: 'article', title: 'Serverless Framework', url: 'https://www.serverless.com/', isFree: true }
            ],
            content: {
                overview: 'Serverless computing means you do not manage any servers. You upload your code, define triggers, and AWS handles provisioning, scaling, and maintenance. AWS Lambda runs your code in response to events (HTTP requests, S3 uploads, DynamoDB changes, SQS messages) and you pay only for the compute time you consume, billed in milliseconds. API Gateway creates REST and WebSocket APIs that trigger Lambda functions. Step Functions orchestrate complex serverless workflows. SQS (Simple Queue Service) and SNS (Simple Notification Service) handle messaging and event distribution. The Serverless Framework and AWS SAM are tools that simplify serverless application development and deployment.',
                keyConcepts: [
                    'Lambda functions: handlers, triggers, and timeouts',
                    'API Gateway: REST and HTTP APIs',
                    'Event sources: S3, DynamoDB, SQS, CloudWatch',
                    'Lambda layers for shared dependencies',
                    'Step Functions for workflow orchestration',
                    'SQS and SNS for messaging',
                    'Cold starts and performance optimization',
                    'Serverless Framework and AWS SAM'
                ],
                practiceQuestions: [
                    { question: 'What is a cold start in Lambda?', hint: 'The delay when Lambda needs to initialize a new execution environment (downloading code, starting runtime). Subsequent invocations are warm.', difficulty: 'medium' },
                    { question: 'What is the maximum execution time for a Lambda function?', hint: '15 minutes. For longer tasks, use Step Functions or ECS.', difficulty: 'easy' },
                    { question: 'How does API Gateway pricing work?', hint: 'You pay per API call and for data transfer. No charge for idle time.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Keep Lambda function packages small for faster cold starts.',
                    'Use environment variables for configuration, Secrets Manager for secrets.',
                    'Set appropriate timeout and memory values for each function.',
                    'Use Dead Letter Queues (DLQ) for failed event processing.',
                    'Use Provisioned Concurrency for latency-sensitive functions.'
                ]
            }
        }
    }
};
