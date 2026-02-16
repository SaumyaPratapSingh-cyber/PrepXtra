// Data Science Lifecycle Seed Data
export const dataScienceLifecycleTopics = [
    {
        title: "Data Sourcing & Strategy",
        slug: "data-sourcing-strategy",
        description: "How to identify, gather, and validate data for high-impact projects.",
        order: 1, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Data Sourcing & Strategy

Data is the most valuable asset in the modern world, but only if it's the right data.

## 1. Defining Data Strategy
- **Internal Data**: CRM, Transaction logs, App usage.
- **External Data**: Purchased datasets (Nielsen, Bloomberg).
- **Public Data**: Web scraping, Open-source sets (Kaggle, Government portals).

## 2. Scraping vs APIs
- **APIs**: The preferred, legal way to get data from platforms (Twitter, Google Maps).
- **Web Scraping**: Extracting data from HTML. Requires careful handling of \`robots.txt\` and legal compliance.

## 3. Data Labeling Strategy
- **In-house**: Experts labeling data (High quality, high cost).
- **Crowdsourcing**: Amazon Mechanical Turk (Scale, but variable quality).
- **Synthetic Data**: Using models to generate training data for other models.

## 4. Sampling Strategy
- **Random Sampling**: Every point has an equal chance.
- **Stratified Sampling**: Ensuring sub-groups (e.g., Men vs Women) are represented proportionally.
- **Bootstrapping**: Sampling with replacement to create multiple simulated datasets.
`, resources: []
    },
    {
        title: "Data Quality Management",
        slug: "data-quality-management",
        description: "The six dimensions of data quality and validation pipelines.",
        order: 2, estimatedMinutes: 45, difficulty: "Medium",
        content: `
# Data Quality Management

"Bad data is worse than no data."

## 1. The Six Dimensions of Quality
1. **Accuracy**: Does it reflect reality?
2. **Completeness**: Are there missing values?
3. **Consistency**: Is the same info identical across tables?
4. **Timeliness**: Is it up-to-date?
5. **Validity**: Does it follow the defined format (e.g., Email must have @)?
6. **Uniqueness**: Are there duplicates?

## 2. Data Observability
Monitoring the "Health" of the data pipeline.
- **Volume**: Did we suddenly stop receiving records?
- **Freshness**: Is the data 2 days old when it should be real-time?
- **Schema**: Did a developer change a column name and break the pipeline?

## 3. Automated Validation
- **Great Expectations**: A Python library to define and test data quality.
- **DBT Tests**: Running SQL-based validations during the ETL process.
`, resources: []
    },
    {
        title: "Deep Learning Training Cycle",
        slug: "dl-training-cycle",
        description: "Backpropagation, Epochs, Batches, and GPU optimization.",
        order: 3, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Deep Learning Training Cycle

## 1. Batches and Epochs
- **Batch Size**: Number of training examples handled in one forward/backward pass.
    - *Large*: Stable gradients but needs more memory.
    - *Small*: Noisy gradients but generalize better.
- **Epoch**: One complete pass through the ENTIRE dataset.

## 2. Gradient Descent Variants
- **Stochastic (SGD)**: One sample at a time.
- **Mini-Batch**: The middle ground (standard).
- **Adam**: Adaptive learning rate.

## 3. GPU/TPU Acceleration
Deep learning relies on massive matrix multiplication.
- **Nvidia CUDA**: The software layer that lets code run on GPUs.
- **Data Parallelism**: Splitting the dataset across 8 GPUs to train faster.

## 4. Hyperparameter Tuning
Searching for the best:
- Learning Rate.
- Number of layers.
- Dropout rate.
- Activation functions.
`, resources: []
    },
    {
        title: "NLP Model Lifecycle",
        slug: "nlp-model-lifecycle",
        description: "Text collection, fine-tuning LLMs, and evaluation.",
        order: 4, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# NLP Model Lifecycle

## 1. Text Sourcing
Cleaning noise (HTML tags, emojis, ads) from raw text before training.

## 2. Tokenization & Vocab
- **Subword Tokenization (BPE)**: Breaking "Running" into "Run" and "ning".
- **Vocab Size**: A trade-off between memory and expressive power.

## 3. Fine-Tuning Strategies
- **Full Fine-tuning**: Training all billions of parameters (Expensive).
- **LoRA (Low-Rank Adaptation)**: Only training 1% of the model for a specific task.
- **Prompt Engineering**: The "No-Training" approach.

## 4. Evaluation for Text
- **BLEU / ROUGE**: Measuring how close the AI text is to a human reference.
- **Perplexity**: How "confused" the model is by the text (lower is better).
`, resources: []
    },
    {
        title: "Computer Vision Workflow",
        slug: "cv-workflow",
        description: "Image processing, annotation, and augmentation.",
        order: 5, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Computer Vision Workflow

## 1. Pre-processing
- **Resizing**: All images must be the same size (e.g., 224x224) for the CNN.
- **Normalization**: Scaling pixel values from [0-255] to [0-1].

## 2. Data Augmentation
Artificially increasing the dataset by modifying existing images:
- Rotation, Flipping, Cropping.
- Changing brightness/contrast.
- Adding noise.
- *Why?* Prevents the model from "memorizing" specific photos.

## 3. Annotation Tools
Labeling objects with bounding boxes or polygons.
- **CVAT**, **LabelImg**, **Roboflow**.

## 4. Inference Speed
In CV, "Real-time" is often required (e.g., Security cameras). This requires optimizing models using **TensorRT** or **ONNX**.
`, resources: []
    },
    {
        title: "Experiment Tracking (MLflow)",
        slug: "experiment-tracking",
        description: "Managing 100s of model versions and hyperparameters.",
        order: 6, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Experiment Tracking

In Data Science, you'll run hundreds of experiments. Tracking them in Excel is impossible.

## 1. What to track?
- Code version (Git Hash).
- Data version (DVC version).
- Hyperparameters.
- Metrics (Accuracy, Loss, F1).
- The resulting Model file (.pkl, .pt).

## 2. Popular Tools
- **MLflow**: Open-source, works locally or on cloud.
- **Weights & Biases (W&B)**: Professional, great for visualizing training curves.
- **Comet.ml**.

## 3. Reproducibility
The gold standard. If a teammate can't recreate your result using your tracked parameters, the experiment failed.
`, resources: []
    },
    {
        title: "Hyperparameter Optimization",
        slug: "hyperparameter-optimization",
        description: "Grid search, Random search, and Bayesian optimization.",
        order: 7, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Hyperparameter Optimization (HPO)

## 1. Grid Search
Exhaustively trying every possible combination.
- **Pros**: Guaranteed to find the best in the grid.
- **Cons**: Extremely slow.

## 2. Random Search
Picking random combinations from the search space.
- **Pros**: Much faster, often finds the same or better results as Grid Search.

## 3. Bayesian Optimization (Optuna/Hyperopt)
Uses a probabilistic model to guestimate which hyperparameters will perform well based on past trials. It "learns" where to search.

## 4. Automated ML (AutoML)
Tools like **H2O.ai** or **Google AutoML** that automate the entire HPO and algorithm selection process.
`, resources: []
    },
    {
        title: "Feature Stores",
        slug: "feature-stores",
        description: "Centralized storage for ML features in production.",
        order: 8, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Feature Stores

When multiple teams build models, they often waste time re-calculating the same features (e.g., "User's 7-day average spend").

## 1. The Core Benefits
- **Feature Reuse**: Compute once, use in 10 models.
- **Consistency**: Ensures the code used to compute a feature during training is IDENTICAL to the code used during production (Avoids training-serving skew).
- **Point-in-time Joins**: Getting the data as it looked two months ago for a historical simulation.

## 2. Architecture
- **Offline Store**: High-volume, for batch training (S3, BigQuery).
- **Online Store**: Ultra-low latency, for real-time predictions (Redis, DynamoDB).

## 3. Popular Tools
- **Feast** (Open Source).
- **Tecton** (Managed).
`, resources: []
    },
    {
        title: "Scaling machine Learning",
        slug: "scaling-ml",
        description: "Spark, Dask, and Distributed Training.",
        order: 9, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Scaling Machine Learning

When your data is too big for your laptop's RAM.

## 1. Scale-Up vs Scale-Out
- **Scale-Up (Vertical)**: Buying a bigger server (more RAM/CPU).
- **Scale-Out (Horizontal)**: Using a cluster of 100 small servers.

## 2. Distributed Computing Frameworks
- **Apache Spark**: The industry standard for big data processing. **PySpark** lets you use Python logic across clusters.
- **Dask**: A Python-native library for parallel computing and handling large arrays.

## 3. Distributed Training
- **Horovod / Ray**: Spreading the training of a single deep learning model across many machines.

## 4. Cloud Native Scaling
Using **AWS SageMaker**, **Google Vertex AI**, or **Azure ML** to spin up massive computing resources instantly when needed and shut them down after.
`, resources: []
    },
    {
        title: "Model Deployment (Serving)",
        slug: "model-deployment-serving",
        description: "APIs, Docker, and Batch vs Real-time serving.",
        order: 10, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Model Deployment

Bringing your model to the users.

## 1. Deployment Types
- **Batch Serving**: Running the model on 1M rows every night (e.g., Credit scoring).
- **Real-time Serving**: Predicting via an API request (e.g., Recommendation when you open the app).
- **Embedded/Edge**: Running the model inside the user's phone or a CCTV camera (Low latency, privacy).

## 2. The Serving Stack
- **API Frameworks**: FastAPI (fastest/most modern), Flask.
- **Model Servers**: NVIDIA Triton, TensorFlow Serving, TorchServe.

## 3. Containerization (Docker)
Wrapping the model, code, and libraries into a single "Image" that runs exactly the same everywhere.

## 4. Load Balancing
Spreading user requests across many model instances to handle high traffic without crashing.
`, resources: []
    },
    {
        title: "Model Monitoring & Observability",
        slug: "model-monitoring",
        description: "Tracking drift, performance decay, and retraining.",
        order: 11, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Model Monitoring

Models age like milk, not like wine. They get worse over time.

## 1. What to Monitor?
- **Operational Metrics**: Latency (ms), Throughput (req/sec), Error rate.
- **Performance Metrics**: Does accuracy/F1 drop over time?
- **Business Metrics**: Is the model still making money or saving time?

## 2. Drift Detection
- **Data Drift**: The input features are changing (e.g., new user demographics).
- **Concept Drift**: The actual relationship we are modeling has changed.

## 3. Retraining Strategies
- **Scheduled**: Every week/month.
- **Trigger-based**: Retrain immediately if accuracy drops below 80%.

## 4. Explainability Monitoring
Tracking if the model is suddenly relying more on "protected" features like Gender or Age, indicating bias.
`, resources: []
    },
    {
        title: "CI/CD/CT for Machine Learning",
        slug: "ml-cicd-ct",
        description: "Continuous integration, delivery, and training.",
        order: 12, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# CI/CD/CT for ML

Traditional DevOps is CI/CD (Code and Deployment). MLOps adds **CT** (Continuous Training).

## 1. Pipeline Automation
When code is pushed or data is updated:
1. **CI**: Run unit tests on code and data validation tests.
2. **Train**: Automatically start a training job on Cloud.
3. **CD**: Deploy the best model to a staging environment.
4. **Evaluate**: Compare against the current production model.

## 2. A/B Testing Models
**Canary Deployment**: Send 5% of real traffic to the new model and 95% to the old one. If the new one does well, ramp up to 100%.

## 3. Tools
- **GitHub Actions**.
- **Kubeflow Pipelines**.
- **TFX (TensorFlow Extended)**.
`, resources: []
    },
    {
        title: "Data Privacy & Compliance",
        slug: "data-privacy-compliance",
        description: "GDPR, HIPAA, and anonymization techniques.",
        order: 13, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Data Privacy and Compliance

## 1. Global Regulations
- **GDPR** (Europe): Right to be forgotten, Right to explanation.
- **HIPAA** (USA): Strict rules for medical/health data.

## 2. Privacy-Preserving ML
- **Differential Privacy**: Adding noise to the data so individual records cannot be identified, but the statistical patterns remain.
- **Federated Learning**: The model goes to the data (e.g., your phone), rather than the data coming to the model.

## 3. Data Anonymization
- **Masking**: Hiding parts of data (\`XXX-XX-1234\`).
- **Pseudonymization**: Replacing names with unique IDs.
- **K-Anonymity**: Ensuring every row in a dataset is identical to at least $k-1$ other rows for sensitive attributes.

## 4. Audit Logs
Keeping a record of WHO accessed WHAT data and WHEN. Essential for compliance.
`, resources: []
    },
    {
        title: "Responsible AI & Fairness",
        slug: "responsible-ai",
        description: "Mitigating bias and ensuring ethical AI decisions.",
        order: 14, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Responsible AI

## 1. Why Bias happens?
If a historical dataset for bank loans has fewer women approved, the AI will "learn" to be biased against women.

## 2. Fairness Metrics
- **Demographic Parity**: The same percentage of people from all groups should be approved.
- **Equality of Opportunity**: All people who *actually deserve* a loan should have the same probability of geting it, regardless of group.

## 3. Bias Mitigation
- **Pre-processing**: Balancing the dataset before training.
- **In-processing**: Adding a "Fairness Penalty" to the loss function.
- **Post-processing**: Adjusting thresholds for different groups to ensure fairness.

## 4. Transparency
Providing "Human-in-the-loop" oversight for high-risk decisions (Hiring, Lending, Policing).
`, resources: []
    },
    {
        title: "Advanced Ensembling (Stacking)",
        slug: "advanced-ensembling",
        description: "Meta-learners, stacking, and blending strategies.",
        order: 15, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Advanced Ensembling

## 1. Stacking (Stacked Generalization)
1. Train multiple **Base Models** (e.g., SVM, Random Forest, XGBoost).
2. Take their outputs and use them as inputs for a **Meta-Model** (usually Logistic Regression).
3. The Meta-model learns WHICH base model to trust for which kinds of data point.

## 2. Blending
Similar to stacking, but uses a hold-out (validation) set to train the meta-model, preventing leakage.

## 3. Why it's used?
This is the "Secret Sauce" for winning **Kaggle** competitions. It almost always results in a small accuracy boost over a single model.

## 4. The Complexity Trade-off
Ensembles are hard to maintain and interpret. In industry, a single well-tuned XGBoost is often preferred over a complex 10-model stack.
`, resources: []
    },
    {
        title: "Transfer Learning & Foundation Models",
        slug: "transfer-learning",
        description: "Reusing pre-trained models for custom tasks.",
        order: 16, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Transfer Learning

"Don't start from scratch."

## 1. The Concept
Take a model trained on a massive dataset (e.g., ImageNet with 1M images) and "Fine-tune" it on your small dataset (e.g., 500 photos of medical X-rays).

## 2. Why it works?
The first layers of a CNN learn "General" features (Edges, Curves, Textures) which are useful for ANY image task. We keep these and only retrain the last few layers.

## 3. Foundation Models
Models like **GPT-4**, **CLIP**, and **Stable Diffusion** that serve as a base for thousands of different applications.

## 4. NLP Applications
Using **BERT** or **RoBERTa** as a starting point for sentiment analysis or document classification.
`, resources: []
    },
    {
        title: "Knowledge Distillation",
        slug: "knowledge-distillation",
        description: "Compressing big models into smaller, faster ones.",
        order: 17, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Knowledge Distillation

## 1. Teacher vs Student
- **Teacher**: A massive, accurate model (Expensive).
- **Student**: A small, fast model (Cheap).

## 2. The Process
The student model is trained to match the **outputs** (probabilities) of the teacher model. It learns the "essence" of what the teacher knows.

## 3. Use Case: DistilBERT
A version of BERT that is 40% smaller and 60% faster while keeping 97% of the original performance.

## 4. Benefits
- Run AI on smartphones.
- Lower server costs.
- Reduced latency.
`, resources: []
    },
    {
        title: "Edge AI & Optimization",
        slug: "edge-ai",
        description: "Running ML on hardware with limited resources.",
        order: 18, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Edge AI

Running AI locally on the "Edge" (Smartphones, IoT devices, Industrial sensors).

## 1. Why Edge?
- **Speed**: No round-trip to a cloud server.
- **Privacy**: Data never leaves the device.
- **Offline**: Works without internet.

## 2. Optimization Techniques
- **Quantization**: Changing 32-bit floats to 8-bit integers (Drastically reduces size with minimal accuracy loss).
- **Pruning**: Deleting neuron connections that have weights close to zero.

## 3. Hardware Accelerators
- **Apple Neural Engine (ANE)**.
- **Nvidia Jetson**.
- **Coral TPUs**.

## 4. Frameworks
- **TensorFlow Lite**.
- **PyTorch Mobile**.
`, resources: []
    },
    {
        title: "Recommendation Lifecycle",
        slug: "recommender-lifecycle",
        description: "Cold start, feedback loops, and deployment metrics.",
        order: 19, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Recommendation Systems in Production

## 1. The Cold Start Problem
- **New User**: We don't know what they like (Solve by showing "Popular" items or asking for preferences).
- **New Item**: No one has rated it yet (Solve by using Content-Based tagging).

## 2. Exploitation vs Exploration
Does the algorithm show what you like (Exploitation) or try to introduce you to new styles (Exploration) to keep the app fresh?

## 3. Real-time Re-ranking
Retrieving 1,000 potential items and using a fast model to rank the top 10 for the user in milliseconds.

## 4. Evaluation Metrics
- **CTR (Click Through Rate)**.
- **MRR (Mean Reciprocal Rank)**: Is the first item relevant?
- **Diversity**: Are we only showing the user the same 3 artists?
`, resources: []
    },
    {
        title: "Industry Case Studies",
        slug: "ds-case-studies",
        description: "Real-world applications across different domains.",
        order: 20, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Data Science Case Studies

## 1. FinTech: Fraud Detection
Using anomaly detection to spot credit card transactions that don't match a user's geographical and spending profile.

## 2. HealthTech: Disease Prediction
Analyzing retinal scans or X-rays to find early signs of cancer with higher accuracy than human radiologists in some specific cases.

## 3. E-Commerce: Dynamic Pricing
Adjusting prices in real-time based on competitor prices, stock levels, and user demand (Used by Amazon and Uber).

## 4. Social Media: Content Moderation
Detecting hate speech and illegal content across millions of posts per minute using a combination of NLP and Computer Vision.

## 5. Transportation: Predictive Maintenance
Airlines monitor engine sensors to predict when a part might fail *before* it happens, preventing delays and accidents.
`, resources: []
    }
];
