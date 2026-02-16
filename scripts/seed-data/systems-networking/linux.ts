// Linux Tutorial Seed Data
export const linuxTopics = [
    {
        title: "Introduction to Linux",
        slug: "linux-introduction",
        description: "History, Kernel vs Shell, and why Linux powers the world.",
        order: 1, estimatedMinutes: 40, difficulty: "Easy",
        content: `
# Introduction to Linux

Linux is an open-source, Unix-like operating system kernel first released by Linus Torvalds in 1991.

## 1. The Linux Architecture
- **Hardware**: The physical machine.
- **Kernel**: The heart. Manages CPU, memory, and devices.
- **Shell**: The interface. Translates user commands to kernel actions.
- **Applications**: Tools like \`ls\`, \`vim\`, or browsers.

## 2. Linux Distributions (Distros)
Since the kernel is open-source, different groups bundle it with different tools:
- **Debian Family**: Ubuntu, Linux Mint. (User-friendly).
- **Red Hat (RHEL) Family**: Fedora, CentOS, AlmaLinux. (Enterprise).
- **Arch**: Rolling release, DIY.
- **Alpine**: Ultra-lightweight (Used for Docker).

## 3. Why Linux?
- **Open Source**: Free to use and modify.
- **Stability**: Can run for years without a reboot.
- **Security**: Granular permissions and community auditing.
- **Performance**: Very low overhead.

## 4. Everything is a File
In Linux, your hard drive, your keyboard, and even the running processes are represented as files in the directory tree.
`, resources: []
    },
    {
        title: "Filesystem Hierarchy (FHS)",
        slug: "linux-fhs",
        description: "Navigating the directory structure: /bin, /etc, /home.",
        order: 2, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Linux Filesystem Hierarchy

Unlike Windows with its \`C:\\\` drive, Linux uses a unified tree starting at Root (\`/\`).

## 1. Key Directories
- **/**: The root. Everything starts here.
- **/bin & /usr/bin**: Executable binaries for all users (e.g., \`ls\`, \`cp\`).
- **/sbin**: System binaries for the Root user.
- **/etc**: System configuration files (The "Registry" of Linux).
- **/home**: User personal folders.
- **/root**: Home directory for the superuser.
- **/tmp**: Temporary files (wiped on reboot).
- **/var**: Variable data like logs (\`/var/log\`) and databases.
- **/dev**: Device files (e.g., \`/dev/sda\` for hard drive).
- **/proc & /sys**: Virtual filesystems representing kernel and system state.

## 2. Absolute vs Relative Paths
- **Absolute**: Starts from \`/\`. (e.g., \`/home/user/document.txt\`).
- **Relative**: Starts from current location. (e.g., \`../document.txt\`).

## 3. Hidden Files
Files starting with a \`.\` (e.g., \`.bashrc\`) are hidden by default in the file explorer and \`ls\`.
`, resources: []
    },
    {
        title: "Core Command Line Skills",
        slug: "linux-core-commands",
        description: "The 'survival kit' for the terminal: ls, cd, cp, mv, rm.",
        order: 3, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Core Command Line Skills

## 1. Navigation
- \`pwd\`: Print Working Directory.
- \`cd <dir>\`: Change Directory. (\`cd ..\` to go up).
- \`ls\`: List files. (\`ls -la\` for hidden files and details).

## 2. File Operations
- \`touch <file>\`: Create an empty file.
- \`mkdir <dir>\`: Create a folder.
- \`cp <src> <dest>\`: Copy. (\`cp -r\` for folders).
- \`mv <src> <dest>\`: Move or Rename.
- \`rm <file>\`: Delete. (**DANGER**: There is no "Recycle Bin" in terminal!).

## 3. Reading Files
- \`cat\`: Show whole file.
- \`less\`: Page through a long file.
- \`head / tail\`: Show the first or last 10 lines.

## 4. Getting Help
- \`man <command>\`: The manual pages (The most important command!).
- \`--help\`: Short help flag for most tools.
`, resources: []
    },
    {
        title: "Permissions & Ownership",
        slug: "linux-permissions",
        description: "Understanding chmod, chown, and the Root user.",
        order: 4, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Linux Permissions

Every file/folder has an Owner, a Group, and permissions for Read (r), Write (w), and Execute (x).

## 1. The Permission String
Example: \`-rwxr-xr--\`
- **1st Char**: \`-\` for file, \`d\` for directory.
- **Next 3**: Owner permissions.
- **Next 3**: Group permissions.
- **Last 3**: Others permissions.

## 2. The Octal Method (Numbers)
- **4**: Read
- **2**: Write
- **1**: Execute
- **7 (4+2+1)**: Full access.
- **5 (4+1)**: Read + Execute.
- \`chmod 755 script.sh\`: Owner=Full, Others=Read/Exec.

## 3. Ownership
- \`chown user:group file\`: Change who owns the file.

## 4. The Sudo Command
**Root** is the god-user who can do anything.
**Sudo** (SuperUser Do) lets a normal user run a command with Root privileges temporarily.
`, resources: []
    },
    {
        title: "Users & Groups Management",
        slug: "linux-user-mgmt",
        description: "Creating accounts, management passwords, and /etc/passwd.",
        order: 5, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Users & Groups Management

## 1. Important Files
- **/etc/passwd**: List of all users and their shell/home info.
- **/etc/shadow**: Encrypted user passwords.
- **/etc/group**: List of all groups.

## 2. Commands
- \`useradd <name>\`: Create a new user.
- \`passwd <name>\`: Set or change a password.
- \`usermod -aG sudo <name>\`: Add a user to the sudoers group.
- \`userdel\`: Delete a user.

## 3. Switching Users (su)
- \`su - <name>\`: Switch to another user.
- \`exit\`: Go back to previous user.

## 4. Who am I?
- \`whoami\`: Show current username.
- \`id\`: Show UID (User ID) and GID (Group ID).
`, resources: []
    },
    {
        title: "Shells & Bash Scripting",
        slug: "linux-shells-scripting",
        description: "Variables, Loops, and automating the terminal.",
        order: 6, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Shells & Bash Scripting

A shell script is just a text file with a list of commands, starting with a "Shebang" (\`#!/bin/bash\`).

## 1. Variables
\`\`\`bash
NAME="PrepXtra"
echo "Hello $NAME"
\`\`\`

## 2. Arguments
- \`$0\`: Name of the script.
- \`$1, $2...\`: First and second arguments.

## 3. Conditionals (If/Else)
\`\`\`bash
if [ "$SIZE" -gt 100 ]; then
  echo "Big file"
else
  echo "Small file"
fi
\`\`\`

## 4. Loops
\`\`\`bash
for file in *.txt; do
  mv "$file" "\${file %.txt}.bak"
done
\`\`\`

## 5. Piping & Redirection
- \`>\`: Save output to file (overwrite).
- \`>>\`: Append output to file.
- \`|\`: Send output of command 1 as input to command 2.
`, resources: []
    },
    {
        title: "Text Editing with Vim",
        slug: "linux-vim-guide",
        description: "The modal editor that's everywhere. How to enter, edit, and exit.",
        order: 7, estimatedMinutes: 45, difficulty: "Medium",
        content: `
# Text Editing with Vim

Vim is a "Modal" editor. Your keyboard behaves differently depending on the MODE you are in.

## 1. The Three Main Modes
1. **Normal Mode** (Default): For navigating and deleting.
2. **Insert Mode** (Press \`i\`): For typing text.
3. **Command Mode** (Press \`:\`): For saving and exiting.

## 2. Navigation (Normal Mode)
- \`h, j, k, l\`: Left, Down, Up, Right (Old school).
- \`w / b\`: Jump by word.
- \`G\`: Go to end of file / \`gg\`: Go to start.

## 3. Editing
- \`x\`: Delete character.
- \`dd\`: Delete (cut) whole line.
- \`yy\`: Yank (copy) line / \`p\`: Paste.
- \`u\`: Undo.

## 4. Saving & Exiting (Command Mode)
- \`:w\`: Write (save).
- \`:q!\`: Quit without saving (The "Emergency Exit").
- \`:wq\`: Save and Quit.
`, resources: []
    },
    {
        title: "Process Monitoring",
        slug: "linux-process-mgmt",
        description: "Managing background tasks, PID, and Kill signals.",
        order: 8, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Linux Process Management

## 1. Viewing Processes
- \`ps aux\`: Snapshot of all running processes.
- \`top\`: Real-time list (Dynamic).
- \`htop\`: Modern, colorful version of top.

## 2. Background & Foreground
- \`& \`: Run command in background (\`python script.py &\`).
- \`Ctrl + Z\`: Pause current job.
- \`bg\`: Move paused job to background.
- \`fg\`: Bring back to foreground.
- \`jobs\`: List your current terminal jobs.

## 3. Killing Processes
If a program is stuck, find its **PID** and send a signal.
- \`kill <pid>\`: Ask nicely (SIGTERM).
- \`kill -9 <pid>\`: Force kill (SIGKILL).
- \`pkill <name>\`: Kill by name.

## 4. Load Averages
Visible in \`top\`. If it's higher than the number of CPU cores, your system is overloaded.
`, resources: []
    },
    {
        title: "Package Management (apt & yum)",
        slug: "linux-package-mgmt",
        description: "Installing, updating, and removing software.",
        order: 9, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Package Management

Linux doesn't usually use \`.exe\` or \`.msi\` installers downloaded from the web. It uses **Repositories**.

## 1. Debian/Ubuntu (APT)
- \`sudo apt update\`: Refresh the list of software.
- \`sudo apt install <name>\`: Install.
- \`sudo apt upgrade\`: Update all installed software.
- \`sudo apt remove\`: Delete software.

## 2. Red Hat (Yum/DNF)
- \`sudo dnf install <name>\`.

## 3. Compiling from Source
If a package isn't in the repo:
1. \`./configure\`: Check dependencies.
2. \`make\`: Compile the code.
3. \`sudo make install\`: Copy binaries to \`/usr/bin\`.

## 4. Snap and Flatpak
Modern "Universal" package formats that contain all their own dependencies (Good for cross-distro compatibility).
`, resources: []
    },
    {
        title: "Networking Tools",
        slug: "linux-networking-tools",
        description: "IP, Ping, Netstat, and Troubleshooting connectivity.",
        order: 10, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Linux Networking

## 1. Interface Info
- \`ip addr\`: Show IPs of all network cards.
- \`ip link\`: Show physical connection status.

## 2. Troubleshooting
- \`ping <dest>\`: Check if a host is reachable.
- \`dig <domain>\`: Check DNS resolution.
- \`traceroute <dest>\`: See every "hop" (router) to the destination.
- \`curl <url>\`: Fetch a webpage/API from terminal.

## 3. Port Management
- \`ss -tuln\`: List all open ports and which apps are "Listening" on them.
- \`netstat\`: The older version of \`ss\`.

## 4. Hostname
- \`hostnamectl\`: See and change the computer's network name.
`, resources: []
    },
    {
        title: "SSH & Remote Access",
        slug: "linux-ssh",
        description: "Secure Shell, Key-based auth, and SCP.",
        order: 11, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# SSH & Remote Access

SSH is the industry standard for managing remote Linux servers.

## 1. Basic Connection
- \`ssh user@ip-address\`.

## 2. Key-Based Auth (No Passwords!)
Passwords are vulnerable to brute force. SSH keys are 100x safer.
1. \`ssh-keygen\`: Create a public/private pair on your PC.
2. \`ssh-copy-id user@remote\`: Send the public key to the server.
3. Now you can log in without a password.

## 3. Moving Files
- \`scp local-file user@remote:/path\`: Secure Copy.
- **rsync**: The professional way to sync folders (only copies changes).

## 4. SSH Config
Editing \`~/.ssh/config\` lets you create "Shortcuts" for servers.
`, resources: []
    },
    {
        title: "Systemd & Services",
        slug: "linux-systemd",
        description: "Managing background daemons and startup services.",
        order: 12, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Systemd & Services

Systemd is the first process that starts (\`PID 1\`) and manages all other services (Daemons).

## 1. Systemctl Commands
- \`systemctl start <service>\`: Start now.
- \`systemctl enable <service>\`: Start automatically on reboot.
- \`systemctl status <service>\`: Check if it's running.
- \`systemctl restart <service>\`.

## 2. Writing a Service File
To run your own Python script as a background service, you create a \`.service\` file in \`/etc/systemd/system/\`.

## 3. Targets (Runlevels)
- **multi-user.target**: Normal command-line mode.
- **graphical.target**: Desktop mode.
- **rescue.target**: Safe mode for fixing bugs.
`, resources: []
    },
    {
        title: "Storage & LVM",
        slug: "linux-storage-lvm",
        description: "Partitions, Mounts, and Logical Volume Management.",
        order: 13, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Linux Storage management

## 1. Partitions
- \`fdisk -l\`: List disks and partitions.
- \`df -h\`: Show "Disk Free" in human-readable format.

## 2. Mounting
In Linux, a new hard drive doesn't get \`D:\\\`. You "Mount" it to a folder.
- \`mount /dev/sdb1 /data\`: Now the folder \`/data\` points to the second drive.
- **/etc/fstab**: The file that remembers which drives to mount on startup.

## 3. LVM (Logical Volume Management)
Allows you to combine 3 small hard drives into one "Virtual" giant drive, and resize folders on the fly without rebooting.
- **PV**: Physical Volume (the real disks).
- **VG**: Volume Group (the pool).
- **LV**: Logical Volume (the virtual slices).
`, resources: []
    },
    {
        title: "Logs & Monitoring",
        slug: "linux-logs",
        description: "Searching through /var/log/ and journalctl.",
        order: 14, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Logs & Monitoring

When something goes wrong, the answer is always in the logs.

## 1. The Log Directory
- **/var/log/syslog**: General system messages.
- **/var/log/auth.log**: Security and login attempts.
- **/var/log/apache2/**: Web server logs.

## 2. Journalctl (Systemd logs)
- \`journalctl -u nginx\`: See logs for a specific service.
- \`journalctl -xe\`: See the very latest errors.
- \`journalctl -f\`: "Follow" logs in real-time.

## 3. Log Rotation
Old logs are compressed into \`.gz\` files to save space by a background tool called \`logrotate\`.
`, resources: []
    },
    {
        title: "Cron & Task Automation",
        slug: "linux-cron",
        description: "Scheduling scripts to run at specific times.",
        order: 15, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Cron: Task Automation

Cron is the time-based job scheduler.

## 1. Crontab Format
\`* * * * * /path/to/script.sh\`
The 5 stars represent:
1. Minute (0-59)
2. Hour (0-23)
3. Day of Month (1-31)
4. Month (1-12)
5. Day of Week (0-6)

## 2. Examples
- \`0 0 * * *\`: Every night at midnight.
- \`*/15 * * * *\`: Every 15 minutes.
- \`0 9 * * 1-5\`: 9 AM every weekday.

## 3. Crontab Commands
- \`crontab -e\`: Edit your jobs.
- \`crontab -l\`: List your jobs.

## 4. Anacron
For computers that aren't on 24/7 (like laptops). If a job was missed because the PC was off, Anacron runs it immediately on startup.
`, resources: []
    },
    {
        title: "Kernel & Modules",
        slug: "linux-kernel-modules",
        description: "Updating the kernel and managing drivers with lsmod.",
        order: 16, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# The Linux Kernel

The kernel is the "Engine" of the OS.

## 1. Monolithic with Modules
While the core is one big block, most drivers (WiFi, GPU) are **Modules** (.ko files) that can be loaded/unloaded without rebooting.

## 2. Commands
- \`uname -r\`: Show current kernel version.
- \`lsmod\`: List loaded modules.
- \`modprobe <name>\`: Load or unload a module safely.

## 3. The Bootloader (GRUB)
The menu that appears when you start your PC, letting you pick which kernel version to boot.

## 4. Kernel Panic
The Linux version of the "Blue Screen of Death". It happens if the kernel encounters an unrecoverable error (often bad RAM or a bad driver).
`, resources: []
    },
    {
        title: "Linux Security Essentials",
        slug: "linux-security",
        description: "Selinux, Firewalls (UFW), and SSH Hardening.",
        order: 17, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Linux Security

## 1. Firewalls
- **UFW (Uncomplicated Firewall)**: Simple interface for Ubuntu. \`ufw allow 80\`.
- **iptables / nftables**: The powerful, complex engine behind the firewall.

## 2. Mandatory Access Control (MAC)
Extra security layers that prevent even the Root user from doing certain things:
- **SELinux**: Used by RHEL/Fedora (Highly secure but complex).
- **AppArmor**: Used by Ubuntu/Debian (Simpler).

## 3. SSH Hardening
1. Disable Root login (\`PermitRootLogin no\`).
2. Disable Password auth (use keys only).
3. Change default port 22 to something else (stops automated bots).

## 4. Fail2Ban
A tool that monitors logs for failed passwords and automatically bans the attacker's IP address.
`, resources: []
    },
    {
        title: "Grep, Sed, and Awk",
        slug: "linux-text-processing",
        description: "The 'Swiss Army Knife' of text manipulation.",
        order: 18, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Text Processing Powerhouse

## 1. Grep (Search)
- \`grep "error" log.txt\`: Find lines.
- \`grep -r "TODO" .\`: Search all files in a folder.

## 2. Sed (The Stream Editor)
Used for search-and-replace in files.
- \`sed 's/old/new/g' file.txt\`: Change "old" to "new" everywhere.

## 3. Awk (Data Extraction)
Used for processing column-based data (CSVs, logs).
- \`awk '{print $1, $3}' data.txt\`: Print only the 1st and 3rd columns.
- \`awk '$3 > 100' data.txt\`: Only print lines where 3rd column is > 100.

## 4. Combining them
\`cat log.txt | grep "404" | awk '{print $1}' | sort | uniq -c\`
(Count how many unique IPs visited a 404 page).
`, resources: []
    },
    {
        title: "Troubleshooting & Recovery",
        slug: "linux-troubleshooting",
        description: "Fixing boot issues and identifying hardware failure.",
        order: 19, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Troubleshooting Linux

## 1. Identify the bottleneck
- **CPU**: \`top\`.
- **RAM**: \`free -m\`.
- **Disk IO**: \`iotop\`.
- **Network**: \`nload\`.

## 2. Checking Disk Health
- \`smartctl\`: Check the "Self-Monitoring" data of a hard drive to predict failure.

## 3. Rescue Mode
If the system won't boot:
1. Boot from a USB Live CD.
2. **chroot**: Switch into your broken system from the USB.
3. Reinstall GRUB or fix the broken config file.

## 4. Dmesg
Shows the kernel ring buffer. Extremely useful for debugging hardware that just got plugged in (or just failed).
`, resources: []
    },
    {
        title: "Containers (Docker) on Linux",
        slug: "linux-docker-basics",
        description: "How Namespaces and Cgroups make containers possible.",
        order: 20, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Containers & Linux

Containers like Docker aren't magic; they are just specialized Linux processes.

## 1. Namespaces (Isolation)
The "Walls" of the container. 
- **PID Namespace**: Container thinks it has PID 1.
- **NET Namespace**: Container has its own virtual network card.

## 2. Cgroups (Control Groups)
The "Limits". Effectively says "This container can only use 512MB RAM and 10% CPU".

## 3. Union File System (Layers)
Allows Docker to stack filesystems. If two containers use the same Base Ubuntu image, they share those files on disk, saving massive space.

## 4. Docker vs Virtual Machine
- **VM**: Hardware virtualization (Heavy).
- **Docker**: OS virtualization (Lightweight, shares the host kernel).
`, resources: []
    }
];
