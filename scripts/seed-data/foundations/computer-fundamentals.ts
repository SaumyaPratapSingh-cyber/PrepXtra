// Computer Fundamentals Seed Data
export const computerFundamentalsTopics = [
    {
        title: "Number Systems",
        slug: "number-systems",
        description: "Binary, octal, decimal, hexadecimal conversions and computer arithmetic.",
        order: 1, estimatedMinutes: 55, difficulty: "Easy",
        content: `
# Number Systems

In computer science, number systems are used to represent information in a digital format.

## Common Number Systems

| System | Base | Digits | Use Case |
|--------|------|--------|----------|
| Binary | 2 | 0, 1 | Machine level storage |
| Octal | 8 | 0-7 | Shorthand for binary |
| Decimal| 10 | 0-9 | Human understandable |
| Hex    | 16 | 0-9, A-F | Memory addresses, Colors |

## Conversions

### Decimal to Any Base
Divide the number by the base and keep track of the remainders (bottom-up).

**Example: 25 to Binary**
- 25 / 2 = 12 rem 1
- 12 / 2 = 6 rem 0
- 6 / 2 = 3 rem 0
- 3 / 2 = 1 rem 1
- 1 / 2 = 0 rem 1
- Result: **11001**

### Any Base to Decimal
Multiply each digit by $Base^{position}$ and sum them up.

**Example: 11001₂ to Decimal**
$(1 \times 2^4) + (1 \times 2^3) + (0 \times 2^2) + (0 \times 2^1) + (1 \times 2^0) = 16 + 8 + 0 + 0 + 1 = 25$

## Binary Arithmetic
- **Addition**: $0+0=0, 0+1=1, 1+0=1, 1+1=10$ (0 carry 1)
- **1's Complement**: Invert all bits (0→1, 1→0)
- **2's Complement**: 1's Complement + 1 (Used for signed integers)

### Signed Numbers
- **Sign-Magnitude**: MSB is 0 for +ve, 1 for -ve.
- **2's Complement Representation**: Modern standard. $-(2^{n-1})$ to $+(2^{n-1}-1)$.
`, resources: []
    },
    {
        title: "Data Representation",
        slug: "data-representation",
        description: "How text, images, and audio are represented in binary.",
        order: 2, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Data Representation

Everything in a computer is a sequence of bits (0s and 1s).

## Text Representation
- **ASCII**: 7-bit code (128 characters). 'A' = 65.
- **Extended ASCII**: 8-bit (256 characters).
- **Unicode (UTF-8)**: Variable length (1-4 bytes). Supports all global languages and emojis.

## Image Representation
- **Raster (Bitmap)**: Grid of pixels. Each pixel has a color value (RGB).
- **Vector**: Mathematical formulas for lines and curves. Scalable without quality loss.
- **Metadata**: Data about data (resolution, GPS, camera settings).

## Audio Representation
- **Sampling**: Capturing the amplitude of a sound wave at regular intervals.
- **Bit Depth**: Number of bits per sample (e.g., 16-bit, 24-bit).
- **Sample Rate**: Samples per second (e.g., 44.1 kHz for CD quality).

## Data Compression
- **Lossless**: No data lost (ZIP, PNG, FLAC).
- **Lossy**: Discards less important data for smaller size (JPEG, MP3, MP4).

## Fixed-Point vs Floating-Point
- **Fixed-Point**: Decimal fixed at a specific position.
- **Floating-Point (IEEE 754)**: $\text{Sign} \times \text{Mantissa} \times 2^{\text{Exponent}}$. Used for very large or small numbers.
`, resources: []
    },
    {
        title: "Boolean Algebra",
        slug: "boolean-algebra",
        description: "Logic gates, truth tables, and simplifying boolean expressions.",
        order: 3, estimatedMinutes: 60, difficulty: "Easy",
        content: `
# Boolean Algebra

Boolean algebra deals with binary variables and logic operations.

## Basic Operations

| Operation | Symbol | Expression | Rule |
|-----------|--------|------------|------|
| AND | $\cdot$ | $A \cdot B$ | 1 only if BOTH are 1 |
| OR | $+$ | $A + B$ | 1 if AT LEAST one is 1 |
| NOT | $'$ or $\overline{A}$ | $\overline{A}$ | Inverts the value |

## Laws of Boolean Algebra
- **Identity**: $A \cdot 1 = A, A + 0 = A$
- **Null**: $A \cdot 0 = 0, A + 1 = 1$
- **Idempotent**: $A \cdot A = A, A + A = A$
- **Complement**: $A \cdot \overline{A} = 0, A + \overline{A} = 1$
- **De Morgan's Laws**:
    - $\overline{A \cdot B} = \overline{A} + \overline{B}$
    - $\overline{A + B} = \overline{A} \cdot \overline{B}$

## Truth Tables
| A | B | AND | OR | XOR |
|---|---|-----|----|-----|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 |

## Logic Minimization
Used to reduce the number of gates in a circuit. 
- **Karnaugh Maps (K-Map)**: Visual method for simplification.
- **Quine-McCluskey**: Tabular method for many variables.
`, resources: []
    },
    {
        title: "Digital Logic Design",
        slug: "digital-logic-design",
        description: "Combinational and sequential circuits, latches, and flip-flops.",
        order: 4, estimatedMinutes: 70, difficulty: "Medium",
        content: `
# Digital Logic Design

## Combinational Circuits
Output depends ONLY on current inputs.
- **Adder**: Half Adder (2 bits), Full Adder (3 bits).
- **Multiplexer (MUX)**: Selects one of N inputs.
- **Decoder**: $n$ inputs to $2^n$ outputs.
- **Comparator**: Compares two binary numbers.

## Sequential Circuits
Output depends on current inputs AND previous state (has memory).
- **Flip-Flops**: Basic building blocks of memory. 
    - **SR (Set-Reset)**
    - **D (Data)**: Stores 1 bit on clock edge.
    - **JK**: Universal flip-flop.
- **Registers**: Group of flip-flops to store multiple bits.
- **Counters**: Circuits that count in binary.

## Clocks and Timing
- **Clock**: Periodic signal to synchronize sequential circuits.
- **Setup Time**: Minimum time input must be stable BEFORE clock edge.
- **Hold Time**: Minimum time input must be stable AFTER clock edge.

\`\`\`mermaid
graph LR
    Input --> Logic[Combinational Logic]
    Logic --> Output
    Logic --> State[Memory/Flip-Flops]
    State --> Logic
    Clock --> State
\`\`\`
`, resources: []
    },
    {
        title: "Computer Architecture Basics",
        slug: "computer-architecture-basics",
        description: "Von Neumann architecture, CPU, and system organization.",
        order: 5, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Computer Architecture Basics

## Von Neumann Architecture
The foundation of modern computers.
1. **Central Processing Unit (CPU)**
2. **Main Memory (RAM)**
3. **I/O System**
4. **Buses** (Data, Address, Control)

### Key Feature: Stored Program Concept
Data and instructions are stored in the same memory space.

## CPU Components
- **ALU (Arithmetic Logic Unit)**: Calculations and logic.
- **Control Unit (CU)**: Decodes instructions and manages flow.
- **Registers**: Ultra-fast internal storage.

## The Bottleneck
**Von Neumann Bottleneck**: The throughput (speed) between CPU and memory is much slower than CPU speed, limiting performance.

## Harvard Architecture
Unlike Von Neumann, it uses SEPARATE memory for instructions and data. Common in microcontrollers (DSP).

## System Performance
- **Clock Speed**: Cycles per second (GHz).
- **MIPS**: Million Instructions Per Second.
- **CPI**: Cycles Per Instruction.
`, resources: []
    },
    {
        title: "Instruction Set Architecture",
        slug: "instruction-set-architecture",
        description: "CISC vs RISC, addressing modes, and machine instructions.",
        order: 6, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Instruction Set Architecture (ISA)

ISA is the abstract model of a computer that defines what it can do and how it's programmed.

## CISC vs RISC

| Feature | CISC (Intel x86) | RISC (ARM, Apple M1) |
|---------|------------------|----------------------|
| Instructions | Complex, many types | Simple, fixed length |
| Registers | Fewer | More |
| Cycle | Variable (multicycle) | Single-cycle (mostly) |
| Philosophy | Hardware focus | Software/Compiler focus |

## Addressing Modes
How the CPU finds data (operands).
- **Immediate**: \`ADD R1, #5\` (Value is in instruction)
- **Direct**: \`LOAD R1, 1000\` (Address is in instruction)
- **Indirect**: \`LOAD R1, (R2)\` (Address is in a register)
- **Indexed**: \`LOAD R1, 100(R2)\` (Base + offset)

## Instruction Pipeline
Overlapping execution of multiple instructions.
1. **Fetch**
2. **Decode**
3. **Excecute**
4. **Memory Access**
5. **Write Back**

### Pipeline Hazards
- **Structural**: Hardware conflict.
- **Data**: Dependency on previous result.
- **Control**: Branching breaks the flow.
`, resources: []
    },
    {
        title: "Cache Memory",
        slug: "cache-memory",
        description: "Levels of cache, mapping, and locality of reference.",
        order: 7, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Cache Memory

Cache is a small, fast memory that sits between the CPU and RAM to speed up access.

## Locality of Reference
- **Temporal Locality**: If an item is used, it's likely to be used again soon.
- **Spatial Locality**: If an item is used, nearby items are likely to be used soon.

## Cache Levels
- **L1**: Smallest, fastest, inside CPU core.
- **L2**: Larger, slightly slower.
- **L3**: Shared across all cores of a CPU.

## Cache Mapping
1. **Direct Mapping**: Each RAM block maps to one specific cache line.
2. **Fully Associative**: Any RAM block can go to any cache line.
3. **Set Associative**: Trade-off between the two.

## Cache Hits and Misses
- **Hit**: Data found in cache.
- **Miss**: Data not in cache, must fetch from RAM (Penalty).
- **Hit Ratio**: $\text{Hits} / (\text{Hits} + \text{Misses})$.

## Write Policies
- **Write-Through**: Write to cache and RAM simultaneously.
- **Write-Back**: Write to cache only; update RAM when line is evicted.
`, resources: []
    },
    {
        title: "I/O Organization",
        slug: "io-organization",
        description: "How CPU communicates with external devices.",
        order: 8, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# I/O Organization

Methods computers use to transfer data between the CPU/Memory and external devices.

## I/O Techniques

### 1. Programmed I/O
CPU constantly checks device status (Polling). Wastes CPU cycles.

### 2. Interrupt-Driven I/O
Device alerts CPU only when ready. More efficient.
- **ISR (Interrupt Service Routine)**: Code that handles the interrupt.

### 3. DMA (Direct Memory Access)
Special controller transfers data directly between device and RAM without involving the CPU.
- **Cycle Stealing**: DMA "steals" a bus cycle from CPU to transfer data.

## I/O Mapping
- **Memory-Mapped I/O**: Device registers occupy standard memory addresses.
- **Isolated I/O**: Devices have their own address space using special instructions (\`IN\`, \`OUT\`).

## Buses
- **Data Bus**: Carries actual data bits.
- **Address Bus**: Specifies where data should go.
- **Control Bus**: Carries signals like Read/Write/Clock.
`, resources: []
    },
    {
        title: "Operating Systems Basics",
        slug: "os-basics",
        description: "The role of the OS, kernels, and basic functions.",
        order: 9, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Operating Systems Basics

An Operating System (OS) is software that manages computer hardware and provides services for programs.

## Purpose of an OS
- **Manager**: Controls hardware (CPU, Memory, Disk).
- **Interface**: Provides UI (GUI/CLI) and API for apps.
- **Security**: Protects users and files.

## The Kernel
The core part of the OS that remains in memory and controls everything.
- **Monolithic Kernel**: All services (drivers, FS) in one big space.
- **Microkernel**: Minimal kernel; services run as user processes.

## Main Functions
1. **Process Management**: Starting, stopping, and scheduling programs.
2. **Memory Management**: Allocating RAM and Virtual Memory.
3. **File System**: Organizing data into files and folders.
4. **Device Management**: Communicating via drivers.

## Popular OS Types
- **Desktop**: Windows, macOS, Linux.
- **Mobile**: Android, iOS.
- **Server**: Linux, Windows Server.
- **Embedded**: Real-time OS (RTOS) in cars or appliances.
`, resources: []
    },
    {
        title: "System vs Application Software",
        slug: "system-vs-application-software",
        description: "Differentiating core software from end-user programs.",
        order: 10, estimatedMinutes: 30, difficulty: "Easy",
        content: `
# System vs Application Software

Software is broadly categorized into two types:

## 1. System Software
The "middleman" that enables hardware to work and creates a platform for applications.
- **Operating Systems**: Windows, Linux.
- **Device Drivers**: Software that controls a printer or GPU.
- **Utilities**: Disk formatting, antivirus, backup tools.
- **Compilers/Interpreters**: Translate code to machine language.

## 2. Application Software
Programs used by the end-user to perform specific tasks.
- **Productivity**: Microsoft Word, Excel.
- **Creative**: Photoshop, Premiere Pro.
- **Communication**: Chrome, Zoom, WhatsApp.
- **Entertainment**: Steam, VLC, Netflix.

## Comparison Table

| Feature | System Software | Application Software |
|---------|-----------------|----------------------|
| Role | Manages Resources | Performs Specific Tasks |
| Interaction | Background (Indirect) | Foreground (Direct) |
| Dependency | Can run on its own | Requires OS to run |
| Complexity | Highly complex | Varies |

\`\`\`mermaid
graph TD
    User((User)) --> Apps[Applications: Apps, Games]
    Apps --> OS[System: OS, Drivers]
    OS --> HW[Hardware: CPU, RAM]
\`\`\`
`, resources: []
    },
    {
        title: "Memory Units & Hierarchy",
        slug: "memory-units-hierarchy",
        description: "Bits, Bytes, and the pyramid of storage speed vs cost.",
        order: 11, estimatedMinutes: 40, difficulty: "Easy",
        content: `
# Memory Units & Hierarchy

## Basic Units
- **Bit**: Smallest unit (0 or 1).
- **Nibble**: 4 bits.
- **Byte**: 8 bits (Base unit).
- **Kilobyte (KB)**: 1024 bytes.
- **Megabyte (MB)**: 1024 KB.
- **Gigabyte (GB)**: 1024 MB.
- **Terabyte (TB)**: 1024 GB.

## Memory Hierarchy
Computers use different types of storage to balance speed and cost.

\`\`\`mermaid
graph BT
    Secondary[Secondary: HDD, SSD, Tape] ---|Capacity Increases| Main[Main: RAM]
    Main --- Cache[Cache Memory]
    Cache ---|Speed Increases| Regs[CPU Registers]
\`\`\`

## Comparison

| Type | Speed | Cost/GB | Size | Volatile? |
|------|-------|---------|------|-----------|
| Registers | Fastest | Extreme | Bytes | Yes |
| Cache | Very Fast| High | MBs | Yes |
| RAM | Fast | Moderate| GBs | Yes |
| SSD | Medium | Low | TBs | No |
| HDD | Slow | Very Low| TBs | No |

**Volatile Memory**: Data is lost when power is turned off (RAM).
**Non-Volatile Memory**: Data is kept without power (HDD/SSD).
`, resources: []
    },
    {
        title: "CPU Execution Cycle",
        slug: "cpu-execution-cycle",
        description: "The Fetch-Decode-Execute cycle in detail.",
        order: 12, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# CPU Execution Cycle

Also known as the **Instruction Cycle** or **Machine Cycle**. This is the process a CPU follows for every single instruction.

## 1. Fetch
The Control Unit fetches the instruction from RAM using the address in the **Program Counter (PC)**. The instruction is stored in the **Instruction Register (IR)**.

## 2. Decode
The Control Unit interprets the binary code in the IR to determine what operation to perform (e.g., Load, Add, Store).

## 3. Execute
The **ALU** performs the arithmetic or logic operation required.

## 4. Store (Write-back)
The result of the execution is written back to a register or memory location.

## Registers Involved
- **PC (Program Counter)**: Holds address of NEXT instruction.
- **MAR (Memory Address Register)**: Holds address of CURRENT instruction/data.
- **MDR (Memory Data Register)**: Holds the actual data/instruction being moved.
- **ACC (Accumulator)**: Stores results of ALU calculations.

### Simple Visualization
\`\`\`
PC -> MAR -> RAM -> MDR -> IR -> CU -> ALU -> ACC
\`\`\`

## Throughput
Modern CPUs use **Pipelining** to perform these steps for multiple instructions at once, greatly increasing efficiency.
`, resources: []
    },
    {
        title: "Bus Systems",
        slug: "bus-systems",
        description: "Data, Address, and Control buses.",
        order: 13, estimatedMinutes: 35, difficulty: "Easy",
        content: `
# Bus Systems

A **System Bus** is a set of parallel wires used to connect components (CPU, Memory, I/O).

## 1. Data Bus
Carries the actual information. It is **bidirectional** (data can go to and from the CPU).
- **Width**: Number of wires (e.g., 64-bit bus can carry 64 bits at once).

## 2. Address Bus
Specifies the memory address being accessed. It is **unidirectional** (CPU specifies address to memory).
- **Width**: Determines maximum RAM a CPU can address (e.g., 32-bit = 4GB).

## 3. Control Bus
Carries control signals to synchronize components.
- **Signals**: Read/Write, Interrupts, Clock pulses, Reset.

## System Interconnect
\`\`\`mermaid
graph LR
    CPU --- DataBus
    CPU --- AddrBus
    CPU --- CtrlBus
    DataBus --- RAM
    AddrBus --- RAM
    CtrlBus --- RAM
    DataBus --- IO[I/O Devices]
    AddrBus --- IO
    CtrlBus --- IO
\`\`\`

## Internal vs External Bus
- **Internal**: Inside the CPU (fastest).
- **Expansion (External)**: Connects to peripherals (USB, PCIe, SATA).
`, resources: []
    },
    {
        title: "Secondary Storage Devices",
        slug: "secondary-storage",
        description: "HDDs, SSDs, Optical, and Magnetic storage.",
        order: 14, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Secondary Storage Devices

Non-volatile storage used to keep data permanently.

## 1. HDD (Hard Disk Drive)
Uses magnetic spinning platters and a moving head.
- **Pros**: Cheap, high capacity.
- **Cons**: Slow, mechanical (can fail if dropped), noisy.

## 2. SSD (Solid State Drive)
Uses Flash Memory (no moving parts).
- **Pros**: Extremely fast, silent, durable.
- **Cons**: More expensive per GB than HDDs.

## 3. Optical Storage
Uses lasers to read/write data on pits.
- **Types**: CD (700MB), DVD (4.7GB), Blu-ray (25-50GB).
- **Use**: Distribution of movies/games (fading out).

## 4. Flash Storage
Portable storage using silicon chips.
- **USB Sticks**: Small, portable.
- **SD Cards**: Used in cameras and phones.

## RAID (Redundant Array of Independent Disks)
Combining multiple disks for safety or speed.
- **RAID 0**: Striping (Fastest, no safety).
- **RAID 1**: Mirroring (Data is copied, safe).
- **RAID 5**: Striping + Parity (Balance of speed and safety).
`, resources: []
    },
    {
        title: "Virtual Memory & Paging",
        slug: "virtual-memory-paging",
        description: "How computers use disk space as 'extended' RAM.",
        order: 15, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Virtual Memory & Paging

Virtual Memory allows a computer to run larger programs than its physical RAM.

## How it works
The OS moves unused parts of a program from RAM to the hard drive (Swap/Page File) to free up space.

## Paging
A memory management scheme where the OS divides memory into fixed-size blocks called **Pages**.
- **Page Table**: A map that translates Virtual Addresses to Physical addresses in RAM.

## Terminology
- **Page Fault**: When the CPU needs data NOT in RAM. The OS must fetch it from the disk.
- **Thrashing**: When a computer spends more time moving data between RAM and disk than actually running programs. (Feels very slow).

## Benefits
- Run more apps simultaneously.
- Protection: One app cannot access another app's memory space.
- Simplified memory allocation for programmers.

## Drawbacks
- Disk access is $1000 \times$ slower than RAM. Excess virtual memory usage drops performance.
`, resources: []
    },
    {
        title: "I/O Devices & Ports",
        slug: "io-devices-ports",
        description: "Input, output, and connectivity standards.",
        order: 16, estimatedMinutes: 40, difficulty: "Easy",
        content: `
# I/O Devices & Ports

## Input Devices
Collect data from the user/environment.
- **Keyboard/Mouse**: Standard.
- **Scanners/Cameras**: Visual.
- **Microphones**: Audio.
- **Sensors**: IoT, temperature, touch.

## Output Devices
Present data to the user.
- **Monitors**: LCD, OLED, 4K.
- **Printers**: Inkjet, Laser, 3D.
- **Speakers**: Audio output.

## Connectivity Ports
- **USB (Universal Serial Bus)**: Standard for almost everything.
    - **USB-C**: Fast, reversible, supports video/charging.
- **HDMI/DisplayPort**: Video and Audio to monitors.
- **Ethernet (RJ45)**: Wired networking.
- **Thunderbolt**: Extremely high speed (External GPUs, Storage).

## Wireless Connectivity
- **Wi-Fi**: Local area networking.
- **Bluetooth**: Short-range device pairing.
- **NFC**: Touch-based communication (Payments).
`, resources: []
    },
    {
        title: "Cloud Computing Fundamentals",
        slug: "cloud-computing-fundamentals",
        description: "IaaS, PaaS, SaaS, and public/private clouds.",
        order: 17, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Cloud Computing Fundamentals

The delivery of computing services—including servers, storage, databases, networking, software—over the Internet.

## Service Models (The SPI Model)

### 1. IaaS (Infrastructure as a Service)
You rent virtual hardware. You manage the OS and apps.
- **Example**: AWS EC2, Azure VMs, Google Compute Engine.

### 2. PaaS (Platform as a Service)
A platform for developers. You manage ONLY your code.
- **Example**: Heroku, Google App Engine, Firebase.

### 3. SaaS (Software as a Service)
Ready-to-use software over a browser.
- **Example**: Gmail, Slack, Salesforce, Microsoft 365.

## Deployment Models
- **Public Cloud**: Shared infrastructure over the internet (AWS).
- **Private Cloud**: Dedicated to one organization (High Security).
- **Hybrid Cloud**: Mix of both, data moves between them.

## Cloud Benefits
- **Elasticity**: Scale up/down as needed.
- **Pay-as-you-go**: No upfront hardware costs.
- **Global Reach**: Deploy apps near your users worldwide.
`, resources: []
    },
    {
        title: "Edge & Fog Computing",
        slug: "edge-fog-computing",
        description: "Processing data near the source vs the cloud.",
        order: 18, estimatedMinutes: 45, difficulty: "Medium",
        content: `
# Edge & Fog Computing

As IoT devices grow, sending all data to a central cloud server becomes slow and expensive.

## Edge Computing
Processing data **at the source** (e.g., on the camera itself or the factory machine).
- **Why?**: Immediate response (Low Latency), reduced bandwidth.
- **Example**: Self-driving cars must process sensor data instantly.

## Fog Computing
Processing data on **local network servers** (gateways) before it reaches the cloud.
- **Why?**: Aggregates data from many edge devices, provides a middle layer.

## Comparison

| Cloud | Fog | Edge |
|-------|-----|------|
| Centralized | Distributed | Localized |
| Far from data | Nearby data | At data source |
| High Latency | Medium Latency| Low Latency |
| Big Data Analysis| Fast coordination| Instant Action |

\`\`\`mermaid
graph BT
    Source[IoT Sensors] --> Edge[Edge Devices]
    Edge --> Fog[Local Gateways]
    Fog --> Cloud[Central Data Center]
\`\`\`
`, resources: []
    },
    {
        title: "Computer Networks Fundamentals",
        slug: "networks-fundamentals",
        description: "LAN, WAN, Routers, Switches, and the Internet.",
        order: 19, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Computer Networks Fundamentals

A network is two or more computers connected to share resources.

## Network Types
- **PAN**: Bluetooth range (Personal).
- **LAN**: One building/office (Local).
- **WAN**: Entire country or world (Wide). The Internet is the largest WAN.

## Hardware
- **Switch**: Connects devices WITHIN a LAN.
- **Router**: Connects different networks (e.g., your LAN to the Internet).
- **Modem**: Converts signals from internet provider (fiber/cable) to ethernet.

## The IP Address
Every device on a network has a unique "ID card" called an IP address.
- **IPv4**: \`192.168.1.1\` (Older, limited).
- **IPv6**: \`2001:0db8:85a3:...\` (New, huge capacity).

## Protocols
- **HTTP/HTTPS**: For web pages.
- **FTP**: For file transfers.
- **SMTP**: For sending email.
- **TCP/IP**: The fundamental language of the internet.
`, resources: []
    },
    {
        title: "Cybersecurity Fundamentals",
        slug: "cybersecurity-fundamentals",
        description: "Malware, Phishing, Firewalls, and Encryption basics.",
        order: 20, estimatedMinutes: 55, difficulty: "Easy",
        content: `
# Cybersecurity Fundamentals

Protecting systems and data from digital attacks.

## Common Threats
- **Malware**: Malicious software (Viruses, Worms, Ransomware).
- **Phishing**: Fake emails to steal passwords.
- **DDoS**: Overwhelming a server to crash it.
- **Social Engineering**: Tricking people into giving secrets.

## The CIA Triad
1. **Confidentiality**: Data is seen only by authorized people.
2. **Integrity**: Data isn't changed during transfer.
3. **Availability**: Systems work when needed.

## Defenses
- **Firewall**: A gatekeeper that filters network traffic.
- **Antivirus**: Scans for known malicious patterns.
- **Encryption**: Scrambling data so only those with a "key" can read it.
- **2FA (Two-Factor Auth)**: Using a password + a phone code.

## Best Practices
- Keep software updated (Patches).
- Use strong, unique passwords.
- Think before you click suspicious links.
`, resources: []
    }
];
