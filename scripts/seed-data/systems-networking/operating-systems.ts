// Operating Systems Seed Data
export const operatingSystemsTopics = [
    {
        title: "Introduction to Operating Systems",
        slug: "os-introduction",
        description: "Core functions, kernel modes, and types of OS.",
        order: 1, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Introduction to Operating Systems

An Operating System (OS) is a software that acts as an interface between the user and the computer hardware.

## 1. Core Functions of an OS
- **Process Management**: CPU scheduling, creation, and deletion.
- **Memory Management**: Allocation/Deallocation and Virtual Memory.
- **Storage Management**: File organization and access.
- **Device Management**: I/O device drivers and buffering.
- **Security & Protection**: Controlling access to resources.
- **User Interface**: CLI, GUI, or API.

## 2. Kernel and User Modes
Modern CPUs have a **Mode Bit** to provide hardware-level protection.
- **Kernel Mode (0)**: Access to all machine instructions and memory.
- **User Mode (1)**: Limited access. Prevents programs from crashing the system.
- **System Call**: When a user program needs a kernel service, it switches to Kernel mode via a system call (e.g., \`read()\`, \`fork()\`).

## 3. Types of Operating Systems
- **Batch OS**: Jobs with similar needs are grouped and processed together.
- **Time-Sharing OS**: Multiple users can use the computer simultaneously (Multi-tasking).
- **Real-Time OS (RTOS)**: Used where timing is critical (e.g., Missile systems, Airbags).
- **Distributed OS**: Manages a collection of independent computers and makes them appear as one.

## 4. BIOS and Bootstrapping
- **BIOS**: Basic Input/Output System. First software that runs when you turn on the PC.
- **POST**: Power-On Self-Test.
- **Bootstrap Loader**: Small program that loads the OS kernel into memory.
`, resources: []
    },
    {
        title: "Process Management & States",
        slug: "process-management",
        description: "Process vs Program, PCB, and the process lifecycle.",
        order: 2, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Process Management

A **Process** is a program in execution. It is more than just code; it includes registers, stack, and data section.

## 1. Process vs Program
- **Program**: Passive entity (A file on disk).
- **Process**: Active entity (Code running in memory).

## 2. Process Control Block (PCB)
The "manifest" of a process. Contains:
- Process ID (PID).
- Program Counter.
- CPU Registers.
- Memory info.
- List of open files.

## 3. Process States
1. **New**: Being created.
2. **Ready**: Waiting to be assigned to a CPU.
3. **Running**: Instructions are being executed.
4. **Waiting**: Waiting for an event (I/O).
5. **Terminated**: Finished execution.

## 4. Context Switching
Storing the state of one process and loading the state of another. It's "overhead" because the CPU does no useful work during this time.

\`\`\`mermaid
stateDiagram-v2
    [*] --> New
    New --> Ready: Admitted
    Ready --> Running: Scheduler Dispatch
    Running --> Ready: Interrupt
    Running --> Waiting: I/O or Event Wait
    Waiting --> Ready: I/O or Event Completion
    Running --> Terminated: Exit
    Terminated --> [*]
\`\`\`
`, resources: []
    },
    {
        title: "CPU Scheduling Algorithms",
        slug: "cpu-scheduling",
        description: "FCFS, SJF, Priority, and Round Robin scheduling.",
        order: 3, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# CPU Scheduling

The process of deciding which process gets the CPU next to maximize efficiency.

## 1. Scheduling Criteria
- **CPU Utilization**: Keep the CPU as busy as possible.
- **Throughput**: Number of processes completed per unit time.
- **Turnaround Time**: Time from submission to completion.
- **Wait Time**: Time spent in the Ready Queue.
- **Response Time**: Time from submission to first response.

## 2. Common Algorithms
- **FCFS (First-Come, First-Served)**: Simple but leads to **Convoy Effect**.
- **SJF (Shortest Job First)**: Optimal in terms of average wait time. Can cause **Starvation** for long jobs.
- **SRTF**: Preemptive version of SJF.
- **Round Robin (RR)**: Each process gets a "Time Quantum". Fair and great for time-sharing.
- **Priority Scheduling**: Highest priority first. **Solution to Starvation**: Aging (gradually increasing priority of old jobs).

## 3. Gantt Chart Example
Suppose processes P1(24ms), P2(3ms), P3(3ms) arrive at time 0.
**FCFS**: [P1:0-24] [P2:24-27] [P3:27-30].
Avg Wait = $(0 + 24 + 27) / 3 = 17ms$.
`, resources: []
    },
    {
        title: "Process Synchronization",
        slug: "process-sync",
        description: "The Critical Section problem, Semaphores, and Mutex.",
        order: 4, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Process Synchronization

Ensuring that multiple processes don't interfere with each other when accessing shared data.

## 1. The Critical Section Problem
A segment of code where shared resources are accessed.
**Requirements for solution**:
1. **Mutual Exclusion**: Only one process at a time.
2. **Progress**: If no one is in it, whoever wants to enter should be able to.
3. **Bounded Waiting**: No one waits forever.

## 2. Race Condition
When the final outcome depends on the specific order of execution (e.g., two people updating a bank balance simultaneously).

## 3. Synchronization Tools
- **Mutex**: A simple lock (0 or 1).
- **Semaphores**: An integer variable accessed via \`wait()\` (P) and \`signal()\` (V).
    - **Binary Semaphore**: Like a mutex.
    - **Counting Semaphore**: To manage a pool of resources.

## 4. Classic Problems
- **Producer-Consumer**: Syncing a buffer.
- **Dining Philosophers**: Managing resources without deadlock.
- **Readers-Writers**: Allowing many readers but one writer.
`, resources: []
    },
    {
        title: "Deadlocks",
        slug: "os-deadlocks",
        description: "Necessary conditions, prevention, and Banker's algorithm.",
        order: 5, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Deadlocks

A situation where a set of processes are blocked because each is holding a resource and waiting for another held by someone else.

## 1. Four Necessary Conditions (Coffman Conditions)
1. **Mutual Exclusion**: Resources are non-sharable.
2. **Hold and Wait**: Holding one and waiting for another.
3. **No Preemption**: Resources can't be taken away by force.
4. **Circular Wait**: A chain of processes waiting in a circle.

## 2. Deadlock Handling
- **Prevention**: Ensuring at least one of the 4 conditions never happens.
- **Avoidance**: Using knowledge about future requests. **Banker's Algorithm** ensures the system stays in a "Safe State".
- **Detection & Recovery**: Let it happen, then kill processes or roll back.
- **Ignorance**: The Ostrich Algorithm (Pretend it doesn't exist). Used by MacOS and Windows for efficiency!

## 3. Banker's Algorithm Math
- **Max**: Max resources needed.
- **Allocation**: Currently held.
- **Need**: Max - Allocation.
- **Available**: What's left.
The system calculates if there's a sequence where everyone can finish.
`, resources: []
    },
    {
        title: "Memory Management: Paging",
        slug: "memory-paging",
        description: "Logical vs Physical addresses, Page tables, and TLB.",
        order: 6, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Memory Management

The OS must allocate RAM to processes and protect them from each other.

## 1. Logical vs Physical Address
- **Logical**: Generated by the CPU.
- **Physical**: Actual address in RAM.
- **MMU (Memory Management Unit)**: Hardware that translates logical to physical at runtime.

## 2. Paging
Dividing physical memory into fixed-size **Frames** and logical memory into **Pages**.
- **Page Table**: Maps pages to frames.
- **Benefit**: No external fragmentation.

## 3. Fragmentation
- **Internal**: Extra space inside a page/frame.
- **External**: Enough total free space, but not in one contiguous block (Solved by Paging).

## 4. TLB (Translation Lookaside Buffer)
A small, fast cache inside the CPU that store recent page table mappings to speed up translation.

\`\`\`mermaid
graph LR
    CPU[CPU: Page # | Offset] --> TLB{In TLB?}
    TLB -->|Yes| Frame[Frame # | Offset]
    Frame --> RAM[Physical RAM]
    TLB -->|No| PageTable[Page Table in RAM]
    PageTable --> Frame
\`\`\`
`, resources: []
    },
    {
        title: "Virtual Memory & Demand Paging",
        slug: "virtual-memory",
        description: "Running programs larger than RAM using disk swap space.",
        order: 7, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Virtual Memory

Allows execution of processes that are not completely in memory.

## 1. Demand Paging
Only bring a page into RAM when it's actually needed.

## 2. Page Fault
When a process accesses a page not in RAM:
1. Trap to OS.
2. OS finds the page on disk.
3. OS finds a free frame.
4. OS reads page from disk to frame.
5. Update Page Table.
6. Restart instruction.

## 3. Overlays vs Virtual Memory
- **Overlays**: Manual programmer logic.
- **Virtual Memory**: Automated by the OS.

## 4. Copy-on-Write (COW)
When using \`fork()\`, the parent and child share the same pages initially. Only if one modifies a page is a copy actually made. Very efficient!
`, resources: []
    },
    {
        title: "Page Replacement Algorithms",
        slug: "page-replacement",
        description: "FIFO, LRU, Optimal, and Belady's Anomaly.",
        order: 8, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Page Replacement

When RAM is full and a new page is needed, which old page should be evicted?

## 1. FIFO (First-In, First-Out)
- Simple but inefficient.
- **Belady's Anomaly**: For some page patterns, increasing the number of frames can actually INCREASE page faults!

## 2. Optimal Algorithm
Replace the page that will not be used for the longest time in the future.
- **Pros**: Impossible to beat.
- **Cons**: Impossible to implement (requires knowing the future).

## 3. LRU (Least Recently Used)
Replace the page that hasn't been used for the longest time.
- Implementation: Use a Stack or a Counter.
- **LRU Approximation**: Most OS use a "Reference Bit" or "Second Chance" algorithm because true LRU is too expensive.

## 4. Performance Measure
**EAT (Effective Access Time)**:
$EAT = (1-p) \times ma + p \times \text{Page Fault Time}$
(p = prob of fault, ma = memory access time).
`, resources: []
    },
    {
        title: "Thrashing & Working Set",
        slug: "os-thrashing",
        description: "What happens when the CPU spends all day swapping pages.",
        order: 9, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Thrashing

A state where the system spends more time swapping pages in/out than actually executing instructions.

## 1. Why it happens
If a process's "Working Set" (active pages) doesn't fit in its allocated frames, it will fault constantly.

## 2. The Solution
- **Global Replacement**: Causes one process to steal from others, spreading the thrashing.
- **Local Replacement**: Contains thrashing within one process.
- **Working Set Model**: The OS tracks which pages a process is using frequently and ensures they stay in RAM.
- **L-CPU Utilization**: If CPU usage drops while Disk usage is 100%, the OS knows thrashing is happening and might kill a process to free frames.

\`\`\`mermaid
graph LR
    P[Process Count Increases] --> C[CPU Utilization Increases]
    C --> Peak[Max Efficiency]
    Peak --> T[Thrashing Starts]
    T --> D[CPU Utilization Drops to 0]
\`\`\`
`, resources: []
    },
    {
        title: "File Systems & Directories",
        slug: "file-systems",
        description: "Naming, structures, and access methods (NTFS, FAT32, ext4).",
        order: 10, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# File Systems

The OS provides a logical view of information as "Files" and "Directories" on top of raw disk blocks.

## 1. File Attributes
Name, Type, Size, Location, Permissions (Read/Write/Exec), Timestamps.

## 2. Access Methods
- **Sequential**: Read in order (Tape drives).
- **Direct (Random)**: Go directly to any block (Platters/SSDs).

## 3. Directory Structures
- **Single-Level**: All files in one folder (Messy).
- **Two-Level**: Folder per user.
- **Tree-Structured**: Nested folders (Modern standard).

## 4. Famous File Systems
- **FAT32**: Simple, compatible, but limited file size (4GB).
- **NTFS**: Windows standard. Supports encryption, compression, and large files.
- **ext4**: Linux standard. High performance and journaling.
- **APFS**: Apple standard optimized for SSDs.
`, resources: []
    },
    {
        title: "Disk Allocation Methods",
        slug: "disk-allocation",
        description: "Contiguous, Linked, and Indexed allocation (Inodes).",
        order: 11, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Disk Allocation

How the OS maps files to blocks on the disk.

## 1. Contiguous Allocation
Storing a file in consecutive blocks.
- **Pro**: Very fast (minimal head movement).
- **Con**: **External Fragmentation**. Hard to grow a file.

## 2. Linked Allocation
Each block has a pointer to the next block.
- **Pro**: No fragmentation.
- **Con**: Slow random access (must traverse the chain). If one pointer breaks, data is lost.

## 3. Indexed Allocation
Each file has an **Index Block** (Inode) containing pointers to all its data blocks.
- **Pro**: Fast random access and no fragmentation.
- **Con**: Overhead of storing index blocks.
- **Linux Inodes**: Uses a multi-level index (Direct blocks, Indirect, Double Indirect) to support massive files.
`, resources: []
    },
    {
        title: "Disk Scheduling",
        slug: "disk-scheduling",
        description: "Moving the read/write head efficiently: FCFS, SSTF, SCAN.",
        order: 12, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Disk Scheduling

Objective: Minimize **Seek Time** (time to move the head to the right cylinder).

## 1. Common Algorithms
- **FCFS**: Fair, but very slow if requests are scattered.
- **SSTF (Shortest Seek Time First)**: Choose the closest request. Can cause **Starvation** for far-away requests.
- **SCAN (Elevator)**: Head moves from one end to the other, serving requests along the way.
- **C-SCAN**: Like SCAN but only serves in one direction, returning to start instantly.
- **LOOK**: Like SCAN but stops at the last request instead of the very edge.

## 2. Modern Context
Disk scheduling is critical for HDDs (Mechanical). For **SSDs**, it's irrelevant because seek time is effectively zero.
`, resources: []
    },
    {
        title: "I/O Management & Buffering",
        slug: "io-management",
        description: "Interrupts, Pooling, DMA, and the I/O software stack.",
        order: 13, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# I/O Management

## 1. Buffering
Temporarily storing data in RAM while it's transferred between devices of different speeds.
- **Single Buffer**: CPU waits for I/O to finish.
- **Double Buffer**: While CPU processes one buffer, I/O fills the next.

## 2. Spooling (Simultaneous Peripheral Ops Online)
Used for slow devices like Printers. Documents go to a disk queue first, allowing the computer to move on while the printer works at its own pace.

## 3. Polling vs Interrupts
- **Polling**: CPU checks the device repeatedly (Wasteful).
- **Interrupt**: Device tells the CPU when it's ready (Efficient).

## 4. Character vs Block Devices
- **Character**: Streams of bytes (Keyboard, Mouse).
- **Block**: Structured data in chunks (Disk, Tape).
`, resources: []
    },
    {
        title: "Inter-Process Communication (IPC)",
        slug: "os-ipc",
        description: "Pipes, Messge Queues, and Shared Memory.",
        order: 14, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Inter-Process Communication (IPC)

Systems where processes communicate and synchronize actions.

## 1. Shared Memory
A specific block of RAM is made accessible to two or more processes.
- **Pros**: Fastest method.
- **Cons**: Requires careful synchronization (Mutex/Semaphores).

## 2. Message Passing
Processes send packets of data to each other.
- **Direct**: Send(P, message).
- **Indirect**: Via a Mailbox or Message Queue.
- **Pros**: Easier to implement on distributed systems.

## 3. Pipes and Sockets
- **Pipes**: Unidirectional communication (e.g., \`ls | grep \`).
- **Sockets**: Communication over a network between processes on different machines.
`, resources: []
    },
    {
        title: "Protection & Security",
        slug: "os-security",
        description: "Access control lists, domains, and capabilities.",
        order: 15, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Protection and Security

- **Protection**: Internal mechanism to control access to resources.
- **Security**: Defense against external attacks (Viruses, Hackers).

## 1. Principle of Least Privilege
A program/user should only have the minimum permissions needed to do its job.

## 2. Access Matrix
A table where Rows=Users and Columns=Resources (File, CPU, Printer).
- **ACL (Access Control List)**: Storing the matrix by Column (Who can access *this* file?).
- **Capability List**: Storing the matrix by Row (What can *this* user access?).

## 3. User Authentication
Passwords, Biometrics (Fingerprint), Tokens (2FA).

## 4. Threats
- **Trojan Horse**: Hidden malicious code in a good program.
- **Trap Door**: Secret entry point for developers.
- **Worm**: Self-replicating malware.
`, resources: []
    },
    {
        title: "Virtualization & Containers",
        slug: "os-virtualization",
        description: "Hypervisors, VMs vs Docker, and Cloud foundations.",
        order: 16, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Virtualization

Running multiple OS instances on a single physical machine.

## 1. Hypervisors
The software that manages virtual machines.
- **Type 1 (Bare Metal)**: Runs directly on hardware (e.g., VMware ESXi, Xen).
- **Type 2 (Hosted)**: Runs on top of another OS (e.g., VirtualBox, VMware Player).

## 2. VM vs Container
- **VMs**: Virtualize the hardware. Each has its own kernel (Heavy).
- **Containers (Docker)**: Virtualize the OS. They share the host kernel (Light, fast).

## 3. Virtualization Pros
- **Isolation**: If one VM crashes, others are safe.
- **Consolidation**: Save money by putting 10 small servers on 1 big physical host.
- **Snapshotting**: "Freeze" a system and revert back if something breaks.

\`\`\`mermaid
graph TD
    subgraph Container
        A[App 1]
        B[Bins/Libs]
    end
    subgraph VM
        C[App 1]
        D[Bins/Libs]
        E[Guest OS]
    end
    Engine[Docker Engine] --- Host[Host OS]
    Hypervisor --- Host
\`\`\`
`, resources: []
    },
    {
        title: "Real-Time Operating Systems (RTOS)",
        slug: "os-rtos",
        description: "Hard vs Soft real-time and scheduling for predictability.",
        order: 17, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Real-Time Operating Systems (RTOS)

Used for systems where the **Correctness** depends not just on the logic, but on the **Time** at which the result is produced.

## 1. Hard vs Soft Real-Time
- **Hard**: Failure to meet a deadline is a system failure (e.g., Car brakes, Flight control).
- **Soft**: Meeting deadlines is preferred, but missing them is acceptable (e.g., Video streaming).

## 2. Key Characteristic: Predictability
Standard OS (Windows/Linux) are designed for **Fairness**. RTOS are designed for **Predictability** (Deterministic behavior).

## 3. RTOS Scheduling
- **Preemptive Priority**: The highest priority task ALWAYS runs immediately.
- **Rate Monotonic**: Priority based on how often a task repeats (Higher freq = Higher priority).

## 4. Famous Examples
- **FreeRTOS**: Open source, popular for Arduino/ESP32.
- **QNX**: Used in car dashboards.
- **VxWorks**: Used on the Mars Rovers.
`, resources: []
    },
    {
        title: "Threads & Multi-threading",
        slug: "os-threads",
        description: "User vs Kernel threads, models, and thread safety.",
        order: 18, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Threads

A thread is a "Lightweight Process". Multiple threads in one process share the code, data, and resources, but have their own registers and stack.

## 1. Why Threads?
- **Responsiveness**: A web browser can load images in one thread while you scroll in another.
- **Resource Sharing**: Faster communication than IPC.
- **Economy**: Creating a thread is much cheaper than a process.

## 2. Thread Models
- **Many-to-One**: Many user threads mapped to one kernel thread (No multi-core benefit).
- **One-to-One**: Every user thread gets a kernel thread (True parallel, but overhead).
- **Many-to-Many**: Middle ground.

## 3. Parallelism vs Concurrency
- **Concurrency**: Handling many tasks at once (Swapping between them).
- **Parallelism**: Doing many tasks at once (Truly on different cores).

## 4. Thread Safety
Writing code that works correctly when multiple threads access it simultaneously. Uses Mutexes and Atomic operations.
`, resources: []
    },
    {
        title: "Linux & Unix Internals",
        slug: "linux-internals",
        description: "Everything is a file, Shells, and the Monolithic kernel.",
        order: 19, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Linux & Unix Internals

## 1. Philosophy
- "Everything is a file" (Hard drives, keyboards, and processes are accessed via file descriptors).
- Small, single-purpose tools that can be chained together.

## 2. The Monolithic Kernel
Linux is a monolithic kernel, meaning all OS services (scheduling, drivers, filesystem) run in the same kernel space for maximum speed.
- Contrast: **Microkernel** (e.g., Minix, L4) where only essentials are in kernel space.

## 3. The Shell
The interface to the kernel.
- **Bash**: Standard on Linux.
- **Zsh**: Popular for customization.

## 4. Load Averages
The average number of processes in the "Ready" and "Uninterruptible" states.
- 1.0 on a 1-core machine means the CPU is at 100% capacity.
`, resources: []
    },
    {
        title: "Modern Trends: Mobile & Cloud OS",
        slug: "modern-os-trends",
        description: "Android, iOS, and distributed cloud orchestrators.",
        order: 20, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Modern OS Trends

## 1. Mobile OS (Android/iOS)
Optimized for **Power Management** and **Touch Interaction**.
- **Android**: Based on the Linux kernel. Uses "Sandbox" for app security.
- **iOS**: Based on Darwin (BSD/Unix). Very strict app permissions.

## 2. Cloud Operating Systems
Is **Kubernetes** an OS? It manages compute, storage, and networking across a cluster of servers, much like an OS manages a single PC.

## 3. Serverless Computing
The ultimate abstraction. The user writes code (Lambda functions), and the "Cloud OS" handles scaling, provisioning, and networking automatically.

## 4. Future: Neuromorphic & Quantum
As hardware changes from binary CPUs to Neural or Quantum chips, OS architecture will need to fundamentally re-invent scheduling and memory.
`, resources: []
    }
];
