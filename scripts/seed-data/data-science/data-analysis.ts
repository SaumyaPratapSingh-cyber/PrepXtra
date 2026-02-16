// Data Analysis Seed Data
export const dataAnalysisTopics = [
    {
        title: "Introduction to Data Analysis",
        slug: "data-analysis-intro",
        description: "The lifecycle of data: From raw collection to business insights.",
        order: 1, estimatedMinutes: 40, difficulty: "Easy",
        content: `
# Introduction to Data Analysis

Data Analysis is the process of examining, cleaning, transforming, and modeling data to discover useful information and support decision-making.

## 1. The Data Analysis Lifecycle
1. **Define Objective**: What question are we trying to answer?
2. **Data Collection**: Gathering data from databases, APIs, or CSVs.
3. **Data Cleaning**: The "Janitor work" (80% of the effort).
4. **Data Exploration (EDA)**: Understanding distributions and relationships.
5. **Data Analysis**: Applying statistical or ML models.
6. **Communication**: Presenting findings via charts and reports.

## 2. CRISP-DM Framework
The standard industry process for data mining:
- Business Understanding
- Data Understanding
- Data Preparation
- Modeling
- Evaluation
- Deployment

## 3. Analysis vs Analytics
- **Analysis**: Looking at the past (What happened?).
- **Analytics**: Predicting the future (What will happen?).

## 4. The Modern Data Stack
- **Languages**: Python, R, SQL.
- **Processing**: Spark, Snowflake, BigQuery.
- **Visualization**: Tableau, PowerBI, Looker.
`, resources: []
    },
    {
        title: "Numerical Analysis with NumPy",
        slug: "numpy-analysis",
        description: "Efficient array processing and vectorization in Python.",
        order: 2, estimatedMinutes: 45, difficulty: "Medium",
        content: `
# Numerical Analysis with NumPy

NumPy (Numerical Python) is the foundation for almost all data science in Python.

## 1. Why NumPy?
- **Speed**: Implemented in C/Fortran.
- **Efficiency**: Uses fixed memory for arrays (unlike Python lists).
- **Vectorization**: Performing operations on entire arrays without loops.

## 2. The n-dimensional Array (ndarray)
A table of elements (usually numbers), all of the same type.

## 3. Basic Operations
- **Broadcasting**: Performing math between arrays of different shapes.
- **Slicing**: \`arr[1:5, :2]\` extracts specific rows and columns.
- **Aggregation**: \`np.mean()\`, \`np.std()\`, \`np.sum()\`.

### Code Example
\`\`\`python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])

# Vectorized operation
result = arr * 2 # [2, 4, 6, 8, 10]

# Multi-dimensional
matrix = np.random.rand(3, 3)
print(matrix.shape) # (3, 3)
\`\`\`
`, resources: []
    },
    {
        title: "Tabular Data with Pandas",
        slug: "pandas-dataframes",
        description: "Series, DataFrames, and manipulating structured data.",
        order: 3, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Tabular Data with Pandas

Pandas provides high-performance, easy-to-use data structures for tabular data.

## 1. Core Structures
- **Series**: 1D labeled array (like a column).
- **DataFrame**: 2D labeled data structure (like an Excel sheet or SQL table).

## 2. Essential Functions
- \`df.head()\`: View first 5 rows.
- \`df.describe()\`: Statistical summary of all numerical columns.
- \`df.info()\`: Memory usage and data types.
- \`df.shape\`: Rows vs Columns.

## 3. Selecting Data
- **loc**: Label-based selective (\`df.loc[0, 'Name']\`).
- **iloc**: Integer-position based selective (\`df.iloc[0, 1]\`).
- **Boolean Masking**: \`df[df['Age'] > 25]\`.

## 4. Why use Pandas over Excel?
- **Automation**: One script can process 1,000 files in seconds.
- **Size**: Handles millions of rows efficiently.
- **Integrity**: Every step is recorded in code (reproducibility).
`, resources: []
    },
    {
        title: "Data Cleaning & Preprocessing",
        slug: "data-cleaning",
        description: "Handling missing values, duplicates, and data type issues.",
        order: 4, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Data Cleaning

Cleaning data is the most critical step. "Garbage In, Garbage Out."

## 1. Handling Missing Data (NaNs)
- **Check**: \`df.isnull().sum()\`.
- **Drop**: \`df.dropna()\` (Use if missingness is <5%).
- **Fill (Imputation)**: \`df.fillna(df.mean())\`.

## 2. Dealing with Duplicates
- \`df.duplicated().sum()\`.
- \`df.drop_duplicates()\`.

## 3. Data Type Conversion
- Changing "Strings" that should be "Integers".
- \`df['Date'] = pd.to_datetime(df['Date'])\`.

## 4. String Manipulation
- Removing whitespace: \`df['City'].str.strip()\`.
- Changing case: \`df['Names'].str.title()\`.

## 5. Outlier Detection
- Using the **IQR (Interquartile Range)** method.
- Using Z-scores.
`, resources: []
    },
    {
        title: "Data Wrangling & Transformation",
        slug: "data-wrangling",
        description: "Merging, Joins, Pivot Tables, and GroupBy operations.",
        order: 5, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Data Wrangling

Converting raw data into a more suitable format.

## 1. The GroupBy Operation
The **Split-Apply-Combine** strategy.
\`\`\`python
df.groupby('Category')['Sales'].sum()
\`\`\`

## 2. Merging and Joining
Combining multiple DataFrames.
- **Inner Join**: Common keys only.
- **Left Join**: All from left, match from right.
- **Outer Join**: All from both.

## 3. Pivot Tables
Summarizing data across two dimensions (like Excel pivot tables).
\`\`\`python
df.pivot_table(index='Region', columns='Product', values='Revenue', aggfunc='mean')
\`\`\`

## 4. Tidy Data Principles
1. Each variable forms a column.
2. Each observation forms a row.
3. Each type of observational unit forms a table.
- Use \`pd.melt()\` to convert wide data to long format.
`, resources: []
    },
    {
        title: "Descriptive Statistics",
        slug: "descriptive-stats",
        description: "Central tendency, dispersion, and distribution shapes.",
        order: 6, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Descriptive Statistics

Summarizing and describing the features of a dataset.

## 1. Measures of Central Tendency
- **Mean**: Average. Sensitive to outliers.
- **Median**: Middle value. Robust to outliers.
- **Mode**: Most frequent value.

## 2. Measures of Dispersion (Spread)
- **Range**: Max - Min.
- **Variance ($\sigma^2$):** Average squared deviation from mean.
- **Standard Deviation ($\sigma$):** Square root of variance. Most common measure of spread.

## 3. Shape of Distribution
- **Skewness**: Measure of asymmetry.
    - Positive: Tail on the right.
    - Negative: Tail on the left.
- **Kurtosis**: Measure of "tailedness" (how peaky or flat).

## 4. Percentiles and Quartiles
- **Q1 (25th percentile)**
- **Q2 (Median)**
- **Q3 (75th percentile)**
- **IQR (Interquartile Range)**: $Q3 - Q1$.
`, resources: []
    },
    {
        title: "Statistical Inference",
        slug: "statistical-inference",
        description: "Population vs Sample, CLT, and Confidence Intervals.",
        order: 7, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Statistical Inference

Making predictions about a **Population** based on a **Sample**.

## 1. Central Limit Theorem (CLT)
If you take many samples, the distribution of their means will be **Normal**, regardless of the population's shape.
- *Why it matters*: Allows us to use Z-tests and T-tests even if data isn't perfectly normal.

## 2. Standard Error (SE)
Estimates the variability of the sample mean.
$$SE = \frac{\sigma}{\sqrt{n}}$$

## 3. Confidence Intervals (CI)
A range of values that likely contains the true population mean.
- **95% CI**: "We are 95% confident the true mean sits between $X$ and $Y$."

## 4. Point Estimates
A single value (like the sample mean) used to estimate a population parameter.
`, resources: []
    },
    {
        title: "Hypothesis Testing in Analytics",
        slug: "analytics-hypothesis-testing",
        description: "P-values, Significance levels, and A/B test logic.",
        order: 8, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Hypothesis Testing

## 1. The Setup
- **$H_0$ (Null)**: No difference exists.
- **$H_1$ (Alternative)**: A difference exists.

## 2. P-Value
The probability that we would see our results if the Null Hypothesis were true.
- If $P < 0.05$: **Significant**. Reject $H_0$.

## 3. Common Tests
- **One-Sample T-test**: Compare sample mean to a constant.
- **Two-Sample T-test**: Compare means of two groups.
- **ANOVA**: Compare means of 3 or more groups.
- **Chi-Square**: Relationship between categorical variables.

## 4. Power of a Test
The probability of correctly rejecting the null hypothesis (1 - Type II error).
`, resources: []
    },
    {
        title: "Data Visualization Principles",
        slug: "viz-principles",
        description: "The art of science of charts: Color, scale, and integrity.",
        order: 9, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Data Visualization Principles

"The goal of visualization is insight, not pictures." — Ben Shneiderman

## 1. Data-Ink Ratio (Edward Tufte)
Maximize the ink used to show data; minimize "chart junk" (gridlines, 3D effects, shadows).

## 2. Choosing the right chart
- **Distribution**: Histogram, Boxplot, Density plot.
- **Comparison**: Bar chart, Column chart.
- **Relationship**: Scatter plot, Heatmap.
- **Composition**: Stacked bar (Avoid Pie charts for >3 categories!).
- **Time-series**: Line chart.

## 3. Color Theory in Viz
- **Sequential**: For magnitudes (Light blue to Dark blue).
- **Diverging**: For deviations from a center (Red - White - Blue).
- **Qualitative**: For categories (Distinct colors like Red, Green, Blue).

## 4. Visual perception
Humans are best at judging **Length** and **Position**, and worst at judging **Area** and **Angle** (which is why Pie charts are hard to read).
`, resources: []
    },
    {
        title: "Matplotlib: Core Plotting",
        slug: "matplotlib-basics",
        description: "The foundation of Python visualization.",
        order: 10, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Matplotlib

Matplotlib is a low-level library that gives total control over every element of a plot.

## 1. The Hierarchy
- **Figure**: The overall window/canvas.
- **Axes**: A single plot/subplot within the figure.

## 2. Basic Workflow
\`\`\`python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='Trend', color='blue', linestyle='--')
plt.title('Sales over Time')
plt.xlabel('Month')
plt.ylabel('Revenue')
plt.legend()
plt.show()
\`\`\`

## 3. Subplots
\`\`\`python
fig, (ax1, ax2) = plt.subplots(1, 2)
ax1.plot(data1)
ax2.hist(data2)
\`\`\`

## 4. Why it's still used
While Seaborn is prettier, Matplotlib is necessary for "fine-tuning" and creating custom, complex visualizations for publications.
`, resources: []
    },
    {
        title: "Advanced Viz with Seaborn",
        slug: "seaborn-visuals",
        description: "Statistical charting with beautiful defaults.",
        order: 11, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Advanced Viz with Seaborn

Seaborn is built on top of Matplotlib and integrates directly with Pandas DataFrames.

## 1. Beautiful Defaults
Automatically applies sleek themes and color palettes.

## 2. Statistical Charts
- **sns.countplot()**: Frequency of categories.
- **sns.boxplot()**: Outliers and quartiles.
- **sns.heatmap()**: Correlation matrices.
- **sns.pairplot()**: Visualize relationships between all pairs of numeric columns.

## 3. Handling Facets
\`\`\`python
# Create one chart for each category automatically
sns.relplot(data=df, x='Sales', y='Profit', col='Region', hue='Segment')
\`\`\`

## 4. Regression Plots
\`\`\`python
# Draws a scatter plot AND the regression line with confidence intervals
sns.regplot(x='Advertising', y='Sales', data=df)
\`\`\`
`, resources: []
    },
    {
        title: "Exploratory Data Analysis (EDA)",
        slug: "eda-workflow",
        description: "The systematic search for patterns and bugs in data.",
        order: 12, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# EDA Workflow

EDA is an iterative cycle: Question $\to$ Visualize $\to$ Fix $\to$ Repeat.

## 1. Univariate Analysis
Looking at one variable at a time.
- Are there outliers?
- Is it skewed?
- What are the most common categories?

## 2. Bivariate Analysis
Looking at the relationship between TWO variables.
- Correlation matrix.
- Scatter plots for numerical vs numerical.
- Box plots for categorical vs numerical.

## 3. Multivariate Analysis
Relationships between 3 or more variables.
- Using Color, Size, or Facets to add dimensions to a chart.

## 4. EDA Checklist
- Check data types.
- Check for missing values.
- Check for duplicate rows.
- Verify that values make sense (e.g., negative prices, age > 150).
`, resources: []
    },
    {
        title: "SQL for Data Analysis",
        slug: "sql-analysis",
        description: "Querying databases, filtering, and aggregations.",
        order: 13, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# SQL for Data Analysis

SQL is the "bread and butter" of getting data out of a warehouse.

## 1. The SELECT statement
\`\`\`sql
SELECT column_name, SUM(sales)
FROM orders
WHERE date > '2023-01-01'
GROUP BY column_name
HAVING SUM(sales) > 1000
ORDER BY SUM(sales) DESC;
\`\`\`

## 2. Order of Execution
1. FROM / JOIN
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY
7. LIMIT

## 3. Aggregate Functions
- \`COUNT()\`, \`SUM()\`, \`AVG()\`, \`MIN()\`, \`MAX()\`.

## 4. Joins (The Big Four)
- **Inner, Left, Right, Full**.
`, resources: []
    },
    {
        title: "Advanced SQL (Windows & CTEs)",
        slug: "advanced-sql-analytics",
        description: "Complex ranking, rolling averages, and reusable queries.",
        order: 14, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Advanced SQL

## 1. Window Functions
Perform calculations across rows that are related to the current row without grouping.
\`\`\`sql
SELECT Name, Salary, 
       AVG(Salary) OVER(PARTITION BY Department) as Avg_Dept_Salary,
       RANK() OVER(ORDER BY Salary DESC) as Rank
FROM Employees;
\`\`\`

## 2. Common Table Expressions (CTEs)
Makes complex queries readable by creating temporary "named" tables.
\`\`\`sql
WITH Regional_Sales AS (
    SELECT Region, SUM(Amount) as Total
    FROM Sales
    GROUP BY Region
)
SELECT * FROM Regional_Sales WHERE Total > 5000;
\`\`\`

## 3. Self Joins
Joining a table with itself (e.g., finding an employee's manager in a table).

## 4. Case Statements
Adding logic directly in SQL.
\`\`\`sql
CASE 
  WHEN sales > 1000 THEN 'High' 
  ELSE 'Low' 
END as category
\`\`\`
`, resources: []
    },
    {
        title: "A/B Testing & Experimentation",
        slug: "ab-testing",
        description: "Statistically sound ways to make product decisions.",
        order: 15, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# A/B Testing

## 1. What is an A/B Test?
Showing two versions of a webpage to users and measuring which one performs better for a specific goal (e.g., clicks).

## 2. Key Statistics
- **Minimum Detectable Effect (MDE)**: The smallest change you care about.
- **Sample Size Calculation**: How many users do we need to reach "Statistical Significance"? (Calculated using Power Analysis).

## 3. Pitfalls
- **Novelty Effect**: Users click because it's new, not because it's better.
- **P-hacking**: Checking results daily and stopping when you see $P < 0.05$. (Don't do this!).
- **Selection Bias**: One group accidentally gets more mobile users.

## 4. Success Metrics (KPIs)
- Conversion Rate.
- Average Order Value.
- Retention Rate.
`, resources: []
    },
    {
        title: "Time Series Analysis Basics",
        slug: "time-series-basics",
        description: "Trend, seasonality, and rolling statistics.",
        order: 16, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Time Series Analysis

Data gathered at successive points in time.

## 1. Components
- **Trend**: Long-term increase or decrease.
- **Seasonality**: Repeating patterns (e.g., high sales every December).
- **Noise**: Random variations.

## 2. Moving Averages
Smoothing data to find the trend.
- **SMA**: Simple Moving Average.
- **WMA**: Weighted Moving Average.

## 3. Stationarity
A time series is stationary if its mean and variance stay constant over time. Most models **require** stationarity to work.
- Use **Differencing** ($x_t - x_{t-1}$) to make data stationary.

## 4. Autocorrelation (ACF)
How a value at time $t$ correlates with values at time $t-1, t-2, \dots$. This helps identify seasonal patterns.
`, resources: []
    },
    {
        title: "Dashboarding and BI",
        slug: "dashboarding-bi",
        description: "Automating reports and interactive storytelling.",
        order: 17, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Dashboarding & Business Intelligence (BI)

## 1. Why Dashboards?
- Real-time monitoring.
- Removes the "Can you send me a report?" workload.
- Stakeholders can explore data themselves.

## 2. The Golden Rules of Dashboards
- **Keep it simple**: 5-7 charts maximum.
- **Context is King**: A number without a goal is useless ($75\%$ conversion sounds good, but what was the target?).
- **Hierarchy**: Most important info at the top-left.
- **Interactivity**: Add filters (Date, Region, Segment).

## 3. Tools
- **Plotly / Dash / Streamlit**: For Python-based interactive apps.
- **Tableau / Power BI**: Industry standard "No-code" tools.
`, resources: []
    },
    {
        title: "Feature engineering for Analysis",
        slug: "analysis-feature-eng",
        description: "Creating ratios, log transforms, and binning.",
        order: 18, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Feature Engineering for Analysis

Creating new metrics that reveal the truth hidden in raw numbers.

## 1. Log Transformation
Using $\log(x)$ to compress highly skewed data (like income) into a normal-looking distribution.

## 2. Binning
Converting continuous values into categories (e.g., Age $\to$ Child, Adult, Senior).

## 3. Ratios and Rates
- *Revenue per User*.
- *Click-through Rate*.
- *Profit Margin*.

## 4. Interaction Features
Combining two features (e.g., Width $\times$ Height $\to$ Area).
`, resources: []
    },
    {
        title: "Outlier Detection in Deep Dives",
        slug: "outlier-detection",
        description: "Mistakes in data vs valuable anomalies.",
        order: 19, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Outlier Detection

An outlier is a data point that differs significantly from other observations.

## 1. Types of Outliers
- **Global**: A single value far outside the range.
- **Contextual**: $40^\circ\text{C}$ is normal in summer, but an outlier in winter.
- **Collective**: A group of values that are unusual together.

## 2. Detection Methods
- **Z-Score**: $ > 3$ std devs from mean.
- **IQR**: Values below $Q1 - 1.5 \cdot IQR$ or above $Q3 + 1.5 \cdot IQR$.
- **Isolation Forest**: An unsupervised ML algorithm for spotting anomalies.

## 3. What to do with them?
- **Impute**: Replace with mean/median.
- **Cap/Winsorize**: Set the value to the $99^{th}$ percentile.
- **Keep**: If they are "real" (e.g., discovering a new financial fraud pattern).
`, resources: []
    },
    {
        title: "Data Storytelling & Communication",
        slug: "data-storytelling",
        description: "Presenting to stakeholders and driving action.",
        order: 20, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Data Storytelling

"Numbers have an important story to tell. They rely on you to give them a voice." — Stephen Few

## 1. The Narrative Arc
1. **The Hook**: Why should the audience care?
2. **The Conflict**: What is the problem the data revealed?
3. **The Resolution**: The data-driven recommendation.

## 2. Knowing your Audience
- **Executives**: Want high-level KPIs and bottom-line impact.
- **Product Managers**: Want user behavior and feature success.
- **Engineers**: Want technical details and data quality.

## 3. Highlighting the Insight
Use callouts, arrows, and circles to lead the viewer's eye exactly to the point you are making.

## 4. The Elevator Pitch
Can you explain the main insight of your 50-page analysis in 30 seconds? If not, you don't understand it well enough.
`, resources: []
    }
];
