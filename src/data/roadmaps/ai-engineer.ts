
import { RoadmapTrack } from './types';

export const aiEngineerRoadmap: RoadmapTrack = {
    id: 'ai-engineer',
    title: 'AI Engineer',
    description: 'Complete roadmap to becoming an AI Engineer in 2025',
    category: 'role-based',
    icon: '🤖',
    accentColor: '#8b5cf6',
    rootNodeId: 'ai-root',
    nodes: {
        'ai-root': {
            id: 'ai-root',
            label: 'AI Engineer',
            description: 'Mastering the development, deployment, and optimization of intelligent systems using Machine Learning, Deep Learning, and Generative AI.',
            children: ['ai-math', 'ai-python', 'ai-ml'],
            resources: [
                { type: 'article', title: 'DeepLearning.AI - AI For Everyone', url: 'https://www.deeplearning.ai/courses/ai-for-everyone/', isFree: true },
                { type: 'video', title: 'What is AI? - IBM Technology', url: 'https://www.youtube.com/watch?v=2ePf9rue1Ao', isFree: true },
                { type: 'article', title: 'Andrej Karpathy - Intro to LLMs', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', isFree: true },
                { type: 'course', title: 'Google Cloud - Generative AI Learning Path', url: 'https://www.cloudskillsboost.google/paths/118', isFree: true }
            ],
            content: {
                overview: 'Artificial Intelligence (AI) Engineering is the practice of applying machine learning algorithms and deep learning architectures to solve complex, real-world problems. As an AI Engineer, you bridge the gap between pure research and production-ready applications, focusing on data engineering, model training, evaluation, and scalable deployment. \n\nThe field is rapidly evolving from traditional predictive analytics to Generative AI and Large Language Models (LLMs). Success in this role requires a strong mathematical foundation, proficiency in Python, and the ability to navigate the complex ecosystem of AI frameworks and cloud infrastructure.',
                keyConcepts: [
                    'Supervised, Unsupervised, and Reinforcement Learning',
                    'Neural Network Architectures: CNNs, RNNs, and Transformers',
                    'Natural Language Processing (NLP) and Computer Vision (CV)',
                    'Generative AI: LLMs, Diffusion Models, and GANs',
                    'MLOps: Continuous integration and deployment for ML',
                    'Model Evaluation: Precision, Recall, F1-Score, and Bias/Variance',
                    'Hardware Acceleration: GPUs, TPUs, and CUDA',
                    'Ethics and Safety in AI development'
                ],
                practiceQuestions: [
                    { question: 'What is the "Black Box" problem in AI?', hint: 'Lack of interpretability in deep neural networks.', difficulty: 'easy' },
                    { question: 'Explain the difference between AI, Machine Learning, and Deep Learning.', hint: 'AI (Broadest) -> ML (Algorithms) -> DL (Neural Networks).', difficulty: 'medium' },
                    { question: 'What is "Training Data Bias" and why is it dangerous?', hint: 'Models inheriting prejudices from historical data.', difficulty: 'medium' },
                    { question: 'What is the role of an Activation Function in a neural network?', hint: 'Introduces non-linearity to the model.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Start with the simplest model that could solve the problem (Baselines).',
                    'Always split your data into Training, Validation, and Test sets.',
                    'Monitor models in production for "Data Drift" and performance degradation.',
                    'Prioritize data quality over model complexity—Garbage In, Garbage Out.',
                    'Document your experiments using tools like MLflow or Weights & Biases.',
                    'Consider the environmental and ethical impact of training massive models.'
                ]
            },
            dayWisePlan: [{ day: 1, title: 'AI Overview', description: 'Understand the AI landscape.', tasks: ['Learn differences between AI, ML, DL, and GenAI', 'Explore real-world AI applications', 'Set up your AI development environment'] }]
        },
        'ai-math': {
            id: 'ai-math', label: 'Mathematics', description: 'Linear algebra, calculus, probability, and statistics form the mathematical foundation of AI and machine learning algorithms.',
            parentId: 'ai-root', children: ['linear-algebra', 'probability-stats'],
            resources: [
                { type: 'course', title: 'Mathematics for ML', url: 'https://www.coursera.org/specializations/mathematics-machine-learning', isFree: true },
                { type: 'video', title: '3Blue1Brown - Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Linear Algebra', description: 'Vectors, matrices, eigenvalues.', tasks: ['Vectors, dot product, and cross product', 'Matrix operations and transformations', 'Eigenvalues and eigenvectors'] },
                { day: 2, title: 'Calculus & Stats', description: 'Derivatives, integrals, distributions.', tasks: ['Partial derivatives and gradients', 'Probability distributions (normal, binomial)', 'Bayesian statistics and hypothesis testing'] },
            ]
        },
        'linear-algebra': { id: 'linear-algebra', label: 'Linear Algebra', description: 'Vectors, matrices, eigenvalues, and singular value decomposition for understanding ML algorithms.', parentId: 'ai-math', resources: [{ type: 'video', title: 'Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', isFree: true }] },
        'probability-stats': { id: 'probability-stats', label: 'Probability & Statistics', description: 'Probability theory, Bayes theorem, distributions, and statistical inference for data-driven decisions.', parentId: 'ai-math', resources: [{ type: 'course', title: 'Statistics with Python', url: 'https://www.coursera.org/specializations/statistics-with-python', isFree: true }] },
        'ai-python': {
            id: 'ai-python', label: 'Python & Libraries', description: 'Python is the primary language for AI. Master NumPy, Pandas, Matplotlib, and Scikit-learn.',
            parentId: 'ai-root', children: ['numpy-pandas', 'scikit-learn'],
            resources: [{ type: 'documentation', title: 'Python Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', isFree: true }],
            dayWisePlan: [{ day: 1, title: 'Python for AI', description: 'Essential libraries.', tasks: ['NumPy arrays, broadcasting, and linear algebra', 'Pandas DataFrames for data manipulation', 'Matplotlib and Seaborn for visualization'] }]
        },
        'numpy-pandas': { id: 'numpy-pandas', label: 'NumPy & Pandas', description: 'NumPy for numerical computation and Pandas for data manipulation and analysis.', parentId: 'ai-python', resources: [{ type: 'documentation', title: 'NumPy Documentation', url: 'https://numpy.org/doc/', isFree: true }] },
        'scikit-learn': { id: 'scikit-learn', label: 'Scikit-learn', description: 'Machine learning library with classification, regression, clustering, and preprocessing tools.', parentId: 'ai-python', resources: [{ type: 'documentation', title: 'Scikit-learn Docs', url: 'https://scikit-learn.org/stable/', isFree: true }] },
        'ai-ml': {
            id: 'ai-ml',
            label: 'Machine Learning',
            description: 'Mastering the mathematical foundations and algorithmic approaches that allow computers to learn from data without explicit programming.',
            parentId: 'ai-root',
            children: ['supervised-ml', 'deep-learning', 'nlp-llm'],
            resources: [
                { type: 'course', title: 'Andrew Ng - Machine Learning Specialization', url: 'https://www.coursera.org/specializations/machine-learning-introduction', isFree: false },
                { type: 'article', title: 'Scikit-Learn Documentation', url: 'https://scikit-learn.org/stable/user_guide.html', isFree: true },
                { type: 'video', title: 'Machine Learning Zero to Hero - Google', url: 'https://www.youtube.com/watch?v=KNAWp2pEcU0', isFree: true },
                { type: 'article', title: 'Interpretable Machine Learning - Christoph Molnar', url: 'https://christophm.github.io/interpretable-ml-book/', isFree: true }
            ],
            content: {
                overview: 'Machine Learning is a subset of AI that focuses on building systems that learn—or improve performance—based on the data they consume. Instead of writing explicit rules, you provide the system with examples (data) and a goal (loss function). \n\nML is divided into three main paradigms: Supervised Learning (predicting labels), Unsupervised Learning (finding patterns), and Reinforcement Learning (learning through trial and error). Understanding the math behind these—Linear Algebra, Calculus, and Statistics—is essential for optimizing models and understanding their limitations.',
                keyConcepts: [
                    'Regression: Linear, Logistic, and Polynomial',
                    'Classification: Decision Trees, Random Forests, and SVMs',
                    'Clustering: K-Means, Hierarchical, and DBSCAN',
                    'Dimensionality Reduction: PCA and t-SNE',
                    'Gradient Descent and Backpropagation',
                    'Hyperparameter Tuning: Grid Search and Bayesian Optimization',
                    'Overfitting and Underfitting: Regularization techniques',
                    'Feature Engineering and Preprocessing'
                ],
                codeExamples: [
                    {
                        title: 'Scikit-Learn Linear Regression',
                        language: 'python',
                        code: 'from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprint(f"Model Score: {model.score(X_test, y_test)}")'
                    },
                    {
                        title: 'Cross-Validation Template',
                        language: 'python',
                        code: 'from sklearn.model_selection import cross_val_score\nscores = cross_val_score(model, X, y, cv=5)\nprint(f"Mean Accuracy: {scores.mean():.2f}")'
                    }
                ],
                practiceQuestions: [
                    { question: 'What is the purpose of a "Validation Set"?', hint: 'To tune hyperparameters without leaking test data.', difficulty: 'medium' },
                    { question: 'Contrast L1 (Lasso) and L2 (Ridge) Regularization.', hint: 'L1 can zero out weights (sparsity), L2 shrinks them.', difficulty: 'hard' },
                    { question: 'What is the "Curse of Dimensionality"?', hint: 'Data becomes sparse as features increase, making patterns harder to find.', difficulty: 'hard' },
                    { question: 'Explain the Bias-Variance trade-off.', hint: 'Error from simple assumptions vs Error from sensitivity to noise.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always scale or normalize your features before training.',
                    'Check for class imbalance and use techniques like SMOTE if necessary.',
                    'Don\'t ignore the "Explainability" of your model.',
                    'Automate your preprocessing pipeline using Scikit-Learn Pipelines.',
                    'Validate your assumptions about the data distribution.',
                    'Use version control for your datasets (DVC).'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'ML Fundamentals', description: 'Core ML algorithms.', tasks: ['Linear and logistic regression', 'Decision trees and random forests', 'Model evaluation: accuracy, precision, recall, F1'] },
                { day: 2, title: 'Advanced ML', description: 'Ensemble methods and tuning.', tasks: ['Gradient boosting (XGBoost, LightGBM)', 'Cross-validation and hyperparameter tuning', 'Feature engineering and selection'] },
            ]
        },
        'supervised-ml': { id: 'supervised-ml', label: 'Supervised Learning', description: 'Classification (SVM, KNN, naive Bayes) and regression (linear, polynomial, ridge) with labeled data.', parentId: 'ai-ml', resources: [{ type: 'article', title: 'Supervised vs Unsupervised', url: 'https://www.ibm.com/topics/supervised-learning', isFree: true }] },
        'deep-learning': {
            id: 'deep-learning',
            label: 'Deep Learning',
            description: 'Mastering neural network architectures, optimization techniques, and the frameworks that power modern AI.',
            parentId: 'ai-ml',
            children: ['pytorch', 'cnn-cv'],
            resources: [
                { type: 'course', title: 'Deep Learning Specialization (Andrew Ng)', url: 'https://www.coursera.org/specializations/deep-learning', isFree: false },
                { type: 'video', title: '3Blue1Brown - Neural Networks', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', isFree: true },
                { type: 'article', title: 'Fast.ai - Practical Deep Learning for Coders', url: 'https://course.fast.ai/', isFree: true },
                { type: 'documentation', title: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/', isFree: true },
                { type: 'video', title: 'Andrej Karpathy - Zero to Hero', url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI2AdFxnKy58TVlR_X1mrs', isFree: true }
            ],
            content: {
                overview: 'Deep Learning is a subset of machine learning inspired by the structure and function of the human brain. It uses multi-layered neural networks to learn hierarchical representations of data. \n\nLearning Deep Learning involves mastering the math of backpropagation, understanding various activation functions (ReLU, Softmax), and choosing the right architecture for the task—be it CNNs for images, RNNs for sequences, or Transformers for text. Frameworks like PyTorch and TensorFlow provide the building blocks to design, train, and deploy these complex models at scale.',
                keyConcepts: [
                    'The Perceptron: Linear units and weighted sums',
                    'Backpropagation and Chain Rule: How models learn from errors',
                    'Activation Functions: Sigmoid, Tanh, ReLU, and Leaky ReLU',
                    'Optimization Algorithms: Adam, RMSprop, and SGD with Momentum',
                    'Loss Functions: Cross-Entropy, MSE, and Hinge Loss',
                    'Regularization: Dropout, Batch Normalization, and Weight Decay',
                    'Architectures: CNNs, RNNs, LSTMs, and GRUs',
                    'Hardware: GPUs vs TPUs and distributed training'
                ],
                codeExamples: [
                    {
                        title: 'Simple Neural Network in PyTorch',
                        language: 'python',
                        code: 'import torch.nn as nn\n\nclass SimpleNet(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.flatten = nn.Flatten()\n        self.layers = nn.Sequential(\n            nn.Linear(28*28, 512),\n            nn.ReLU(),\n            nn.Linear(512, 10)\n        )\n\n    def forward(self, x):\n        return self.layers(self.flatten(x))'
                    }
                ],
                practiceQuestions: [
                    { question: 'What is the "Vanishing Gradient" problem?', hint: 'Gradients become so small that the model stops learning.', difficulty: 'hard' },
                    { question: 'Explain why we use non-linear activation functions.', hint: 'To allow the network to learn complex, non-linear patterns.', difficulty: 'medium' },
                    { question: 'What is the role of "Dropout" in deep learning?', hint: 'Prevents overfitting by randomly disabling neurons during training.', difficulty: 'medium' },
                    { question: 'Contrast "Forward Propagation" and "Backpropagation".', hint: 'Calculating output vs Updating weights based on error.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always normalize your input data to speed up convergence.',
                    'Use "Batch Normalization" to stabilize training in deep networks.',
                    'Start with pre-trained models (Transfer Learning) whenever possible.',
                    'Monitor gradient norms to detect vanishing or exploding gradients.',
                    'Use learning rate schedulers to fine-tune the training process.',
                    'Keep your validation set completely separate from your hyperparameter tuning.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Neural Network Basics', description: 'Build your first neural network.', tasks: ['Understand neurons, layers, and activation functions', 'Forward propagation and backpropagation', 'Build a neural network with PyTorch'] },
                { day: 2, title: 'CNNs & RNNs', description: 'Specialized architectures.', tasks: ['Convolutional layers, pooling, and image classification', 'RNNs and LSTMs for sequential data', 'Transfer learning with pre-trained models'] },
            ]
        },
        'pytorch': { id: 'pytorch', label: 'PyTorch / TensorFlow', description: 'Deep learning frameworks for building and training neural networks. PyTorch is popular in research; TensorFlow in production.', parentId: 'deep-learning', resources: [{ type: 'documentation', title: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/', isFree: true }] },
        'cnn-cv': { id: 'cnn-cv', label: 'Computer Vision', description: 'Image classification, object detection (YOLO), segmentation, and GANs using CNNs.', parentId: 'deep-learning', resources: [{ type: 'course', title: 'CS231n - Stanford', url: 'https://cs231n.stanford.edu/', isFree: true }] },
        'nlp-llm': {
            id: 'nlp-llm',
            label: 'NLP & LLMs',
            description: 'Mastering the revolutionary field of Natural Language Processing and Large Language Models using Transformer architectures.',
            parentId: 'ai-ml',
            children: ['transformers', 'prompt-eng'],
            resources: [
                { type: 'course', title: 'Hugging Face - NLP Course', url: 'https://huggingface.co/learn/nlp-course/', isFree: true },
                { type: 'video', title: 'Stanford CS224N: NLP with Deep Learning', url: 'https://web.stanford.edu/class/cs224n/', isFree: true },
                { type: 'article', title: 'The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', isFree: true },
                { type: 'documentation', title: 'OpenAI - Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering', isFree: true },
                { type: 'course', title: 'Generative AI with LLMs (DeepLearning.AI)', url: 'https://www.coursera.org/learn/generative-ai-with-llms', isFree: false }
            ],
            content: {
                overview: 'Natural Language Processing (NLP) is a subfield of AI focused on the interaction between computers and human language. The field has been completely transformed by the introduction of the Transformer architecture and Large Language Models (LLMs) like GPT, Claude, and Llama. \n\nModern NLP involves understanding tokenization, causal vs masked self-attention, and the "Scaling Laws" that govern model performance. As an AI Engineer, you must know how to choose the right model for a task, whether to use Prompt Engineering, Retrieval-Augmented Generation (RAG), or Fine-tuning to optimize performance for specific use cases.',
                keyConcepts: [
                    'Tokenization: Byte-Pair Encoding (BPE) and WordPiece',
                    'Self-Attention: How models weight the importance of different words',
                    'Transformer Architecture: Encoder-only, Decoder-only, and Encoder-Decoder',
                    'LLM Training: Pre-training, SFT (Supervised Fine-Tuning), and RLHF',
                    'RAG: Retrieval-Augmented Generation using Vector Databases',
                    'Prompt Engineering: Few-shot, Chain-of-Thought, and ReAct patterns',
                    'Quantization and PEFT: LoRA, QLoRA for efficient model deployment',
                    'Evaluation Metrics: BLEU, ROUGE, and LLM-as-a-judge'
                ],
                practiceQuestions: [
                    { question: 'What is the main advantage of the Transformer architecture over RNNs?', hint: 'Parallelization and long-range dependencies.', difficulty: 'hard' },
                    { question: 'Explain the difference between Zero-shot and Few-shot prompting.', hint: 'No examples vs A few examples provided in the prompt.', difficulty: 'easy' },
                    { question: 'What is "Temperature" in LLM sampling?', hint: 'Controls randomness/creativity of the output.', difficulty: 'medium' },
                    { question: 'Why is "RAG" preferred over "Fine-tuning" for private data updates?', hint: 'RAG is dynamic and doesn\'t require retraining.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always start with Prompt Engineering before committing to Fine-tuning.',
                    'Use "Chain-of-Thought" prompting for complex reasoning tasks.',
                    'Implement robust input/output filtering to prevent prompt injection.',
                    'Validate RAG performance using Ground Truth datasets and retrieval metrics.',
                    'Monitor token usage and latency carefully in production.',
                    'Be aware of "Hallucination" risks and implement verification steps.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'NLP Fundamentals', description: 'Text processing and embeddings.', tasks: ['Tokenization, stemming, and lemmatization', 'Word embeddings (Word2Vec, GloVe)', 'Text classification with transformers'] },
                { day: 2, title: 'LLMs & RAG', description: 'Working with large language models.', tasks: ['Fine-tune a model with Hugging Face', 'Build a RAG pipeline with LangChain', 'Deploy an AI chatbot with OpenAI API'] },
            ]
        },
        'transformers': { id: 'transformers', label: 'Transformers', description: 'The attention mechanism and transformer architecture that powers BERT, GPT, and modern NLP.', parentId: 'nlp-llm', resources: [{ type: 'article', title: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762', isFree: true }] },
        'prompt-eng': { id: 'prompt-eng', label: 'Prompt Engineering', description: 'Design effective prompts for LLMs. Zero-shot, few-shot, chain-of-thought, and system prompts.', parentId: 'nlp-llm', resources: [{ type: 'article', title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', isFree: true }] },
    }
};
