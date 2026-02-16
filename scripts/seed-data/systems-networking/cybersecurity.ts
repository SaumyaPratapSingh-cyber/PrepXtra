// Cybersecurity Tutorial Seed Data
export const cybersecurityTopics = [
    {
        title: "Introduction to Cybersecurity",
        slug: "cyber-intro",
        description: "The CIA Triad, Threat actors, and basic definitions.",
        order: 1, estimatedMinutes: 40, difficulty: "Easy",
        content: `
# Introduction to Cybersecurity

Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks.

## 1. The CIA Triad
The core skeleton of security:
- **Confidentiality**: Ensuring only authorized people see the data. (Encryption).
- **Integrity**: Ensuring data hasn't been changed by unauthorized people. (Hashing).
- **Availability**: Ensuring systems are up when needed. (DDoS protection, Backups).

## 2. Threat Actors
- **Script Kiddies**: Use known tools without understanding them.
- **Hacktivists**: Hacking for a political/social cause.
- **Cyber Criminals**: Hacking for profit (Ransomware).
- **State-Sponsored**: Nation-states hacking for espionage or sabotage.

## 3. Vulnerability vs Threat vs Risk
- **Vulnerability**: A weakness (A hole in the wall).
- **Threat**: Someone who might exploit the weakness (An intruder).
- **Risk**: The probability and impact (Chance someone breaks in and steals your jewels).

## 4. Defense in Depth
Never rely on one layer. If the firewall fails, you need an IDS. If that fails, you need encryption.
`, resources: []
    },
    {
        title: "Common Cyber Threats",
        slug: "cyber-threats",
        description: "Malware, Phishing, Social Engineering, and DDoS.",
        order: 2, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Common Cyber Threats

## 1. Malware (Malicious Software)
- **Virus**: Attaches to a file; needs human action to spread.
- **Worm**: Self-replicating; spreads over networks automatically.
- **Trojan**: Disguised as a good program.
- **Ransomware**: Encrypts your files and demands money for the key.
- **Spyware**: Secretly records your typing (Keyloggers).

## 2. Social Engineering
manipulating people into giving up confidential info.
- **Phishing**: Fake emails (e.g., "Your bank account is locked").
- **Vishing**: Voice phishing (Phone calls).
- **Baiting**: Leaving a "Free" USB drive in a parking lot.

## 3. Network Attacks
- **DDoS**: Overwhelming a server with junk traffic.
- **MITM (Man-in-the-Middle)**: Intercepting your Wi-Fi at a coffee shop.

## 4. Zero-Day Attack
An attack that exploits a vulnerability that the developer doesn't know about yet. (No "patch" exists).
`, resources: []
    },
    {
        title: "Cryptography: Symmetric",
        slug: "cryptography-symmetric",
        description: "AES, DES, and the challenge of key sharing.",
        order: 3, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Symmetric Cryptography

Uses the **SAME key** for both encryption and decryption.

## 1. How it works
Think of it like a physical safe. You need the same key to lock it and unlock it.

## 2. Common Algorithms
- **AES (Advanced Encryption Standard)**: The gold standard. 128, 192, or 256 bits. High performance.
- **DES / 3DES**: Old and weak. (No longer recommended).
- **ChaCha20**: Fast on mobile/ARM devices.

## 3. Pros and Cons
- **Pros**: Very fast. Good for encrypting large files.
- **Cons**: **Key Management**. How do you send the key to the other person without someone intercepting it?

## 4. Use Case
Encrypting your hard drive (BitLocker/FileVault).
`, resources: []
    },
    {
        title: "Cryptography: Asymmetric",
        slug: "cryptography-asymmetric",
        description: "RSA, ECC, and Public/Private key pairs.",
        order: 4, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Asymmetric Cryptography (Public Key)

Uses a **Key Pair**: A Public key and a Private key.

## 1. The Logic
- **Public Key**: Share it with the world. Anyone can use it to encrypt a message for you.
- **Private Key**: Keep it secret. ONLY this key can decrypt messages sent using your public key.

## 2. Common Algorithms
- **RSA**: Based on the difficulty of factoring large prime numbers.
- **ECC (Elliptic Curve Cryptography)**: Provides the same security as RSA but with much smaller keys (Faster).

## 3. Use Cases
- **HTTPS**: Your browser gets a server's public key to start a secure session.
- **Digital Signatures**: Using your private key to "sign" a document; anyone with your public key can verify it was you.

## 4. Hybrid Encryption
In practice, we use Asymmetric encryption to safely share a Symmetric key, then use that Symmetric key for the rest of the conversation (because it's faster).
`, resources: []
    },
    {
        title: "Hashing & Digital Signatures",
        slug: "hashing-signatures",
        description: "MD5, SHA-256, and ensuring data integrity.",
        order: 5, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Hashing

A hash is a "One-way" fixed-length fingerprint of data. You cannot get the data back from the hash.

## 1. Properties of a Good Hash
- **Deterministic**: Same input always gives same output.
- **Quick to compute**: But not TOO quick (helps against brute force).
- **Avalanche Effect**: Change one bit of input, the whole hash changes.
- **Collision Resistant**: Impossible to find two different inputs with the same hash.

## 2. Common Algorithms
- **MD5 / SHA-1**: **BROKEN**. Do not use for security.
- **SHA-256 / SHA-3**: Standard for web security and blockchain.
- **Bcrypt / Argon2**: Specialized for storing passwords (includes "Salting").

## 3. Salting
Adding a random string to a password before hashing it. This prevents "Rainbow Table" attacks where hackers use pre-calculated lists of common password hashes.

## 4. Digital Signatures
A combination of Hashing and Asymmetric encryption. It proves **Integrity** (data has not changed) and **Non-repudiation** (you can't deny you sent it).
`, resources: []
    },
    {
        title: "Web Security: OWASP Top 10",
        slug: "web-security-owasp",
        description: "SQLi, XSS, and broken access control.",
        order: 6, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Web Security (OWASP Top 10)

The standard list of the most critical web app security risks.

## 1. Broken Access Control
Users being able to see or modify data they shouldn't (e.g., changing \`user_id=5\` to \`user_id=1\` in the URL).

## 2. Cryptographic Failures
Storing passwords in plain text or using weak encryption (like MD5).

## 3. Injection (SQLi)
Inserting malicious SQL code into an input field.
- **Prevention**: Use **Prepared Statements** (Parameterized queries).

## 4. Cross-Site Scripting (XSS)
Injecting malicious Javascript into a webpage that other users will see. It can steal session cookies.
- **Prevention**: Sanitize and encode all user-generated content.

## 5. Security Misconfiguration
Leaving default passwords (admin/admin) or revealing detailed error messages to attackers.
`, resources: []
    },
    {
        title: "Network Security: WAF, IDS, IPS",
        slug: "network-security-pro",
        description: "Deep packet inspection and behavioral analysis.",
        order: 7, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Professional Network Security

## 1. Firewall Types
- **Packet Filtering**: Simple, checks IP/Port.
- **Stateful**: Tracks active connections.
- **NGFW (Next-Gen Firewall)**: Can look inside the data to see if it's "Facebook" or "Malware".

## 2. WAF (Web Application Firewall)
A specialized firewall that protects web servers by looking for SQLi and XSS patterns in HTTP traffic.

## 3. IDS vs IPS
- **Signature-Based**: Looks for a specific "Fingerprint" of known malware. (Fast, but fails against new threats).
- **Behavior-Based**: Looks for weird patterns (e.g., a server suddenly sending 1,000 emails per second). (Good for new threats, prone to false alarms).

## 4. Honeypots
A fake server designed to look vulnerable. It attracts hackers so security teams can study their methods without risking real data.
`, resources: []
    },
    {
        title: "Identity & Access Management (IAM)",
        slug: "iam-security",
        description: "Authentication, Authorization, and MFA.",
        order: 8, estimatedMinutes: 55, difficulty: "Easy",
        content: `
# IAM (Identity & Access Management)

IAM is about ensuring the right people have the right access at the right time.

## 1. The Three As
- **Identification**: Telling the system who you are (Username).
- **Authentication**: Proving it (Password, Token).
- **Authorization**: What are you allowed to do? (Read/Write).

## 2. Multi-Factor Authentication (MFA)
Using two or more categories:
- **Something you Know**: Password, PIN.
- **Something you Have**: Phone, Hardware key (YubiKey).
- **Something you Are**: Fingerprint, FaceID.

## 3. Single Sign-On (SSO)
One set of credentials for all apps (e.g., Log in with Google/Microsoft).
- Uses protocols like **SAML** and **OIDC**.

## 4. RBAC (Role-Based Access Control)
Assigning permissions to a **Role** (e.g., "Manager") rather than a specific person.
`, resources: []
    },
    {
        title: "Cloud Security Foundations",
        slug: "cloud-security-intro",
        description: "Shared Responsibility Model and S3 leak prevention.",
        order: 9, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Cloud Security

## 1. Shared Responsibility Model
- **Cloud Provider (AWS/Google)**: Responsible for the infrastructure (Physical security, global networking).
- **Customer (You)**: Responsible for the data, configurations, and identity. "Security IN the cloud."

## 2. Infrastructure as Code (IaC)
Scanning your Terraform or CloudFormation scripts for security holes (like open SSH ports) BEFORE you deploy.

## 3. S3 Bucket Security
The most common cause of cloud leaks: Leaving a storage bucket accidentally set to "Public".

## 4. Serverless Security
In AWS Lambda, you don't manage the OS, but you must ensure the function code itself doesn't have vulnerabilities and has the smallest possible IAM permissions.
`, resources: []
    },
    {
        title: "Penetration Testing Phases",
        slug: "pentesting-phases",
        description: "Recon, Scanning, Gaining Access, and Reporting.",
        order: 10, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Penetration Testing (Ethical Hacking)

A systematic attempt to break into your own system to find holes.

## 1. The Five Phases
1. **Reconnaissance**: Gathering info about the target (Whois, LinkedIn).
2. **Scanning**: Using tools like **Nmap** to find open ports and versions.
3. **Gaining Access**: Using an exploit to break in.
4. **Maintaining Access**: Installing a "Backdoor".
5. **Clearing Tracks / Reporting**: Deleting logs and writing the final report.

## 2. Testing Types
- **Black Box**: Tester has zero knowledge of the system.
- **White Box**: Tester has full access to source code and diagrams.
- **Grey Box**: Some internal knowledge.

## 3. Red vs Blue Team
- **Red Team**: The attackers (offensive).
- **Blue Team**: The defenders (monitoring/incident response).
- **Purple Team**: Collaboration between the two.
`, resources: []
    },
    {
        title: "Malware Analysis Basics",
        slug: "malware-analysis-intro",
        description: "Static vs Dynamic analysis in sandboxes.",
        order: 11, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Malware Analysis

Understanding what a virus does without infecting yourself.

## 1. Static Analysis
Examining the code without running it.
- **Fingerprinting**: Checking MD5/SHA hashes on **VirusTotal**.
- **String analysis**: Looking for hardcoded IPs or domains.
- **Disassembly**: Using **Ghidra** or **IDA Pro** to see the machine code.

## 2. Dynamic Analysis
Running the malware in a safe, isolated **Sandbox** (e.g., Cuckoo Sandbox).
- Monitoring which files it creates.
- Monitoring which network calls it tries to make.

## 3. Persistence Mechanisms
How malware stays on the PC after a reboot. (e.g., Adding itself to Startup items or Registry keys).

## 4. Obfuscation
Malware authors "Pack" or "Encrypt" their code to hide its true purpose from antivirus scanners.
`, resources: []
    },
    {
        title: "Incident Response (SIEM)",
        slug: "incident-response-siem",
        description: "What to do when you get hacked: Triage and Recovery.",
        order: 12, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Incident Response

## 1. The SANS Framework (PICERL)
1. **Preparation**: Having a team and tools ready.
2. **Identification**: Detecting the event.
3. **Containment**: Cutting the server off from the network to stop the spread.
4. **Eradication**: Deleting the malware and fixing the hole.
5. **Recovery**: Restoring from clean backups.
6. **Lessons Learned**: Writing a report to prevent a repeat.

## 2. SIEM (Security Info & Event Management)
A central "Brain" (like **Splunk** or **ELK**) that collects billions of logs from every PC, firewall, and database. It uses AI to spot patterns of a hack in real-time.

## 3. SOC (Security Operations Center)
The room full of screens where analysts monitor the SIEM 24/7.
`, resources: []
    },
    {
        title: "Zero Trust Architecture",
        slug: "zero-trust-security",
        description: "Never trust, always verify.",
        order: 13, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Zero Trust Architecture

The old model was "Castle and Moat": If you are inside the office Wi-Fi, you are trusted. This failed because once an attacker gets in, they can move to any server.

## 1. The Core Principle
Assume the network is ALWAYS compromised.

## 2. Micro-segmentation
Instead of one big internal network, every server is in its own tiny "bubble".

## 3. Continuous Verification
Just because you logged in 1 hour ago doesn't mean you are still trusted. The system checks your location, device health, and behavior for every single request.

## 4. Implementation
- **Principle of Least Privilege**.
- **Identity-based access** (rather than IP-based).
`, resources: []
    },
    {
        title: "Buffer Overflows & Memory Safety",
        slug: "buffer-overflow-security",
        description: "Smashing the stack for fun and profit.",
        order: 14, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Buffer Overflows

A classic vulnerability in C/C++ where an app writes more data to a buffer than it can hold, overwriting the "Return Address" on the stack.

## 1. The Hack
The attacker overwrites the return address with the memory address of their own malicious "Shellcode" tucked inside the buffer. When the function ends, it jumps straight into the hacker's code.

## 2. Defensive Technologies
- **ASLR (Address Space Layout Randomization)**: Randomly moving things around in RAM so the hacker doesn't know where to jump.
- **DEP / NX (Data Execution Prevention)**: Marking the stack as "Non-Executable" so code can't run from it.
- **Stack Canaries**: A random "Secret" number placed on the stack; if it gets overwritten, the program crashes instead of being hacked.

## 3. Memory Safe Languages
Languages like **Rust** and **Java** prevent this entire class of bug by checking bounds automatically.
`, resources: []
    },
    {
        title: "Wireless & IoT Security",
        slug: "wireless-iot-security",
        description: "War-driving and the 'S' in IoT stands for Security.",
        order: 15, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Wireless & IoT Security

## 1. Wireless Attacks
- **Evil Twin**: Setting up a fake Starbucks Wi-Fi to steal passwords.
- **WPA2 Cracking**: Capturing the "Handshake" and cracking it offline using GPUs.

## 2. IoT (Internet of Things)
Smart fridges, cameras, and bulbs are often the weakest link.
- **Mirai Botnet**: Used millions of cameras with default passwords (\`admin/1234\`) to launch a record-breaking DDoS.

## 3. Best Practices
- Put IoT devices on a separate VLAN.
- Change default passwords immediately.
- Turn off **WPS** (Wi-Fi Protected Setup), which is easily hacked.
`, resources: []
    },
    {
        title: "Compliance & Frameworks",
        slug: "security-compliance-frameworks",
        description: "ISO 27001, SOC2, and GDPR.",
        order: 16, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Security Compliance

Compliance isn't just about security; it's about **Proof** for customers and regulators.

## 1. GDPR (Europe)
Focuses on Data Privacy. Massive fines if you lose user data or handle it without consent.

## 2. SOC2 (System and Organization Controls)
Common for SaaS companies. Proves to clients that someone else (an auditor) has checked that you have good security controls.

## 3. ISO 27001
An international standard for an **Information Security Management System (ISMS)**. It's more about the company's *Process* than just the code.

## 4. PCI-DSS
The strict rules you must follow if you store, process, or transmit credit card data.
`, resources: []
    },
    {
        title: "Digital Forensics",
        slug: "digital-forensics-intro",
        description: "Preserving evidence for the courtroom.",
        order: 17, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Digital Forensics

The application of science to the identification, collection, and analysis of digital data for criminal investigations.

## 1. Chain of Custody
A log showing exactly WHO had the evidence at every second. If the chain is broken, the evidence is useless in court.

## 2. Order of Volatility
Collect things that disappear fast FIRST:
1. CPU Registers / Cache.
2. RAM.
3. Network State.
4. Hard Drive data.

## 3. Forensic Imaging
Never work on the original drive! Make a bit-for-bit copy and compute a hash to prove the copy is identical.

## 4. Recovering Deleted Files
Most OS don't actually delete data; they just mark the space as "Free". Forensics tools can scan for "Headers" and "Footers" to carve files back from the dead.
`, resources: []
    },
    {
        title: "Cryptography: Public Key Infrastructure",
        slug: "pki-infrastructure",
        description: "CAs, Revocation, and the Chain of Trust.",
        order: 18, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Public Key Infrastructure (PKI)

How do we know the "Public Key" for \`google.com\` actually belongs to Google and not a hacker?

## 1. Certificate Authorities (CAs)
Trusted third parties (like **Let's Encrypt** or **DigiCert**) that sign your public key to vouch for you.

## 2. The Chain of Trust
1. Your Browser trusts a "Root CA" (pre-installed in Windows/MacOS).
2. The Root CA trusts an "Intermediate CA".
3. The Intermediate CA trusts the website's certificate.

## 3. Revocation (CRL / OCSP)
If a private key is stolen, the certificate must be canceled.
- **CRL**: A big list of "Cancelled" certificates.
- **OCSP**: A real-time check: "Is this cert still valid?".

## 4. Wildcard Certificates
One certificate that covers all subdomains: \`*.example.com\`.
`, resources: []
    },
    {
        title: "Secure Coding & DevSecOps",
        slug: "secure-coding-devsecops",
        description: "SAST, DAST, and shifting left.",
        order: 19, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Secure Coding & DevSecOps

"Shift Left": Detecting security issues at the beginning of development, when they are cheap to fix, rather than at the end.

## 1. SAST (Static Analysis Security Testing)
Scanning the source code for bugs (e.g., "You are using an old, buggy version of jQuery").

## 2. DAST (Dynamic Analysis Security Testing)
Testing the running app from the outside, like a hacker would (e.g., trying to inject SQLi into every input).

## 3. Secret Scanning
Automated tools that scan your GitHub repo to ensure you haven't accidentally committed an AWS password or API key.

## 4. Software Composition Analysis (SCA)
Checking that your \`npm\` or \`pip\` dependencies don't have known vulnerabilities.
`, resources: []
    },
    {
        title: "Future: Post-Quantum Cryptography",
        slug: "post-quantum-security",
        description: "What happens when RSA is broken?",
        order: 20, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Post-Quantum Cryptography (PQC)

Quantum computers today are small. But in 10-20 years, a powerful one could break **RSA** and **ECC** (the basis of all web security) in seconds.

## 1. The Strategy
Researchers are developing new math problems (like **Lattice-based** math) that are impossible for BOTH classical and quantum computers to solve.

## 2. NIST Competition
The US government is currently standardizing the algorithms that will replace RSA.

## 3. Store Now, Decrypt Later
Agencies and hackers are currently capturing encrypted traffic and saving it on hard drives, waiting for the day they have a quantum computer to unlock it.

## 4. Crypto-Agility
The ability of a system to quickly swap out its encryption algorithms as old ones become weak.
`, resources: []
    }
];
