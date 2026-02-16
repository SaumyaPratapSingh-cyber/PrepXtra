// Machine Learning Seed Data
export const machineLearningTopics = [
    {
        title: "Introduction to Machine Learning",
        slug: "ml-introduction",
        description: "The foundations of ML: Types, workflows, and the data pipeline.",
        order: 1, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Introduction to Machine Learning

Machine Learning (ML) is a branch of AI that enables systems to learn from data and improve from experience without being explicitly programmed.

## 1. The Three Main Types of ML

| Type | Goal | Examples |
|------|------|----------|
| **Supervised** | Predict output from labeled input data | Linear Regression, SVM, Random Forest |
| **Unsupervised** | Find hidden patterns in unlabeled data | K-Means, PCA, Association Rules |
| **Reinforcement**| Learn through trial and error (Rewards) | AlphaGo, Robotic Navigation, Trading Bots |

## 2. Basic Workflow (The Pipeline)
1. **Data Collection**: Gathering raw info (CSV, Scrapers, Sensors).
2. **Data Cleaning**: Handling missing values, outliers, and duplicates.
3. **EDA (Exploratory Data Analysis)**: Visualizing patterns and correlations.
4. **Feature Engineering**: Selecting/creating relevant inputs.
5. **Model Selection**: Choosing the right algorithm.
6. **Training**: Using part of the data to teach the model.
7. **Evaluation**: Testing on unseen data (Validation/Test sets).
8. **Deployment**: Putting the model into a production environment.

## 3. Parametric vs Non-Parametric
- **Parametric**: Assume a specific form for the function (e.g., Linear Regression). Fixed number of parameters.
- **Non-Parametric**: Do not assume a specific form; they grow with data (e.g., Decision Trees, KNN).

## 4. Why ML Now?
- **Big Data**: Availability of massive datasets.
- **Hardware**: GPUs and TPUs provide the necessary computing power.
- **Frameworks**: Tools like Scikit-Learn, PyTorch, and TensorFlow simplify implementation.
`, resources: []
    },
    {
        title: "Linear Regression",
        slug: "linear-regression",
        description: "Simple and multiple linear regression, cost functions, and gradient descent.",
        order: 2, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Linear Regression

Predicting a continuous target variable based on one or more independent variables.

## 1. The Equation
$$Y = \beta_0 + \beta_1 X + \epsilon$$
- $Y$: Target variable (Dependent).
- $X$: Feature (Independent).
- $\beta_1$: Weight (Slope).
- $\beta_0$: Bias (Intercept).

## 2. Cost Function: MSE
To find the best line, we minimize the **Mean Squared Error (MSE)**:
$$MSE = \frac{1}{n} \sum_{i=1}^n (y_i - \hat{y}_i)^2$$

## 3. Optimization: Gradient Descent
An iterative algorithm to find the minimum of the cost function by adjusting weights.
$$\theta_{next} = \theta_{prev} - \alpha \nabla J(\theta)$$
- $\alpha$: **Learning Rate**. Too high = oscillates; too low = too slow.

## 4. Assumptions of Linear Regression
1. **Linearity**: Relationship between X and Y is linear.
2. **Independence**: Residuals are independent.
3. **Homoscedasticity**: Constant variance of errors.
4. **Normality**: Residuals are normally distributed.

### Code Example (Scikit-Learn)
\`\`\`python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
print(f"Slope: {model.coef_}, Intercept: {model.intercept_}")
\`\`\`
`, resources: []
    },
    {
        title: "Logistic Regression",
        slug: "logistic-regression",
        description: "Classification using the sigmoid function and odds ratios.",
        order: 3, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Logistic Regression

Despite the name, it is a **Classification** algorithm used for binary outcomes (0 or 1).

## 1. The Sigmoid Function
Maps any real-valued number into a range between 0 and 1.
$$\sigma(z) = \frac{1}{1 + e^{-z}}$$
Where $z = \beta_0 + \beta_1 X$.

## 2. Decision Threshold
Usually, if $\sigma(z) \geq 0.5$, we predict class 1, otherwise class 0.

## 3. Cost Function: Log Loss
Also called Binary Cross-Entropy. It punishes wrong predictions that the model is "confident" about.
$$J(\theta) = -\frac{1}{m} \sum [y \log(\hat{y}) + (1-y) \log(1-\hat{y})]$$

## 4. Odds Ratio
$\text{Odds} = \frac{p}{1-p}$. Log-odds (logit) is the core of the linear relationship in logistic regression.

## 5. Multi-class (Softmax)
For >2 classes, we use **One-vs-Rest (OvR)** or the **Softmax function** which provides a probability distribution across all classes.
`, resources: []
    },
    {
        title: "Decision Trees",
        slug: "decision-trees",
        description: "Entropy, Gini impurity, and splitting criteria for trees.",
        order: 4, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Decision Trees

A flowchart-like structure used for both classification and regression.

## 1. How splits are made
The tree tries to maximize **Information Gain** at each split.

### Entropy
Measure of impurity/disorder:
$$H(S) = -\sum p_i \log_2 p_i$$

### Gini Impurity
Probability of a random element being misclassified:
$$Gini = 1 - \sum p_i^2$$

## 2. Terminology
- **Root Node**: The very first split.
- **Leaf Node**: End of the branch; carries the prediction.
- **Pruning**: Removing branches that provide little power to prevent overfitting.

## 3. Pros and Cons
- **Pros**: Easy to interpret, handles non-linear data, no scaling needed.
- **Cons**: High tendency to **Overfit**; small changes in data can create completely different trees.

\`\`\`mermaid
graph TD
    Root{Is Outlook Sunny?} -->|Yes| Humidity{Humidity > 70?}
    Root -->|No| Overcast[Play: Yes]
    Humidity -->|Yes| No[Play: No]
    Humidity -->|No| Yes[Play: Yes]
\`\`\`
`, resources: []
    },
    {
        title: "Random Forest & Ensemble",
        slug: "random-forest-ensemble",
        description: "Bagging, bootstrap aggregation, and variety in models.",
        order: 5, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Random Forest & Ensemble Learning

Ensemble methods combine multiple models to create a stronger, more robust predictor.

## 1. Bagging (Bootstrap Aggreating)
1. **Bootstrapping**: Create multiple random subsets of data (with replacement).
2. **Aggregation**: Train a model on each subset and average the results (Regression) or vote (Classification).

## 2. Random Forest
An "ensemble of decision trees". It adds more randomness:
- Each tree uses a random subset of **data**.
- Each split considers a random subset of **features**.
- **Result**: Drastically reduces variance (overfitting) compared to a single tree.

## 3. Out-of-Bag (OOB) Score
The leftover data not used in a bootstrap sample can be used to validate the model automatically without a separate test set.

## 4. Key Hyperparameters
- \`n_estimators\`: Number of trees.
- \`max_features\`: Number of features to consider at each split.
- \`max_depth\`: Maximum depth of each tree.

## 5. Wisdom of the Crowd
Many "weak" or "average" models, when combined, can outperform a single complex model.
`, resources: []
    },
    {
        title: "Boosting: XGBoost & LightGBM",
        slug: "boosting-algorithms",
        description: "Sequential learning, residuals, and gradient boosting machines.",
        order: 6, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Boosting Algorithms

Unlike Bagging (Parallel), Boosting is **Sequential**.

## 1. How it works
1. Train a weak model (e.g., a shallow tree).
2. Calculate the errors (**Residuals**).
3. Train the next model to predict those errors.
4. Repeat.

## 2. Gradient Boosting (GBM)
Uses Gradient Descent to minimize a loss function when adding new models.

## 3. Modern Powerhouses
- **XGBoost**: Extreme Gradient Boosting. High performance, handles missing values, built-in regularization.
- **LightGBM**: Faster, uses leaf-wise growth (instead of level-wise), great for large datasets.
- **CatBoost**: Optimized for categorical features.

## 4. Overfitting Warning
Boosting can easily overfit if the number of iterations is too high. Techniques like **Early Stopping** and **Learning Rate Decay** are essential.
`, resources: []
    },
    {
        title: "Support Vector Machines (SVM)",
        slug: "support-vector-machines",
        description: "Hyperplanes, margins, and the kernel trick.",
        order: 7, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Support Vector Machines (SVM)

SVM finds the "best" boundary (**Hyperplane**) that separates classes with the maximum possible margin.

## 1. Maximum Margin
The margin is the distance between the hyperplane and the closest data points from either class (**Support Vectors**).

## 2. Linear vs Non-Linear
- **Hard Margin**: No points allowed inside the margin (overfits if noise exists).
- **Soft Margin**: Allows some misclassifications for a better general boundary (Hyperparameter \`C\`).

## 3. The Kernel Trick
Transforming data into a higher dimension to find a linear separator where none existed in lower dimensions.
- **Linear Kernel**
- **Polynomial Kernel**
- **RBF (Gaussian)**: Most common for non-linear data.

## 4. C Hyperparameter
- **High C**: Focuses on classifying every point correctly (Risk of overfitting).
- **Low C**: Focuses on a wider margin (Risk of underfitting).
`, resources: []
    },
    {
        title: "K-Nearest Neighbors (KNN)",
        slug: "knn-algorithm",
        description: "Distance metrics, K-value selection, and lazy learning.",
        order: 8, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# K-Nearest Neighbors (KNN)

A "Lazy" and non-parametric algorithm. It doesn't learn a function; it just memorizes the data.

## 1. How it works
To predict a new point:
1. Find the **K** points in the training set closest to it.
2. Classification: Take the majority vote.
3. Regression: Take the average of their values.

## 2. Distance Metrics
- **Euclidean**: $\sqrt{\sum (x_i - y_i)^2}$ (Straight line).
- **Manhattan**: $\sum |x_i - y_i|$ (Grid-like).
- **Minkowski**: Generalization of both.

## 3. Choosing K
- **Small K (e.g., 1)**: Very sensitive to noise (High variance).
- **Large K**: Smooth boundaries, might miss local patterns (High bias).
- **Rule of thumb**: $K = \sqrt{n}$ (odd number).

## 4. The Curse of Dimensionality
KNN becomes very slow and less accurate as the number of features increases because "closeness" loses meaning in high dimensions.
`, resources: []
    },
    {
        title: "K-Means Clustering",
        slug: "k-means-clustering",
        description: "Unsupervised learning, centroids, and the elbow method.",
        order: 9, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# K-Means Clustering

An unsupervised algorithm that groups data into $K$ distinct clusters.

## 1. The Algorithm
1. Initialize $K$ centroids randomly.
2. **Assignment**: Assign each point to the nearest centroid.
3. **Update**: Move each centroid to the center of its assigned points.
4. Repeat until centroids stop moving.

## 2. Finding the optimal K
- **The Elbow Method**: Plot "Inertia" (Sum of squared distances) vs $K$. The point where the curve starts leveling off (the "elbow") is the optimal $K$.
- **Silhouette Score**: Measures how similar a point is to its own cluster compared to others.

## 3. Weaknesses
- Sensitive to initial centroid placement (Solved by **K-Means++**).
- Assumes clusters are spherical and of similar size.
- Hard assignment (a point belongs to exactly ONE cluster).

\`\`\`python
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3, init='k-means++')
kmeans.fit(data)
print(kmeans.cluster_centers_)
\`\`\`
`, resources: []
    },
    {
        title: "Dimensionality Reduction: PCA",
        slug: "pca-dimensionality-reduction",
        description: "Principal components, variance, and simplifying data.",
        order: 10, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Principal Component Analysis (PCA)

Reducing the number of features while keeping as much "information" (variance) as possible.

## 1. Why reduce dimensions?
- Speed up training.
- Visualize high-dimensional data (e.g., 50 features $\to$ 2D).
- Remove noise and redundant features.

## 2. How it works (The Intuition)
1. Center the data (subtract mean).
2. Calculate the **Covariance Matrix**.
3. Find **Eigenvectors** (Principal Components) and **Eigenvalues** (Amount of variance).
4. Project data onto the top principal components.

## 3. Explained Variance Ratio
Tells you how much information each component contains. Usually, we keep enough components to cover 95% of total variance.

## 4. Other Techniques
- **t-SNE / UMAP**: Better for visualizing non-linear relationships.
- **LDA**: Supervised dimensionality reduction (maximizes class separation).
`, resources: []
    },
    {
        title: "Model Evaluation & Metrics",
        slug: "model-evaluation-metrics",
        description: "Accuracy, Precision, Recall, F1, and ROC/AUC.",
        order: 11, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Model Evaluation

Accuracy isn't always enough, especially with imbalanced data (e.g., detecting fraud).

## 1. Confusion Matrix
| | Predicted Positive | Predicted Negative |
|---|---|---|
| **Actual Positive** | True Positive (TP) | False Negative (FN) |
| **Actual Negative** | False Positive (FP) | True Negative (TN) |

## 2. Key Metrics
- **Accuracy**: $(TP+TN) / Total$.
- **Precision**: $TP / (TP+FP)$. "Of all we predicted positive, how many were actually positive?" (Avoid false alarms).
- **Recall (Sensitivity)**: $TP / (TP+FN)$. "Of all actual positives, how many did we catch?" (Don't miss a diagnosis).
- **F1 Score**: Harmonic mean of Precision and Recall. Great for balance.

## 3. ROC and AUC
- **ROC Curve**: Plot of True Positive Rate vs False Positive Rate at various thresholds.
- **AUC (Area Under Curve)**: A single number representing model quality. $1.0$ is perfect, $0.5$ is random guessing.

## 4. Bias-Variance Tradeoff
- **High Bias**: Underfitting (Model is too simple).
- **High Variance**: Overfitting (Model is too complex, captures noise).
`, resources: []
    },
    {
        title: "Advanced Regularization",
        slug: "regularization-techniques",
        description: "L1, L2, Elastic Net, and preventing overfitting.",
        order: 12, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Regularization

Adding a penalty to the cost function to prevent coefficients from growing too large (and thus overfitting).

## 1. L1 Regularization (Lasso)
Adds absolute value of weights: $\lambda \sum |w|$.
- **Effect**: Can zero out unimportant features (Feature Selection).

## 2. L2 Regularization (Ridge)
Adds squared value of weights: $\lambda \sum w^2$.
- **Effect**: Shrinks weights but rarely zeros them. Good when many features are slightly useful.

## 3. Elastic Net
A combination of both L1 and L2. Useful when there are correlated features.

## 4. Why it works
It forces the model to be "simpler" by limiting the impact of any single feature, leading to better generalization on unseen data.

## 5. $\lambda$ (Lambda/Alpha)
- **High $\lambda$**: Strong penalty $\to$ Underfitting.
- **$\lambda = 0$**: No penalty $\to$ Potential Overfitting.
`, resources: []
    },
    {
        title: "Feature Engineering & Scaling",
        slug: "feature-engineering",
        description: "Handling missing data, encoding, and normalization.",
        order: 13, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Feature Engineering

"Better data beats a better algorithm."

## 1. Scaling (Normalization vs Standardization)
- **Normalization (Min-Max)**: Squish values to $[0, 1]$.
- **Standardization (Z-score)**: Center at mean 0 with std dev 1.
- **Why?**: Essential for distance-based models (KNN, SVM) and Gradient Descent.

## 2. Categorical Encoding
- **Label Encoding**: Assigning numbers (1, 2, 3). Careful: Model might think 3 > 1.
- **One-Hot Encoding**: Creating binary columns for each category.

## 3. Handling Missing Values
- **Deletion**: Drop row/column (risky).
- **Imputation**: Fill with Mean, Median, or Mode.
- **Predictive Imputation**: Use another ML model to guess the missing values.

## 4. Feature Selection
- **Filter**: Statistical tests (Correlation, Chi-square).
- **Wrapper**: Selective search (Forward/Backward elimination).
- **Embedded**: Model does it natively (Lasso, Random Forest).
`, resources: []
    },
    {
        title: "Naive Bayes Classification",
        slug: "naive-bayes",
        description: "Probability-based learning and the 'naive' assumption.",
        order: 14, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Naive Bayes

A classification algorithm based on Bayes' Theorem.

## 1. The "Naive" Assumption
It assumes that all features are **Independent** of each other given the class label. 
- *Example*: In a spam filter, "win" and "money" are assumed independent, which isn't true, but the model still works surprisingly well!

## 2. Bayes Theorem used
$$P(y|x) = \frac{P(x|y)P(y)}{P(x)}$$

## 3. Common Variants
- **Gaussian NB**: For continuous data (assumes Normal distribution).
- **Multinomial NB**: For text counting (Word counts).
- **Bernoulli NB**: For binary features (Word presence/absence).

## 4. Pros & Cons
- **Pros**: Very fast, works well with high-dimensional data (text), needs little training data.
- **Cons**: The independence assumption often violates reality.
`, resources: []
    },
    {
        title: "Neural Networks: The Perceptron",
        slug: "neural-networks-perceptron",
        description: "Basic building block, weights, bias, and activation functions.",
        order: 15, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Neural Networks: The Perceptron

The perceptron is the simplest type of artificial neural network.

## 1. The Structure
- **Inputs**: $X_1, X_2, \dots$
- **Weights**: $W_1, W_2, \dots$ (Importance of input).
- **Bias**: $b$ (Offset).
- **Summation**: $z = \sum (W_i X_i) + b$.
- **Activation**: $y = f(z)$.

## 2. Activation Functions
They add non-linearity, allowing the model to learn complex patterns.
- **Step Function**: 0 or 1.
- **Sigmoid**: $[0, 1]$.
- **ReLU (Rectified Linear Unit)**: $\max(0, x)$. Industry standard.
- **Tanh**: $[-1, 1]$.

## 3. Training a Perceptron
Adjust weights based on error (Difference between actual and predicted).
- **Problem**: A single perceptron can only solve **Linearly Separable** problems. It CANNOT solve the XOR problem (This led to the "AI Winter").

## 4. Multi-Layer Perceptron (MLP)
Stacking layers (Input, Hidden, Output) allows solving any non-linear problem.
`, resources: []
    },
    {
        title: "Backpropagation & Neural Math",
        slug: "backpropagation-neural-math",
        description: "Chain rule, adjusting weights, and learning.",
        order: 16, estimatedMinutes: 75, difficulty: "Hard",
        content: `
# Backpropagation

The "Engine" of Deep Learning. How neural networks actually learn.

## 1. The Process
1. **Forward Pass**: Data flows from input to output $\to$ Calculate Prediction.
2. **Loss Calculation**: How far off were we? (e.g., MSE).
3. **Backward Pass**: Calculate the contribution of each weight to the error using the **Chain Rule** from calculus.
4. **Weight Update**: Change weights using Gradient Descent.

## 2. Optimizer Types
- **SGD**: Simple but slow.
- **Adam**: Adaptive Moment Estimation. Industry standard; adjusts learning rate for each weight.
- **RMSprop**: Good for Recurrent Neural Networks.

## 3. Vanishing Gradient Problem
In very deep networks, the gradient becomes so small that weights near the beginning don't change anymore (Learning stops). Solved by:
- **ReLU** activation.
- **Residual connections (ResNet)**.
- **Batch Normalization**.
`, resources: []
    },
    {
        title: "Reinforcement Learning Basics",
        slug: "reinforcement-learning-basics",
        description: "Agents, environments, rewards, and Q-learning.",
        order: 17, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Reinforcement Learning (RL)

Learning by interacting with an environment to maximize total reward.

## 1. Core Components
- **Agent**: The learner (The AI).
- **Environment**: The world the agent interacts with.
- **State ($S$)**: Current situation.
- **Action ($A$)**: What the agent does.
- **Reward ($R$)**: Immediate feedback (Positive or Negative).

## 2. The Policy ($\pi$)
The strategy the agent uses to decide the next action based on the state.

## 3. Q-Learning
A value-based RL algorithm. It learns a **Q-Table** which tells the agent the expected "quality" of an action in a state.
$$Q(s, a) \leftarrow Q(s, a) + \alpha [R + \gamma \max Q(s', a') - Q(s, a)]$$
- $\gamma$: **Discount Factor** (value of future rewards vs immediate).

## 4. Exploration vs Exploitation
- **Exploration**: Trying new things to find better rewards (Random).
- **Exploitation**: Choosing the best known action (Greedy).
- **$\epsilon$-greedy**: A strategy to balance both.
`, resources: []
    },
    {
        title: "Recommendation Systems",
        slug: "recommendation-systems",
        description: "Content-based vs Collaborative filtering and matrix factorization.",
        order: 18, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Recommendation Systems

## 1. Content-Based Filtering
Recommends items similar to ones a user liked before.
- *Mechanism*: Uses item features (tags, genre, author).
- *Pros*: No "Cold Start" problem for new users.

## 2. Collaborative Filtering
"If Alice and Bob both like Pizza and Pasta, and Bob likes Salad, Alice might like Salad too."
- **User-User**: Find similar users.
- **Item-Item**: Find items usually bought together.

## 3. Matrix Factorization
Decomposing a massive "User-Item" matrix into smaller "User-Feature" and "Item-Feature" matrices (e.g., SVD).
- This "discovers" latent features (e.g., identifying that a user likes 'dark synth-wave' without a tag).

## 4. Hybrid Systems
Combining both methods to get the best of both worlds (Standard for Netflix/YouTube).
`, resources: []
    },
    {
        title: "MLOps: Deployment & Lifecycle",
        slug: "mlops-lifecycle",
        description: "Productionizing ML, monitoring, and model drift.",
        order: 19, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# MLOps Fundamentals

Machine Learning Operations (MLOps) is DevOps for ML.

## 1. The Challenges
- **Data Drift**: The real-world data starts changing compared to training data.
- **Concept Drift**: The relationship between X and Y changes (e.g., spending habits during a recession).

## 2. The Pipeline
1. **Automation**: Auto-retraining when performance drops.
2. **Versioning**: Not just code (Git), but **Data (DVC)** and **Model (MLflow)**.
3. **Serving**: APIs using Flask/FastAPI or specialized tools like TorchServe.

## 3. Monitoring
- Monitoring latency and CPU/Memory usage.
- Monitoring **Model Decay**: How accuracy changes over time.

## 4. Infrastructure
- **Dockers**: Containerizing the ML environment.
- **Kubernetes**: Orchestrating many model containers.
`, resources: []
    },
    {
        title: "Ethics and Fairness in AI",
        slug: "ai-ethics-fairness",
        description: "Bias in data, transparency, and responsible ML.",
        order: 20, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Ethics and Fairness in AI

Machine Learning isn't magic; it's a reflection of the data we give it.

## 1. Types of Bias
- **Historical Bias**: Data reflecting past societal prejudices.
- **Representation Bias**: Certain groups are missing or under-represented in the dataset.
- **Confirmation Bias**: Data influenced by human reviewers' existing beliefs.

## 2. Transparency & Explainability (XAI)
"Why did the model say NO?"
- Black box models (Deep Learning) are hard to explain.
- Tools like **SHAP** and **LIME** help interpret what features drove a decision.

## 3. Privacy
- **Differential Privacy**: Adding noise to data so individual identities can't be found while patterns remain.
- **Federated Learning**: Training models on user devices without ever uploading private data to a central server.

## 4. Governance
Regulations like **GDPR** (EU) and **AI Act** ensure that AI systems are safe, transparent, and respect human rights.
`, resources: []
    }
];
