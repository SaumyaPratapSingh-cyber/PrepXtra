
import { RoadmapTrack } from './types';

export const blockchainRoadmap: RoadmapTrack = {
    id: 'blockchain',
    title: 'Blockchain',
    description: 'Learn the fundamentals of decentralized technologies',
    category: 'role-based',
    icon: '🔗',
    accentColor: '#6366f1',
    rootNodeId: 'bc-root',
    nodes: {
        'bc-root': {
            id: 'bc-root',
            label: 'Blockchain Mastery',
            description: 'Learn how to build decentralized applications and smart contracts.',
            children: ['bc-fundamentals', 'bc-ethereum', 'bc-solidity', 'bc-security'],
            resources: [
                { type: 'article', title: 'Blockchain Roadmap', url: 'https://roadmap.sh/blockchain', isFree: true },
                { type: 'video', title: 'Blockchain Full Course', url: 'https://www.youtube.com/watch?v=gyMwXuJrbJQ', isFree: true },
                { type: 'course', title: 'Ethereum and Solidity (Udemy)', url: 'https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/', isFree: false }
            ],
            content: {
                overview: 'Blockchain is a distributed, immutable ledger technology that enables trustless transactions without intermediaries. Bitcoin introduced blockchain for peer-to-peer digital currency. Ethereum expanded the concept with smart contracts — self-executing programs that run on the blockchain. This enables decentralized applications (dApps) for finance (DeFi), digital art (NFTs), governance (DAOs), supply chain tracking, and identity verification. Blockchain developers typically specialize in smart contract development (writing the on-chain logic in Solidity or Rust) or dApp development (building the front-end that interacts with the blockchain). The ecosystem moves fast, and security is paramount — a single bug in a smart contract can result in millions of dollars lost.',
                keyConcepts: [
                    'Distributed ledger: data replicated across all nodes',
                    'Blocks, transactions, and cryptographic hashing',
                    'Consensus mechanisms: Proof of Stake, Proof of Work',
                    'Smart contracts: self-executing on-chain programs',
                    'Wallets, private keys, and public keys',
                    'Gas fees and transaction costs',
                    'DeFi: decentralized finance protocols',
                    'NFTs, DAOs, and tokenomics'
                ],
                practiceQuestions: [
                    { question: 'What makes a blockchain immutable?', hint: 'Each block contains the hash of the previous block. Changing any block changes its hash, breaking the chain. The network rejects tampered data.', difficulty: 'easy' },
                    { question: 'What is the difference between Proof of Work and Proof of Stake?', hint: 'PoW uses computational power (mining) to validate. PoS uses staked cryptocurrency — validators are chosen based on their stake.', difficulty: 'medium' },
                    { question: 'What is a smart contract?', hint: 'Code deployed on the blockchain that executes automatically when conditions are met. Once deployed, it cannot be changed.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Security first — have all smart contracts audited before deployment.',
                    'Start with Ethereum and Solidity before exploring other chains.',
                    'Test extensively on testnets before deploying to mainnet.',
                    'Understand gas optimization to minimize transaction costs.',
                    'Stay updated — the ecosystem evolves extremely quickly.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Blockchain Fundamentals', description: 'Core concepts and how it works.', tasks: ['Understand blocks, hashes, and the chain structure', 'Learn about consensus mechanisms', 'Set up MetaMask and explore a testnet'] },
                { day: 2, title: 'Smart Contracts', description: 'Write and deploy contracts.', tasks: ['Learn Solidity basics: types, functions, modifiers', 'Write and deploy a smart contract on Remix IDE', 'Interact with your contract from a web frontend'] },
                { day: 3, title: 'DApp Development', description: 'Build a full decentralized app.', tasks: ['Build a frontend with ethers.js or wagmi', 'Implement wallet connection and transaction signing', 'Deploy to a testnet and verify on Etherscan'] }
            ]
        },
        'bc-fundamentals': {
            id: 'bc-fundamentals',
            label: 'Core Concepts',
            description: 'Hashing, peer-to-peer networks, consensus, and cryptographic foundations.',
            parentId: 'bc-root',
            resources: [
                { type: 'article', title: 'But how does bitcoin actually work?', url: 'https://www.youtube.com/watch?v=bBC-nXj3Ng4', isFree: true }
            ],
            content: {
                overview: 'Blockchain is built on several cryptographic and distributed systems concepts. Cryptographic hashing (SHA-256) creates a unique fingerprint for any data — even a tiny change produces a completely different hash. Each block contains the hash of the previous block, forming an unbreakable chain. Peer-to-peer networking means there is no central server — thousands of nodes maintain identical copies of the ledger. Consensus mechanisms ensure all nodes agree on the state of the ledger: Proof of Work (Bitcoin) uses computational puzzles, Proof of Stake (Ethereum) selects validators based on staked funds. Merkle trees efficiently verify that transactions are included in a block. Public key cryptography (asymmetric) enables secure ownership without revealing private keys.',
                keyConcepts: [
                    'Cryptographic hashing: SHA-256 and its properties',
                    'Block structure: header, transactions, previous hash, nonce',
                    'Merkle trees for efficient transaction verification',
                    'Peer-to-peer networking and node types',
                    'Proof of Work vs Proof of Stake consensus',
                    'Public key cryptography: signing and verification',
                    'Wallets: hot vs cold, custodial vs non-custodial',
                    'Blockchain trilemma: decentralization, security, scalability'
                ],
                practiceQuestions: [
                    { question: 'What is the blockchain trilemma?', hint: 'You can only optimize for 2 of 3: decentralization, security, and scalability. Most chains sacrifice one.', difficulty: 'medium' },
                    { question: 'How does public key cryptography work in blockchain?', hint: 'Private key signs transactions (proves ownership). Public key verifies the signature (anyone can check). Private key is never shared.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Understand the fundamentals deeply before writing code.',
                    'Never share your private keys or seed phrase.',
                    'Use hardware wallets for significant holdings.',
                    'Verify transactions on block explorers (Etherscan).'
                ]
            }
        },
        'bc-ethereum': {
            id: 'bc-ethereum',
            label: 'Ethereum & EVM',
            description: 'How the Ethereum Virtual Machine works and its ecosystem.',
            parentId: 'bc-root',
            resources: [
                { type: 'documentation', title: 'Ethereum.org', url: 'https://ethereum.org/en/developers/', isFree: true }
            ],
            content: {
                overview: 'Ethereum is the leading smart contract platform, often called the "world computer." Unlike Bitcoin (primarily for payments), Ethereum runs arbitrary programs (smart contracts) on the Ethereum Virtual Machine (EVM). The EVM is a stack-based, Turing-complete virtual machine that executes bytecode on every node in the network. Gas is the unit measuring computational effort — every operation costs gas, and users pay gas fees in ETH to execute transactions. Ethereum transitioned from Proof of Work to Proof of Stake in 2022 (The Merge), reducing energy consumption by 99.95%. Layer 2 solutions (Polygon, Arbitrum, Optimism, Base) scale Ethereum by processing transactions off-chain and settling on mainnet.',
                keyConcepts: [
                    'EVM: Ethereum Virtual Machine architecture',
                    'Accounts: Externally Owned Accounts (EOA) vs Contract Accounts',
                    'Gas and gas optimization',
                    'ERC standards: ERC-20 (tokens), ERC-721 (NFTs), ERC-1155',
                    'The Merge: transition to Proof of Stake',
                    'Layer 2 scaling: Optimistic rollups, ZK rollups',
                    'ABI: Application Binary Interface for contract interaction',
                    'Events and logs for off-chain indexing'
                ],
                practiceQuestions: [
                    { question: 'What is gas in Ethereum?', hint: 'A unit measuring computational effort. Every operation (transfer, function call) costs gas. Users pay gas fees in ETH.', difficulty: 'easy' },
                    { question: 'What is the difference between L1 and L2?', hint: 'L1 is the Ethereum mainnet. L2s (Arbitrum, Optimism) process transactions off-chain for speed and lower fees, then settle on L1.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Start development on testnets (Sepolia, Goerli) before mainnet.',
                    'Optimize gas usage — every operation costs real money.',
                    'Use established standards (ERC-20, ERC-721) for interoperability.',
                    'Test with Hardhat or Foundry for fast, local development.'
                ]
            }
        },
        'bc-solidity': {
            id: 'bc-solidity',
            label: 'Smart Contracts',
            description: 'Developing smart contracts in Solidity with Hardhat and Foundry.',
            parentId: 'bc-root',
            resources: [
                { type: 'documentation', title: 'Solidity Docs', url: 'https://docs.soliditylang.org/', isFree: true },
                { type: 'documentation', title: 'Hardhat', url: 'https://hardhat.org/', isFree: true }
            ],
            content: {
                overview: 'Solidity is the most popular language for writing Ethereum smart contracts. It is a statically-typed, contract-oriented language influenced by JavaScript, Python, and C++. Smart contracts are deployed to the blockchain and their code is immutable — once deployed, bugs cannot be patched (unless you use upgradeable proxy patterns). Key concepts include state variables (stored on-chain, cost gas), functions (public, external, internal, private), modifiers (access control), events (for off-chain listening), and mappings (hash maps). Development tools include Hardhat (JavaScript-based, most popular) and Foundry (Rust-based, faster tests). OpenZeppelin provides audited, reusable contract libraries for tokens, access control, and upgradability.',
                keyConcepts: [
                    'Solidity: types, mappings, structs, enums',
                    'Functions: visibility, modifiers, payable, view, pure',
                    'Events and indexed parameters for off-chain indexing',
                    'Inheritance and interfaces in Solidity',
                    'OpenZeppelin: reusable, audited contract libraries',
                    'Hardhat: testing, deployment, and scripting',
                    'Foundry: Forge for testing, Cast for interaction',
                    'Upgradeable contracts: proxy patterns'
                ],
                practiceQuestions: [
                    { question: 'Why are smart contracts immutable and why is that a problem?', hint: 'Blockchain data cannot be changed. If a deployed contract has a bug, you cannot fix it. Proxy patterns allow upgrading the logic while keeping the address.', difficulty: 'medium' },
                    { question: 'What is the difference between memory and storage in Solidity?', hint: 'Storage is persistent on-chain (expensive). Memory is temporary within a function call (cheaper). Calldata is read-only input data (cheapest).', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use OpenZeppelin contracts instead of writing security-critical code from scratch.',
                    'Write extensive tests with 100% coverage before deployment.',
                    'Get contracts audited by professional security firms.',
                    'Use events for data that does not need on-chain access.',
                    'Minimize storage writes — they are the most expensive operations.'
                ]
            }
        },
        'bc-security': {
            id: 'bc-security',
            label: 'Web3 Security',
            description: 'Protecting smart contracts from exploits and common vulnerabilities.',
            parentId: 'bc-root',
            resources: [
                { type: 'article', title: 'SWC Registry', url: 'https://swcregistry.io/', isFree: true },
                { type: 'article', title: 'Ethernaut (Security Challenges)', url: 'https://ethernaut.openzeppelin.com/', isFree: true }
            ],
            content: {
                overview: 'Smart contract security is the most critical aspect of blockchain development. Unlike traditional software where bugs can be patched, deployed smart contract vulnerabilities can lead to irreversible loss of funds. Billions of dollars have been lost to exploits. Common vulnerabilities include reentrancy attacks (calling back into the contract before state updates), integer overflow/underflow (fixed since Solidity 0.8), access control flaws (missing authorization checks), flash loan attacks (borrowing huge amounts for a single transaction), and oracle manipulation (feeding false price data). Security practices include following the checks-effects-interactions pattern, using OpenZeppelin\'s battle-tested libraries, writing comprehensive tests, and getting professional audits.',
                keyConcepts: [
                    'Reentrancy attack and the checks-effects-interactions pattern',
                    'Access control: onlyOwner, role-based (OpenZeppelin AccessControl)',
                    'Front-running and MEV (Maximal Extractable Value)',
                    'Flash loan attacks and oracle manipulation',
                    'Integer overflow/underflow (pre-Solidity 0.8)',
                    'Denial of Service (DoS) attacks on contracts',
                    'Signature replay attacks',
                    'Formal verification and symbolic execution'
                ],
                practiceQuestions: [
                    { question: 'What is a reentrancy attack?', hint: 'A malicious contract calls back into your contract before the first call finishes, exploiting inconsistent state. The DAO hack was a reentrancy attack.', difficulty: 'medium' },
                    { question: 'What is a flash loan attack?', hint: 'Borrowing a massive amount with no collateral for a single transaction, using it to manipulate prices or exploit vulnerabilities.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Follow the checks-effects-interactions pattern for all external calls.',
                    'Use OpenZeppelin ReentrancyGuard for functions that transfer funds.',
                    'Get at least one professional security audit before mainnet deployment.',
                    'Practice on Ethernaut and Damn Vulnerable DeFi to learn attack patterns.',
                    'Use static analysis tools: Slither, Mythril, Securify.'
                ]
            }
        }
    }
};
