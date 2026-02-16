// Computer Organization & Architecture Seed Data
export const computerOrganizationTopics = [
    {
        title: "Number Systems & Logic Gates",
        slug: "logic-gates-numbers",
        description: "Binary, Hex, 2's complement, and the building blocks of CPUs.",
        order: 1, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Number Systems & Logic Gates

At the lowest level, computers only understand "On" (1) and "Off" (0).

## 1. Number Systems
- **Binary (Base-2)**: 0, 1.
- **Hexadecimal (Base-16)**: 0-9, A-F. (Easier for humans to read than long binary strings).
- **2's Complement**: The standard way to represent negative numbers. 
    1. Flip the bits.
    2. Add 1.
- **Fixed vs Floating Point**: Integers vs Decimals (IEEE 754 standard).

## 2. Basic Logic Gates
The mathematical foundations of digital circuits.
- **AND**: 1 if both are 1.
- **OR**: 1 if at least one is 1.
- **NOT**: Flips the bit.
- **XOR**: 1 if inputs are different. (Crucial for addition).
- **NAND/NOR**: "Universal Gates" — you can build any other gate using only these.

## 3. Boolean Algebra
- **De Morgan's Laws**: $\overline{A \cdot B} = \bar{A} + \bar{B}$ and $\overline{A + B} = \bar{A} \cdot \bar{B}$.
- **Sum of Products (SOP)** and **Product of Sums (POS)**.

## 4. Truth Tables
A table showing every possible input combination and the resulting output.
`, resources: []
    },
    {
        title: "Digital Logic: K-Maps & Circuits",
        slug: "digital-logic-circuits",
        description: "Simplifying logic and building combinational circuits.",
        order: 2, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Digital Logic Circuits

## 1. Karnaugh Maps (K-Maps)
A visual method to simplify Boolean expressions.
- Groups of 1, 2, 4, 8, or 16 cells are identified to eliminate variables.

## 2. Combinational Circuits
The output depends ONLY on current inputs.
- **Adder**: Half-adder (2 bits), Full-adder (3 bits).
- **Multiplexer (MUX)**: "Data Selector". Selects one of many inputs to pass through.
- **Demultiplexer (DEMUX)**: Opposite of MUX.
- **Decoder**: Converts binary code into a signal on one of many output lines (e.g., $n \to 2^n$).
- **Encoder**: Opposite of Decoder.

## 3. Propagation Delay
The time it takes for a signal to travel through gates. This limits the maximum clock speed of a CPU.

## 4. Arithmetic Logic Unit (ALU)
The "Heart" of the processor that performs all math and logic operations.
`, resources: []
    },
    {
        title: "Sequential Circuits: Flip-Flops",
        slug: "sequential-circuits",
        description: "Circuits with memory: Latches, Flip-Flops, and Registers.",
        order: 3, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Sequential Circuits

Unlike combinational circuits, sequential circuits have **Memory**. The output depends on current inputs AND the history of inputs.

## 1. Latches vs Flip-Flops
- **Latch**: Level-triggered (changes whenever input is high).
- **Flip-Flop (FF)**: Edge-triggered (only changes on the clock pulse).

## 2. Common Flip-Flops
- **SR (Set-Reset)**: Basic memory, but has an "invalid" state (1,1).
- **D (Data)**: Simply captures the input at the clock edge. (Used for Registers).
- **JK**: Improved version of SR that "toggles" on (1,1).
- **T (Toggle)**: Flips its state on every clock pulse. (Used for Counters).

## 3. Registers & Counters
- **Register**: A group of Flip-Flops working together to store a multi-bit value.
- **Counter**: A sequence of FFs that increment a value on each clock cycle.

## 4. Finite State Machines (FSM)
- **Mealy Machine**: Output depends on state and input.
- **Moore Machine**: Output depends ONLY on current state.
`, resources: []
    },
    {
        title: "Instruction Set Architecture (ISA)",
        slug: "isa-basics",
        description: "The contract between hardware and software.",
        order: 4, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Instruction Set Architecture (ISA)

The ISA defines what the CPU can do: the instructions it understands, the registers it has, and how it handles memory.

## 1. Anatomy of an Instruction
\`\`\`assembly
ADD R1, R2, R3 ; R1 = R2 + R3
\`\`\`
- **Opcode**: The operation (\`ADD\`).
- **Operands**: The data sources/targets (\`R1, R2, R3\`).

## 2. Register Organization
- **General Purpose Registers (GPR)**: For user data.
- **Special Purpose**:
    - **Program Counter (PC)**: Address of the NEXT instruction.
    - **Instruction Register (IR)**: Current instruction being decoded.
    - **Stack Pointer (SP)**.
    - **Status Register (Flags)**: Carry, Zero, Overflow.

## 3. CISC vs RISC
- **CISC (Complex Instruction Set)**: x86 (Intel/AMD). Individual instructions can do many things. Smaller code size, complex hardware.
- **RISC (Reduced Instruction Set)**: ARM (Apple Silicon/Mobile), RISC-V. Simple instructions that run in 1 cycle. Larger code size, simple/fast hardware.
`, resources: []
    },
    {
        title: "Addressing Modes",
        slug: "addressing-modes",
        description: "How the CPU finds the data it needs.",
        order: 5, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Addressing Modes

How the computer specifies the location of operands.

## 1. Immediate Mode
The operand is part of the instruction.
\`MOV R1, #5\` (Put the number 5 into R1).

## 2. Direct (Absolute) Mode
The instruction contains the memory address.
\`MOV R1, 1000\` (Get value from RAM address 1000).

## 3. Indirect Mode
The instruction contains the address of the address. (Like a pointer).

## 4. Register Mode
Operand is in a register. \`MOV R1, R2\`.

## 5. Displacement Modes
- **Relative**: Current PC + Offset. (Used for loops/jumps).
- **Base-Register**: Base address in R + Offset.
- **Indexed**: Base address + Index R.
`, resources: []
    },
    {
        title: "CPU Structure & Functional Units",
        slug: "cpu-structure",
        description: "Control Unit, ALU, and the Internal Bus.",
        order: 6, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# CPU Structure

## 1. The Von Neumann Architecture
The idea that **Instructions** and **Data** share the same memory and bus.
- **Bottleneck**: The "Von Neumann Bottleneck" where CPU waits for memory.

## 2. Control Unit (CU)
The "Brain" of the CPU. It decodes instructions and sends control signals to the ALU and memory.
- **Hardwired**: Fixed logic (Fast, but hard to change).
- **Microprogrammed**: Uses a tiny "Control Store" ROM (Flexible, but slower).

## 3. Data Path
The connection between registers and the ALU.

## 4. The Instruction Cycle
1. **Fetch**: Get instruction from memory using PC.
2. **Decode**: CU determines what to do.
3. **Execute**: ALU performs math or CU changes PC.
4. **Write Back**: Result saved to register/memory.
`, resources: []
    },
    {
        title: "Pipelining Basics",
        slug: "pipelining-basics",
        description: "Increasing throughput by overlapping instruction stages.",
        order: 7, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# CPU Pipelining

Pipelining is like an assembly line for instructions. It doesn't make one instruction faster; it makes the WHOLE CPU finish more instructions per second.

## 1. The Stages
1. **IF**: Instruction Fetch.
2. **ID**: Instruction Decode.
3. **EX**: Execute.
4. **MEM**: Memory Access.
5. **WB**: Write Back.

## 2. Performance Metric
$S_k = \frac{n \times k}{k + n - 1}$
Where $k$ = stages, $n$ = instructions. Ideal speedup $\approx k$.

## 3. Hazards (The Enemy)
1. **Structural**: Hardware resource conflict (e.g., two stages needing memory).
2. **Data**: Instruction depends on the result of a previous one.
3. **Control (Branch)**: The next instruction depends on a "Jump" that hasn't been decided yet.

## 4. Fixes
- **Stalling**: Inserting "NOP" (No-op) instructions.
- **Forwarding**: Passing results directly from ALU to ID without waiting for WB.
- **Branch Prediction**: Guessing if a jump will happen.
`, resources: []
    },
    {
        title: "Memory Hierarchy",
        slug: "memory-hierarchy",
        description: "Speed vs Cost: Registers, Cache, RAM, and Disk.",
        order: 8, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Memory Hierarchy

Memory is a tradeoff: You can have it **Fast**, **Cheap**, or **Big**, but you can't have all three.

## 1. The Pyramid (Fastest to Slowest)
1. **Registers**: Inside the CPU. (Nano-seconds).
2. **L1/L2/L3 Cache**: Static RAM (SRAM).
3. **Main Memory**: Dynamic RAM (DRAM).
4. **Secondary Storage**: SSD/HDD. (Milli-seconds).

## 2. Principle of Locality
Why hierarchy works:
- **Temporal Locality**: If a data item is used once, it will likely be used again soon (e.g., loops).
- **Spatial Locality**: If a data item is used, nearby items will likely be used soon (e.g., arrays).

## 3. Hit vs Miss
- **Hit**: Data found in upper level.
- **Miss**: Must look in lower level (Slow).
- **Hit Ratio**: $\text{Hits} / \text{Total Accesses}$.
`, resources: []
    },
    {
        title: "Cache Memory: Mapping",
        slug: "cache-mapping",
        description: "Direct, Fully Associative, and Set-Associative caches.",
        order: 9, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Cache Mapping

How do we decide which RAM address goes to which Cache slot?

## 1. Direct Mapping
Every RAM block maps to exactly ONE cache line.
- **Index** = $\text{Block Address} \pmod{\text{Cache Lines}}$.
- **Pro**: Simple, fast.
- **Con**: **Thrashing** if two active blocks map to the same slot.

## 2. Fully Associative
Any RAM block can go into ANY cache line.
- **Pro**: Zero conflict misses.
- **Con**: Hardware must search EVERY line simultaneously (Expensive, hot).

## 3. N-way Set Associative
The middle ground. Cache is divided into "Sets". A block maps to a set, but can go into any line within that set.
- Example: 4-way set associative is common in modern CPUs.

## 4. Tag, Index, and Offset
The bits in an address:
- **Tag**: Identifies if the specific memory block is in the cache.
- **Index**: Selects the set.
- **Offset**: Selects the byte within the block.
`, resources: []
    },
    {
        title: "Cache Coherence",
        slug: "cache-coherence",
        description: "Managing consistency in multi-core systems (MESI).",
        order: 10, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Cache Coherence

In a multi-core CPU, each core has its own L1 cache. If Core A updates a variable, Core B's cache might still have the old value.

## 1. Write Policies
- **Write-Through**: Update cache AND main RAM simultaneously. (Slow).
- **Write-Back**: Only update cache. Update RAM later when the line is evicted. (Fast, but needs "Dirty bit").

## 2. MESI Protocol
Standard way to handle multi-core consistency. Every cache line is in one of 4 states:
- **Modified**: I've changed it; I'm the only one with this data.
- **Exclusive**: I'm the only one with the data, but it matches RAM.
- **Shared**: Others have it too; it matches RAM.
- **Invalid**: This data is trash; get a new copy.

## 3. Snooping
Caches "listen" (snoop) on the shared bus for memory updates from other cores to update their own state.
`, resources: []
    },
    {
        title: "I/O Organization & DMA",
        slug: "io-organization",
        description: "How the CPU talks to the outside world.",
        order: 11, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# I/O Organization

## 1. Programmed I/O
CPU waits and checks (polls) the device repeatedly. (Total waste of CPU time).

## 2. Interrupt-Driven I/O
Device alerts the CPU when it's ready. The CPU saves its current state, handles the I/O, and resumes.

## 3. DMA (Direct Memory Access)
The CPU gives a "DMA Controller" the source, destination, and count. The DMAC handles the transfer directly between Disk/Network and RAM.
- **Cycle Stealing**: DMAC "steals" a bus cycle from the CPU to move data.

## 4. Bus Structures
- **System Bus**: Connects CPU, RAM, and DMA.
- **PCIe (PCI Express)**: High-speed serial connection for GPUs and SSDs.
- **USB**: Serial bus for peripherals.
`, resources: []
    },
    {
        title: "Floating Point Arithmetic",
        slug: "floating-point-coa",
        description: "IEEE 754 standard, Mantissa, and Exponent.",
        order: 12, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Floating Point Arithmetic

How do we store $3.14159$ in 32 bits?

## 1. IEEE 754 Standard (Single Precision)
1 bit Sign ($S$) | 8 bits Exponent ($E$) | 23 bits Mantissa/Fraction ($F$).
- Formula: $(-1)^S \times 1.F \times 2^{E-127}$.

## 2. Why it's hard
- **Precision Loss**: Not every number can be represented exactly. ($0.1 + 0.2 \neq 0.3$ in computer math!).
- **Normalization**: Ensuring the number starts with \`1.\` to save space.

## 3. Specialized Hardware
- **FPU (Floating Point Unit)**: A chip (or part of the CPU) dedicated purely to decimal math.

## 4. Special Values
- **Infinity** $(\infty)$.
- **NaN** (Not a Number) - e.g., $0/0$.
`, resources: []
    },
    {
        title: "Parallel Processing & Flynn's Taxonomy",
        slug: "parallel-processing-tax",
        description: "SISD, SIMD, MISD, and MIMD systems.",
        order: 13, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Flynn's Taxonomy

Classifying computers based on how many "Instruction Streams" and "Data Streams" they can process at once.

## 1. SISD (Single Instruction, Single Data)
Traditional old-school processor. One task at a time.

## 2. SIMD (Single Instruction, Multiple Data)
"Vector Processing". One command kills many targets.
- **Use Case**: Brightening a whole image (One "Add 10" command applied to 1,000 pixels). GPUs use this!

## 3. MISD (Multiple Instruction, Single Data)
Very rare. Multiple CPUs check the same data.
- **Use Case**: Redundant flight controllers on a spaceship.

## 4. MIMD (Multiple Instruction, Multiple Data)
Modern multi-core PCs and supercomputers. Every core does its own thing on its own data.
`, resources: []
    },
    {
        title: "Superscalar & VLIW",
        slug: "superscalar-vliw",
        description: "Advanced ways to execute multiple instructions.",
        order: 14, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Beyond Basic Pipelining

## 1. Superscalar
A CPU that can start multiple instructions in a single clock cycle because it has multiple duplicate pipelines.
- **Out-of-Order Execution**: The CPU looks ahead and executes instructions that are ready, even if they aren't next in line (as long as dependencies allow).

## 2. VLIW (Very Long Instruction Word)
Instead of the CPU trying to find parallel tasks, the **Compiler** bundles 4-8 instructions into one "Giant" instruction.
- **Pro**: Simple hardware.
- **Con**: Harder software. (Used in some DSPs and old Itanium chips).

## 3. Speculative Execution
The CPU guesses which branch a program will take and starts executing it before it's sure.
- **Dark Side**: Vulnerabilities like **Spectre** and **Meltdown** exploit this "guessing" behavior.
`, resources: []
    },
    {
        title: "Instruction Formats & Expansion",
        slug: "instruction-formats",
        description: "Opcode length, 0-address vs 3-address machines.",
        order: 15, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Instruction Formats

How do we fit the Opcode and the Addresses into a fixed 32-bit width?

## 1. Address Formats
- **3-Address**: \`ADD A, B, C\` ($A = B + C$). Flexible but long.
- **2-Address**: \`ADD A, B\` ($A = A + B$).
- **1-Address**: \`ADD A\` ($\text{ACC} = \text{ACC} + A$). Uses a special register called an **Accumulator**.
- **0-Address**: \`ADD\`. Used in **Stack-based** machines (like Java Bytecode). It pops two values from the stack and pushes the result.

## 2. Expanding Opcodes
A trick to allow many instructions with fewer operands, or few instructions with many operands, within the same bit size.
- Example: If Opcode is \`1111\`, it signals that the next few bits are ALSO part of the opcode.
`, resources: []
    },
    {
        title: "The OS-Hardware Interface",
        slug: "os-hw-interface",
        description: "Exceptions, Traps, and Privilege levels.",
        order: 16, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# The OS-Hardware Interface

Hardware provides features that the OS uses to keep things running smoothly.

## 1. Privilege Levels (Protection Rings)
- **Ring 0 (Kernel mode)**: Full access.
- **Ring 3 (User mode)**: Apps run here. "Forbidden" instructions cause a trap to Ring 0.

## 2. Exceptions and Traps
- **Trap**: Intentional (e.g., Calling a System Call).
- **Fault**: Error (e.g., Accessing bad memory).
- **Abort**: Critical hardware failure.

## 3. System Clocks
Generating the heartbeat of the CPU using a Crystal Oscillator.
- **Overclocking**: Pushing the clock faster than rated, which generates more heat and potential instability.
`, resources: []
    },
    {
        title: "Multi-core and Shared Memory",
        slug: "multicore-coa",
        description: "UMA, NUMA, and Interconnects.",
        order: 17, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Multi-core Architectures

## 1. UMA (Uniform Memory Access)
All cores share one RAM and have the same access speed. Simple, but slow as you add more cores (The bus gets crowded).

## 2. NUMA (Non-Uniform Memory Access)
Each core (or group) has its own "local" RAM but can access "remote" RAM from other cores. Accessing local RAM is much faster.
- Common in servers with multiple CPU sockets.

## 3. Bus Snooping vs Directory
- **Snooping**: Every CPU watches the bus (Doesn't scale well).
- **Directory-based**: A central list tracks who has which cache line (Scales to 1000s of cores).

## 4. Hyperthreading (SMT)
Making one physical core look like two to the OS by duplicating the registers but NOT the ALU. It helps fill "holes" in the pipeline.
`, resources: []
    },
    {
        title: "GPU Architecture",
        slug: "gpu-architecture",
        description: "Throughput-oriented computing vs Latency-oriented CPUs.",
        order: 18, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# GPU Architecture

GPUs (Graphics Processing Units) are fundamentally different from CPUs.

## 1. Thousand-Core Design
A CPU has 8-16 "Smart" cores. A GPU has 3,000-10,000 "Simple" cores.

## 2. Throughput over Latency
- **CPU**: Optimized to do ONE task extremely fast (Latency).
- **GPU**: Optimized to do millions of tasks reasonably fast (Throughput).

## 3. Programming Models
- **CUDA (Nvidia)**: A specialized version of C++ to run code on GPUs.
- **OpenCL**: The open-standard equivalent.

## 4. Modern Use: AI
Since AI training is just massive matrix math, GPUs are 100x faster than CPUs for Deep Learning.
`, resources: []
    },
    {
        title: "Embedded Systems & ASICs",
        slug: "embedded-asics",
        description: "Specialized hardware for specific tasks.",
        order: 19, estimatedMinutes: 45, difficulty: "Medium",
        content: `
# Specialized Hardware

## 1. Embedded Systems
Computing systems hidden inside other devices (Cars, Washing machines, Heart monitors). Usually have limited RAM and power.

## 2. ASICs (Application-Specific Integrated Circuits)
Hardware custom-built for one job (e.g., Bitcoin mining or Video encoding). Impossible to re-program but incredibly efficient.

## 3. FPGAs (Field Programmable Gate Arrays)
Hardware that can be "re-wired" using software. A middle ground between a general CPU and a custom ASIC.

## 4. SoC (System on a Chip)
Putting CPU, GPU, RAM, and Modem on a single piece of silicon (e.g., Apple M3 or Snapdragon).
`, resources: []
    },
    {
        title: "Future Architectures: Quantum & More",
        slug: "quantum-arch",
        description: "Qubits, Superposition, and beyond Silicon.",
        order: 20, estimatedMinutes: 50, difficulty: "Hard",
        content: `
# Future of Architecture

## 1. Moore's Law is Ending
Transistors can't get much smaller without "Quantum Tunneling" (Leaking).

## 2. Quantum Computing
Uses **Qubits**.
- **Superposition**: Being 0 and 1 at the same time.
- **Entanglement**: Linking two qubits regardless of distance.
- **Power**: Can solve problems (like breaking RSA encryption) that would take current supercomputers trillions of years.

## 3. Neuromorphic Computing
Hardware that mimics the human brain's architecture (Neurons and Synapses). Extremely efficient for AI.

## 4. Optical Computing
Using Photons (Light) instead of Electrons to move data. Zero heat, near-infinite speed.
`, resources: []
    }
];
