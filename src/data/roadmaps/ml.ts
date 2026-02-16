
import { RoadmapTrack } from './types';

export const mlRoadmap: RoadmapTrack = {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Master the fundamentals of machine learning and deep learning',
    category: 'skill-based',
    icon: '🧠',
    accentColor: '#ff6f00',
    rootNodeId: 'ml-root',
    nodes: {
        'ml-root': {
            id: 'ml-root',
            label: 'Machine Learning Mastery',
            description: 'Learn to build, train, and deploy machine learning models.',
            children: ['ml-foundations', 'ml-supervised', 'ml-unsupervised', 'ml-deep-learning', 'ml-deployment'],
            resources: [
                { type: 'course', title: 'Machine Learning by Andrew Ng (Coursera)', url: 'https://www.coursera.org/learn/machine-learning', isFree: true },
                { type: 'video', title: 'StatQuest with Josh Starmer', url: 'https://www.youtube.com/c/joshstarmer', isFree: true },
                { type: 'article', title: 'Hands-On ML with Scikit-Learn (Book)', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125974/', isFree: false },
                { type: 'documentation', title: 'Scikit-learn Documentation', url: 'https://scikit-learn.org/', isFree: true }
            ],
            content: {
                overview: 'Machine Learning is a subfield of artificial intelligence where computers learn patterns from data instead of being explicitly programmed. Instead of writing rules like "if temperature > 30, then hot", an ML model figures out these rules by analyzing thousands of examples. ML is divided into three main categories: supervised learning (predicting labels from labeled data), unsupervised learning (finding hidden patterns in unlabeled data), and reinforcement learning (learning by trial and error). The typical ML workflow involves collecting data, preprocessing it, choosing a model, training it, evaluating performance, tuning hyperparameters, and deploying the model. Python is the dominant language for ML, with libraries like scikit-learn, TensorFlow, PyTorch, and pandas.',
                keyConcepts: [
                    'Supervised vs unsupervised vs reinforcement learning',
                    'Features, labels, training data, and test data',
                    'Training, validation, and test splits',
                    'Overfitting and underfitting',
                    'Bias-variance tradeoff',
                    'Cross-validation for robust evaluation',
                    'Feature engineering and selection',
                    'Model evaluation metrics: accuracy, precision, recall, F1'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between supervised and unsupervised learning?', hint: 'Supervised: you have labeled data (input-output pairs). Unsupervised: you only have input data and discover hidden patterns.', difficulty: 'easy' },
                    { question: 'What is overfitting?', hint: 'When a model learns the training data too well (memorizes noise) and performs poorly on new, unseen data.', difficulty: 'easy' },
                    { question: 'What is the bias-variance tradeoff?', hint: 'High bias = too simple (underfitting). High variance = too complex (overfitting). Good models balance both.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Always split data into training and test sets before any modeling.',
                    'Start with simple models (linear regression, decision trees) before jumping to deep learning.',
                    'Use cross-validation for reliable performance estimates.',
                    'Spend more time on data quality and feature engineering than on model selection.',
                    'Visualize your data extensively before modeling.',
                    'Document your experiments: what you tried, what worked, what did not.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Math and Data Foundations', description: 'Prerequisites and data handling.', tasks: ['Review linear algebra basics: vectors, matrices, dot products', 'Learn pandas for data manipulation', 'Visualize data with matplotlib and seaborn'] },
                { day: 2, title: 'Supervised Learning', description: 'Classification and regression.', tasks: ['Build a linear regression model with scikit-learn', 'Train a classification model (decision tree, random forest)', 'Evaluate models with accuracy, precision, recall, and confusion matrix'] },
                { day: 3, title: 'Neural Networks', description: 'Introduction to deep learning.', tasks: ['Understand how a neural network learns (forward pass, backpropagation)', 'Build a simple neural network with TensorFlow/Keras', 'Train a model on the MNIST handwritten digits dataset'] }
            ]
        },
        'ml-foundations': {
            id: 'ml-foundations',
            label: 'Math & Data Foundations',
            description: 'Linear algebra, statistics, probability, and data preprocessing with Python.',
            parentId: 'ml-root',
            resources: [
                { type: 'video', title: '3Blue1Brown Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', isFree: true },
                { type: 'course', title: 'Khan Academy Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', isFree: true }
            ],
            content: {
                overview: 'ML is built on mathematics and data. Linear algebra (vectors, matrices, matrix multiplication) is how data is represented and transformed. Statistics and probability are how models make predictions and quantify uncertainty. Calculus (gradients and optimization) is how models learn. In practice, you use Python libraries that handle the math: NumPy for numerical computing, pandas for data manipulation (DataFrames, cleaning, grouping), matplotlib/seaborn for visualization, and scikit-learn for preprocessing. Data preprocessing is often 80% of an ML project: handling missing values, encoding categorical variables, normalizing features, and detecting outliers. Clean data is far more important than a fancy algorithm.',
                keyConcepts: [
                    'Vectors, matrices, and matrix multiplication',
                    'Mean, median, standard deviation, variance',
                    'Probability distributions: normal, uniform, Bernoulli',
                    'Correlation vs causation',
                    'NumPy for numerical arrays and operations',
                    'pandas DataFrames for tabular data',
                    'Handling missing values: imputation and removal',
                    'Feature scaling: normalization vs standardization'
                ],
                practiceQuestions: [
                    { question: 'Why is feature scaling important?', hint: 'Many algorithms (SVM, KNN, neural networks) are sensitive to feature magnitudes. Scaling ensures all features contribute equally.', difficulty: 'medium' },
                    { question: 'What is the difference between normalization and standardization?', hint: 'Normalization scales to [0,1]. Standardization transforms to mean=0, std=1.', difficulty: 'medium' },
                    { question: 'What does correlation tell you vs causation?', hint: 'Correlation shows two variables move together. Causation means one causes the other. Correlation does not imply causation.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Learn the math concepts before using the libraries.',
                    'Always explore your data with summary statistics and plots before modeling.',
                    'Handle missing values explicitly — do not ignore them.',
                    'Use pandas profiling for quick data quality reports.'
                ]
            }
        },
        'ml-supervised': {
            id: 'ml-supervised',
            label: 'Supervised Learning',
            description: 'Regression, classification, decision trees, ensemble methods, and evaluation.',
            parentId: 'ml-root',
            resources: [
                { type: 'documentation', title: 'Scikit-learn Supervised Learning', url: 'https://scikit-learn.org/stable/supervised_learning.html', isFree: true }
            ],
            content: {
                overview: 'Supervised learning is the most common type of ML. You have input features (X) and known labels (y), and the model learns a function that maps X to y. Regression predicts continuous values (house prices, temperature) — common models include linear regression, polynomial regression, and gradient boosted trees. Classification predicts discrete categories (spam/not spam, disease/healthy) — common models include logistic regression, decision trees, random forests, gradient boosting (XGBoost, LightGBM), and support vector machines (SVM). Ensemble methods (random forests and gradient boosting) combine multiple weak models into a strong one and are often the top performers in practice. Model evaluation uses different metrics for regression (MAE, MSE, R-squared) and classification (accuracy, precision, recall, F1-score, AUC-ROC).',
                keyConcepts: [
                    'Linear regression: cost function, gradient descent',
                    'Logistic regression for binary classification',
                    'Decision trees: splitting criteria (Gini, entropy)',
                    'Random forests: bagging multiple decision trees',
                    'Gradient boosting: XGBoost, LightGBM, CatBoost',
                    'Support vector machines (SVM)',
                    'K-nearest neighbors (KNN)',
                    'Evaluation: precision, recall, F1, AUC-ROC, confusion matrix'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between precision and recall?', hint: 'Precision: of all predicted positives, how many were actually positive? Recall: of all actual positives, how many were predicted?', difficulty: 'medium' },
                    { question: 'Why are ensemble methods (random forests, XGBoost) so effective?', hint: 'They combine many weaker models to reduce variance and overfitting, often outperforming any single model.', difficulty: 'medium' },
                    { question: 'When would you use a regression model vs a classification model?', hint: 'Regression for continuous outputs (salary prediction). Classification for discrete categories (email spam detection).', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Start with a simple baseline model before trying complex ones.',
                    'Use cross-validation, not a single train/test split.',
                    'Choose evaluation metrics that match your business problem.',
                    'Tune hyperparameters with GridSearchCV or RandomizedSearchCV.',
                    'Consider gradient boosting libraries (XGBoost, LightGBM) for tabular data.'
                ]
            }
        },
        'ml-unsupervised': {
            id: 'ml-unsupervised',
            label: 'Unsupervised Learning',
            description: 'Clustering, dimensionality reduction, and anomaly detection.',
            parentId: 'ml-root',
            resources: [
                { type: 'documentation', title: 'Scikit-learn Unsupervised Learning', url: 'https://scikit-learn.org/stable/unsupervised_learning.html', isFree: true }
            ],
            content: {
                overview: 'Unsupervised learning finds hidden patterns in data without labels. Clustering groups similar data points together — K-Means assigns each point to the nearest of K centroids, DBSCAN finds clusters of varying shapes based on density, and hierarchical clustering builds a tree of nested clusters. Dimensionality reduction simplifies data by reducing the number of features while preserving important information — PCA (Principal Component Analysis) finds the directions of maximum variance, and t-SNE/UMAP create 2D/3D visualizations of high-dimensional data. Anomaly detection identifies unusual data points (fraud detection, equipment failure). These techniques are also used for data exploration and as preprocessing steps before supervised learning.',
                keyConcepts: [
                    'K-Means clustering: centroids and the elbow method',
                    'DBSCAN: density-based clustering',
                    'Hierarchical clustering and dendrograms',
                    'PCA: Principal Component Analysis',
                    't-SNE and UMAP for visualization',
                    'Anomaly detection: Isolation Forest, One-Class SVM',
                    'Silhouette score for cluster evaluation',
                    'Association rules: market basket analysis'
                ],
                practiceQuestions: [
                    { question: 'How do you choose the number of clusters (K) in K-Means?', hint: 'Use the elbow method (plot inertia vs K) or the silhouette score to find the optimal K.', difficulty: 'medium' },
                    { question: 'What is the difference between K-Means and DBSCAN?', hint: 'K-Means needs you to specify K and finds spherical clusters. DBSCAN finds clusters of any shape and identifies noise points.', difficulty: 'medium' },
                    { question: 'What is PCA used for?', hint: 'Reducing the number of features while keeping as much variance as possible — useful for visualization and speeding up training.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Scale features before clustering (most algorithms are distance-based).',
                    'Visualize clusters in 2D with PCA or t-SNE to validate results.',
                    'Try multiple clustering algorithms — there is no universal best.',
                    'Use domain knowledge to interpret clusters meaningfully.'
                ]
            }
        },
        'ml-deep-learning': {
            id: 'ml-deep-learning',
            label: 'Deep Learning',
            description: 'Neural networks, CNNs, RNNs, transformers, and training techniques.',
            parentId: 'ml-root',
            resources: [
                { type: 'course', title: 'Deep Learning Specialization - Andrew Ng', url: 'https://www.coursera.org/specializations/deep-learning', isFree: false },
                { type: 'documentation', title: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/', isFree: true }
            ],
            content: {
                overview: 'Deep learning uses artificial neural networks with many layers to learn complex patterns. A neural network consists of layers of neurons (nodes) connected by weighted edges. Training involves forward propagation (computing predictions), calculating a loss function (how wrong predictions are), and backpropagation (adjusting weights using gradients). Convolutional Neural Networks (CNNs) are specialized for images — they use filters that scan across the image to detect features like edges, textures, and shapes. Recurrent Neural Networks (RNNs) and LSTMs handle sequential data (text, time series). Transformers are the architecture behind modern AI breakthroughs (GPT, BERT) — they use attention mechanisms to process sequences in parallel. TensorFlow/Keras and PyTorch are the two major deep learning frameworks.',
                keyConcepts: [
                    'Neurons, layers, weights, and biases',
                    'Activation functions: ReLU, sigmoid, softmax',
                    'Loss functions: MSE, cross-entropy',
                    'Backpropagation and gradient descent (SGD, Adam)',
                    'Convolutional Neural Networks (CNNs) for images',
                    'Recurrent Neural Networks (RNNs) and LSTMs for sequences',
                    'Transformers and self-attention mechanism',
                    'Regularization: dropout, batch normalization, early stopping'
                ],
                practiceQuestions: [
                    { question: 'What is backpropagation?', hint: 'The algorithm that calculates how much each weight contributed to the error and adjusts them accordingly, working backward through the network.', difficulty: 'medium' },
                    { question: 'Why did transformers replace RNNs for most NLP tasks?', hint: 'Transformers process sequences in parallel (faster) and use attention to model long-range dependencies better than RNNs.', difficulty: 'hard' },
                    { question: 'What is dropout?', hint: 'A regularization technique that randomly deactivates neurons during training to prevent overfitting.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use pre-trained models and fine-tune them (transfer learning) instead of training from scratch.',
                    'Start with a small network and increase complexity only if needed.',
                    'Monitor training and validation loss to detect overfitting early.',
                    'Use GPU acceleration (CUDA) for training — deep learning on CPU is very slow.',
                    'Use data augmentation to increase training data diversity.'
                ]
            }
        },
        'ml-deployment': {
            id: 'ml-deployment',
            label: 'MLOps & Deployment',
            description: 'Model serving, experiment tracking, pipelines, and production ML.',
            parentId: 'ml-root',
            resources: [
                { type: 'documentation', title: 'MLflow', url: 'https://mlflow.org/', isFree: true },
                { type: 'article', title: 'Google ML Engineering Practices', url: 'https://developers.google.com/machine-learning/guides/rules-of-ml', isFree: true }
            ],
            content: {
                overview: 'Training a model is only half the work — deploying it to production where real users can make predictions is the other half. Model serving exposes your trained model as an API endpoint using Flask, FastAPI, or TensorFlow Serving. Experiment tracking with MLflow or Weights & Biases logs hyperparameters, metrics, and artifacts so you can reproduce and compare experiments. ML pipelines automate the entire workflow: data ingestion, preprocessing, training, evaluation, and deployment. Model monitoring in production tracks prediction quality (data drift, concept drift) to detect when a model needs retraining. Docker containers and cloud platforms (AWS SageMaker, Google Vertex AI, Azure ML) provide infrastructure for deploying and scaling ML models.',
                keyConcepts: [
                    'Model serialization: pickle, joblib, ONNX, SavedModel',
                    'REST API serving with Flask or FastAPI',
                    'Experiment tracking: MLflow, Weights & Biases',
                    'ML pipelines: data -> train -> evaluate -> deploy',
                    'Model versioning and A/B testing',
                    'Data drift and concept drift monitoring',
                    'Docker containers for reproducible ML environments',
                    'Cloud ML platforms: SageMaker, Vertex AI, Azure ML'
                ],
                practiceQuestions: [
                    { question: 'What is data drift?', hint: 'When the statistical properties of incoming data change over time compared to the training data, degrading model performance.', difficulty: 'medium' },
                    { question: 'Why is experiment tracking important?', hint: 'Without it, you cannot reproduce results, compare different approaches, or know which model version is deployed.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Track every experiment from day one, not just the "final" model.',
                    'Version your datasets alongside your models.',
                    'Use Docker to ensure reproducible environments.',
                    'Set up monitoring and alerts for model performance in production.',
                    'Automate retraining pipelines when model performance drops.'
                ]
            }
        }
    }
};
