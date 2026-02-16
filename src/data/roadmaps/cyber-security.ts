
import { RoadmapTrack } from './types';

export const cyberSecurityRoadmap: RoadmapTrack = {
    id: 'cyber-security',
    title: 'Cyber Security',
    description: 'Step by step guide to becoming a Cyber Security expert in 2025',
    category: 'role-based',
    icon: '🔒',
    accentColor: '#ef4444',
    rootNodeId: 'cs-root',
    nodes: {
        'cs-root': {
            id: 'cs-root',
            label: 'Cyber Security',
            description: 'Mastering the art of protecting systems, networks, and data from digital attacks through offensive and defensive strategies.',
            children: ['cs-networking', 'cs-os', 'cs-security-fundamentals'],
            resources: [
                { type: 'article', title: 'Roadmap.sh - Cyber Security', url: 'https://roadmap.sh/cyber-security', isFree: true },
                { type: 'video', title: 'Cybersecurity In 7 Minutes', url: 'https://www.youtube.com/watch?v=6mEXpEafv88', isFree: true },
                { type: 'course', title: 'Google Cybersecurity Professional Certificate', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity', isFree: false },
                { type: 'article', title: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework', isFree: true },
                { type: 'course', title: 'TryHackMe - Introduction to Cyber Security', url: 'https://tryhackme.com/path/outline/introtocyber', isFree: true }
            ],
            content: {
                overview: 'Cybersecurity is a multi-disciplinary field focused on protecting electronic data, systems, and networks from unauthorized access, disruption, and damage. In an era of constant connectivity, cybersecurity is no longer just an IT concern but a fundamental business and safety requirement. \n\nBecoming a security expert requires a deep understanding of how systems work at a low level to identify vulnerabilities. You must learn to think like an attacker (Offensive Security) to better defend systems (Defensive Security). The field encompasses everything from technical engineering and cryptography to policy management and incident response.',
                keyConcepts: [
                    'The CIA Triad: Confidentiality, Integrity, and Availability',
                    'Defense in Depth: Layered security controls',
                    'Identity and Access Management (IAM): MFA, SSO, and RBAC',
                    'Threat Modeling: Identifying and mitigating potential risks',
                    'Vulnerability Management: Identifying, classifying, and patching flaws',
                    'Zero Trust Architecture: "Never trust, always verify"',
                    'Incident Response (IR): Detection, Containment, Eradication, and Recovery',
                    'Governance, Risk, and Compliance (GRC): GDPR, HIPAA, and ISO 27001'
                ],
                practiceQuestions: [
                    { question: 'What is the primary goal of the "Integrity" pillar in CIA?', hint: 'Ensuring data is not altered by unauthorized parties.', difficulty: 'easy' },
                    { question: 'Explain the difference between a Vulnerability, a Threat, and a Risk.', hint: 'Weakness vs External Danger vs Likelihood of loss.', difficulty: 'medium' },
                    { question: 'What is "Social Engineering" and why is it so effective?', hint: 'Manipulating human psychology to bypass technical controls.', difficulty: 'easy' },
                    { question: 'Describe the "Principle of Least Privilege" (PoLP).', hint: 'Users should only have the minimum access necessary for their job.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Enforce Multi-Factor Authentication (MFA) across all critical systems.',
                    'Implement a regular patch management cycle to close known vulnerabilities.',
                    'Educate users continuously on phishing and social engineering tactics.',
                    'Perform regular security audits and penetration testing.',
                    'Encrypt sensitive data both "at rest" and "in transit".',
                    'Maintain and regularly test an off-site backup and disaster recovery plan.'
                ]
            },
            dayWisePlan: [{ day: 1, title: 'Getting Started', description: 'Understand the cybersecurity landscape.', tasks: ['Learn about CIA triad (Confidentiality, Integrity, Availability)', 'Explore career paths in security', 'Set up a home lab with VirtualBox'] }]
        },
        'cs-networking': {
            id: 'cs-networking',
            label: 'Networking Security',
            description: 'Mastering the protocols and infrastructure that secure data as it moves across local and global networks.',
            parentId: 'cs-root',
            children: ['cs-protocols', 'cs-firewalls'],
            resources: [
                { type: 'video', title: 'Network Security Full Course', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', isFree: true },
                { type: 'article', title: 'Cloudflare - What is Network Security?', url: 'https://www.cloudflare.com/learning/network-layer/network-security/', isFree: true },
                { type: 'article', title: 'Practical Packet Analysis - Chris Sanders', url: 'https://chrissanders.org/books/', isFree: false },
                { type: 'course', title: 'Cisco Networking Academy - Introduction to Cybersecurity', url: 'https://www.netacad.com/courses/cybersecurity/introduction-cybersecurity', isFree: true }
            ],
            content: {
                overview: 'Networking is the foundation of cybersecurity. To defend a network, you must understand how data travels across the internet, how devices are addressed, and how protocols behave. \n\nSecurity at the network level involves inspecting traffic, blocking unauthorized access, and ensuring that communication channels are encrypted. From mastering the 7-layer OSI model to analyzing packets with Wireshark, a network security expert must be able to spot anomalies in the massive flow of digital information.',
                keyConcepts: [
                    'OSI Model: Security implications at each of the 7 layers',
                    'TCP/IP Protocol Suite: 3-way handshake and packet headers',
                    'Subnetting and VLANs: Network segmentation and isolation',
                    'Secure Protocols: SSH, HTTPS, SFTP vs insecure alternatives',
                    'DNS Security: DNSSEC and protection against DNS poisoning',
                    'VPN Technologies: IPsec and SSL/TLS VPNs',
                    'Network Troubleshooting: Ping, Traceroute, and Nmap scanning',
                    'Wireless Security: WPA3 and Rogue AP detection'
                ],
                practiceQuestions: [
                    { question: 'Which OSI layer is responsible for IP addressing?', hint: 'Layer 3 (Network).', difficulty: 'easy' },
                    { question: 'Explain the difference between TCP and UDP from a security perspective.', hint: 'Connection-oriented vs Connectionless.', difficulty: 'medium' },
                    { question: 'What is a "Man-in-the-Middle" (MitM) attack?', hint: 'Attacker intercepting and potentially altering traffic.', difficulty: 'medium' },
                    { question: 'What is the purpose of the Address Resolution Protocol (ARP)?', hint: 'Resolving IP addresses to MAC addresses.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use "Network Segmentation" to limit the blast radius of an attack.',
                    'Disable all unnecessary services and ports on network hardware.',
                    'Always use encrypted management connections (SSH, not Telnet).',
                    'Regularly audit firewall rules and remove outdated entries.',
                    'Implement Intrusion Detection Systems (IDS) to monitor for malicious patterns.',
                    'Use strong encryption for all wireless networks (WPA3).'
                ]
            },
            dayWisePlan: [{ day: 1, title: 'Networking', description: 'Core networking for security.', tasks: ['Understand TCP/IP and OSI layers', 'Learn about subnetting and CIDR', 'Use Wireshark for packet analysis'] }]
        },
        'cs-protocols': { id: 'cs-protocols', label: 'Network Protocols', description: 'HTTP/HTTPS, DNS, SMTP, FTP, SSH — understand how each protocol works and its security implications.', parentId: 'cs-networking', resources: [{ type: 'article', title: 'Network Protocols', url: 'https://www.cloudflare.com/learning/network-layer/what-is-a-protocol/', isFree: true }] },
        'cs-firewalls': { id: 'cs-firewalls', label: 'Firewalls & IDS/IPS', description: 'Network security devices: firewalls (iptables, pf), intrusion detection/prevention systems (Snort, Suricata).', parentId: 'cs-networking', resources: [{ type: 'article', title: 'Firewall Types', url: 'https://www.cisco.com/c/en/us/products/security/firewalls/what-is-a-firewall.html', isFree: true }] },
        'cs-os': {
            id: 'cs-os',
            label: 'Operating System Security',
            description: 'Mastering the security mechanisms and hardening techniques for Linux and Windows environments.',
            parentId: 'cs-root',
            children: ['cs-linux', 'cs-windows'],
            resources: [
                { type: 'course', title: 'Linux Security and Hardening', url: 'https://www.udemy.com/course/linux-security/', isFree: false },
                { type: 'article', title: 'Microsoft - Windows Security Baseline', url: 'https://learn.microsoft.com/en-us/windows/security/threat-protection/windows-security-baselines', isFree: true },
                { type: 'video', title: 'Linux Privilege Escalation for Beginners', url: 'https://www.youtube.com/watch?v=yY1FSsHuMgI', isFree: true },
                { type: 'documentation', title: 'CIS Benchmarks for OS Hardening', url: 'https://www.cisecurity.org/benchmarks/', isFree: true }
            ],
            content: {
                overview: 'The Operating System (OS) is the layer between your hardware and your applications. If the OS is compromised, everything running on top of it is at risk. OS security involves fine-grained control over user permissions, securing the boot process, and monitoring system logs for suspicious activity. \n\nWhether you are managing a fleet of Linux servers in the cloud or Windows workstations in a corporate office, you must understand how to implement the "Principle of Least Privilege", manage patches effectively, and use security modules like SELinux or AppArmor to contain potential breaches. A secure OS is the first line of defense in a "Defense in Depth" strategy.',
                keyConcepts: [
                    'User and Group Management: Sudo, Root, and Admin privileges',
                    'File System Permissions: RWX, ACLs, and Chroot jails',
                    'The Boot Process: Secure Boot, UEFI, and Kernel verification',
                    'Process Isolation and Sandboxing (Docker, LXC)',
                    'Logging and Auditing: Syslog, Auditd, and Event Viewer',
                    'Kernel Security: SELinux, AppArmor, and Grsecurity',
                    'Patch Management and Vulnerability Scanning',
                    'Memory Protection: ASLR, DEP, and Canary tokens'
                ],
                practiceQuestions: [
                    { question: 'What is the purpose of ASLR (Address Space Layout Randomization)?', hint: 'To prevent attackers from predicting the location of system functions in memory.', difficulty: 'hard' },
                    { question: 'Explain the "Setuid" bit in Linux.', hint: 'Allows a program to run with the permissions of the file owner.', difficulty: 'medium' },
                    { question: 'What is a "Sticky Bit" used for?', hint: 'Ensuring only the file owner can delete their own files in a shared directory.', difficulty: 'easy' },
                    { question: 'Why should you disable the "Root" login over SSH?', hint: 'To prevent brute-force attacks on the most powerful account.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always follow the "Principle of Least Privilege" (PoLP).',
                    'Disable all non-essential services and ports on every system.',
                    'Automate your patch management to ensure rapid response to new threats.',
                    'Use centralized logging to detect patterns across your entire infrastructure.',
                    'Implement host-based firewalls (iptables, firewalld, Windows Firewall).',
                    'Regularly audit user accounts and remove those no longer needed.'
                ]
            }
        },
        'cs-linux': { id: 'cs-linux', label: 'Linux Security', description: 'Linux hardening, SELinux/AppArmor, log analysis, file integrity monitoring, and penetration testing with Kali.', parentId: 'cs-os', resources: [{ type: 'article', title: 'Kali Linux', url: 'https://www.kali.org/docs/', isFree: true }] },
        'cs-windows': { id: 'cs-windows', label: 'Windows Security', description: 'Active Directory, Group Policy, Windows Defender, Event Logs, PowerShell security, and registry.', parentId: 'cs-os', resources: [{ type: 'documentation', title: 'Windows Security Docs', url: 'https://docs.microsoft.com/en-us/windows/security/', isFree: true }] },
        'cs-security-fundamentals': {
            id: 'cs-security-fundamentals',
            label: 'Security Fundamentals & Tools',
            description: 'Mastering the core theoretical frameworks and standard industry tools used for ethical hacking and defense.',
            parentId: 'cs-root',
            children: ['cs-crypto', 'cs-web-security', 'cs-pentest'],
            resources: [
                { type: 'article', title: 'OWASP Top 10 - Official Website', url: 'https://owasp.org/www-project-top-ten/', isFree: true },
                { type: 'video', title: 'Metasploit for Beginners', url: 'https://www.youtube.com/watch?v=k-2_Y8pT68A', isFree: true },
                { type: 'article', title: 'The MITRE ATT&CK Framework', url: 'https://attack.mitre.org/', isFree: true },
                { type: 'course', title: 'Cybrary - End-User Security Awareness', url: 'https://www.cybrary.it/course/end-user-security-awareness/', isFree: true }
            ],
            content: {
                overview: 'To be professional in cybersecurity, you must move beyond just "hacking tools" and understand the formal frameworks that govern the industry. Security fundamentals cover the mathematical basis of cryptography, the methodology of a penetration test, and the standardized language used to describe vulnerabilities. \n\nBy mastering the OWASP Top 10, the MITRE ATT&CK framework, and the AAA (Authentication, Authorization, Accounting) model, you gain the ability to communicate with security teams globally. You will also begin your journey with the "Swiss Army Knives" of the trade: Nmap for scanning, Burp Suite for web testing, and Metasploit for exploitation.',
                keyConcepts: [
                    'The AAA Framework: Authentication, Authorization, and Accounting',
                    'The Cyber Kill Chain: Reconn, Weaponization, Delivery, Exploitation...',
                    'MITRE ATT&CK: A global knowledge base of adversary tactics',
                    'OWASP Top 10: The definitive guide to web vulnerabilities',
                    'Vulnerability Scoring: Understanding CVSS vectors',
                    'Cryptography: Symmetric vs Asymmetric and Hashing',
                    'Steganography: Hiding data within other files',
                    'Asset Management and Risk Assessment methodology'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between "Vulnerability Scanning" and "Penetration Testing"?', hint: 'Automated detection vs Manual exploitation.', difficulty: 'medium' },
                    { question: 'Explain the "Salting" technique in password hashing.', hint: 'Adding random data to a password before hashing to prevent rainbow table attacks.', difficulty: 'medium' },
                    { question: 'What does the "A" in AAA stand for?', hint: 'Authentication, Authorization, and Accounting.', difficulty: 'easy' },
                    { question: 'What is a "Zero-Day" vulnerability?', hint: 'A flaw that is unknown to the vendor and has no patch.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always stay ethical—only test systems you have explicit permission to audit.',
                    'Use standardized frameworks (NIST, ISO) to guide your security strategy.',
                    'Prioritize vulnerabilities based on risk and impact, not just CVSS score.',
                    'Keep detailed logs of your penetration testing activities for reporting.',
                    'Combine technical controls with user education for the best results.',
                    'Document your findings clearly with actionable remediation steps.'
                ]
            },
            dayWisePlan: [{ day: 1, title: 'Security Basics', description: 'Core security concepts.', tasks: ['Study the CIA triad and AAA framework', 'Learn OWASP Top 10 vulnerabilities', 'Understand symmetric vs asymmetric encryption'] }]
        },
        'cs-crypto': { id: 'cs-crypto', label: 'Cryptography', description: 'Encryption (AES, RSA), hashing (SHA, bcrypt), digital signatures, TLS/SSL, and PKI.', parentId: 'cs-security-fundamentals', resources: [{ type: 'course', title: 'Cryptography I - Stanford', url: 'https://www.coursera.org/learn/crypto', isFree: true }] },
        'cs-web-security': {
            id: 'cs-web-security',
            label: 'Web Application Security',
            description: 'Mastering the techniques to defend web applications against high-impact vulnerabilities and sophisticated attacks.',
            parentId: 'cs-security-fundamentals',
            resources: [
                { type: 'article', title: 'PortSwigger - Web Security Academy', url: 'https://portswigger.net/web-security', isFree: true },
                { type: 'article', title: 'OWASP Top 10:2025 - The Official Guide', url: 'https://owasp.org/www-project-top-ten/', isFree: true },
                { type: 'video', title: 'Web Bug Bounty Hunter\'s Methodology', url: 'https://www.youtube.com/watch?v=pAnR9yWp-V0', isFree: true },
                { type: 'course', title: 'Mastering Web Attacks and Exploitation (OffSec)', url: 'https://www.offsec.com/courses/awae-oswe/', isFree: false }
            ],
            content: {
                overview: 'Web applications are the most exposed part of an organization\'s digital footprint, making them a primary target for attackers. Web security involves protecting websites and online services against threats that exploit vulnerabilities in an application’s code, its underlying logic, or its server configuration. \n\nModern web security goes beyond simple XSS or SQL Injection; it requires understanding complex authentication flows (OAuth/SAML), securing REST/GraphQL APIs, and mitigating server-side logic flaws. A web security expert must be proficient in using tools like Burp Suite and OWASP ZAP to proactively find and patch issues.',
                keyConcepts: [
                    'The OWASP Top 10: A standard awareness document for developers',
                    'Injection Flaws: SQLi, NoSQLi, and OS Command Injection',
                    'Cross-Site Scripting (XSS): Stored, Reflected, and DOM-based',
                    'Cross-Site Request Forgery (CSRF): Tokens and SameSite cookies',
                    'Broken Access Control: IDOR and Privilege Escalation',
                    'Insecure Deserialization and its impact on modern stacks',
                    'Server-Side Request Forgery (SSRF): Targeting cloud metadata',
                    'Security Headers: CSP, HSTS, X-Frame-Options, and CORS'
                ],
                practiceQuestions: [
                    { question: 'What is the "Same-Origin Policy" (SOP)?', hint: 'The fundamental security boundary for web content.', difficulty: 'hard' },
                    { question: 'How does a Content Security Policy (CSP) prevent XSS?', hint: 'By restricting which scripts can be executed and from where.', difficulty: 'medium' },
                    { question: 'What is an "Insecure Direct Object Reference" (IDOR)?', hint: 'Accessing resources by changing a parameter like /user/123.', difficulty: 'easy' },
                    { question: 'Explain the "HttpOnly" cookie flag.', hint: 'Prevents JavaScript from accessing the cookie, mitigating XSS theft.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Never trust user input—always validate and sanitize on the server side.',
                    'Use parameterized queries (Prepared Statements) for all database access.',
                    'Encode all output properly to prevent script execution in the browser.',
                    'Implement robust Rate Limiting and WAFs (Web Application Firewalls).',
                    'Regularly scan your dependencies for known vulnerabilities.',
                    'Minimize the information returned in error messages to prevent "Fingerprinting".'
                ]
            },
            dayWisePlan: [{ day: 1, title: 'Web Attacks', description: 'Common web vulnerabilities.', tasks: ['Practice XSS attacks and prevention', 'Learn SQL injection techniques', 'Understand CSRF and CORS'] }]
        },
        'cs-pentest': { id: 'cs-pentest', label: 'Penetration Testing', description: 'Ethical hacking methodology: reconnaissance, scanning, exploitation, and reporting using Metasploit, Burp Suite, Nmap.', parentId: 'cs-security-fundamentals', resources: [{ type: 'course', title: 'TryHackMe', url: 'https://tryhackme.com/', isFree: true }, { type: 'article', title: 'HackTheBox', url: 'https://www.hackthebox.com/', isFree: true }], dayWisePlan: [{ day: 1, title: 'Ethical Hacking', description: 'Penetration testing fundamentals.', tasks: ['Set up Kali Linux and Metasploit', 'Learn Nmap scanning techniques', 'Practice on TryHackMe rooms'] }] },
    }
};
