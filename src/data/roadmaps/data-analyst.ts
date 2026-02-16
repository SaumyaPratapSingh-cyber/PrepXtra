
import { RoadmapTrack } from './types';

export const dataAnalystRoadmap: RoadmapTrack = {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Master the skills to extract insights from data',
    category: 'role-based',
    icon: '📊',
    accentColor: '#10b981',
    rootNodeId: 'da-root',
    nodes: {
        'da-root': {
            id: 'da-root',
            label: 'Data Analyst',
            description: 'A Data Analyst collects, processes, and performs statistical analyses of data.',
            children: ['da-excel', 'da-sql', 'da-python', 'da-visualization'],
            resources: [
                { type: 'article', title: 'Data Analyst Roadmap', url: 'https://roadmap.sh/data-analyst', isFree: true },
                { type: 'course', title: 'Google Data Analytics Certificate', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', isFree: false },
                { type: 'video', title: 'Data Analytics Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=ua-CiDNNj30', isFree: true }
            ],
            content: {
                overview: 'A Data Analyst turns raw data into actionable insights that drive business decisions. The role bridges the gap between data and decision-makers. The typical workflow follows a cycle: ask questions, collect data, clean and prepare it, analyze it, visualize findings, and present recommendations. Data analysts work in every industry — finance, healthcare, marketing, e-commerce, sports — anywhere decisions can be improved with data. The core skills include spreadsheets (Excel/Google Sheets), SQL for querying databases, Python or R for advanced analysis, and visualization tools (Tableau, Power BI) for communicating findings. Strong communication skills are equally important — you need to translate technical findings into clear, actionable business recommendations.',
                keyConcepts: [
                    'The data analysis cycle: ask, collect, clean, analyze, visualize, present',
                    'Descriptive analytics: what happened?',
                    'Diagnostic analytics: why did it happen?',
                    'Predictive analytics: what will happen?',
                    'Data cleaning: the most time-consuming part of analysis',
                    'ETL: Extract, Transform, Load',
                    'KPIs and business metrics',
                    'Storytelling with data'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between descriptive and predictive analytics?', hint: 'Descriptive summarizes what already happened (reports, dashboards). Predictive uses models to forecast what will happen.', difficulty: 'easy' },
                    { question: 'Why is data cleaning important?', hint: 'Dirty data leads to wrong conclusions. Most analysts spend 60-80% of their time cleaning data before analysis.', difficulty: 'easy' },
                    { question: 'How do you communicate findings to non-technical stakeholders?', hint: 'Use clear visualizations, focus on business impact, tell a story with the data, and avoid technical jargon.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always start by understanding the business question before touching any data.',
                    'Document your data sources, assumptions, and methodology.',
                    'Validate your findings with stakeholders before presenting.',
                    'Learn SQL deeply — it is the most important skill for a data analyst.',
                    'Build a portfolio with real-world projects on Kaggle or GitHub.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Foundations', description: 'What is Data Analysis?', tasks: ['Learn the data analysis process cycle', 'Explore key roles and responsibilities', 'Practice with Excel: pivot tables, VLOOKUP, charts'] },
                { day: 2, title: 'SQL for Analysis', description: 'Querying databases like an analyst.', tasks: ['Write SELECT, WHERE, GROUP BY, ORDER BY queries', 'Learn JOIN types for combining tables', 'Practice window functions for ranking and running totals'] },
                { day: 3, title: 'Python and Visualization', description: 'Advanced analysis and communication.', tasks: ['Clean data with pandas: handling nulls, duplicates, types', 'Create visualizations with matplotlib and seaborn', 'Build an interactive dashboard with Tableau or Power BI'] }
            ]
        },
        'da-excel': {
            id: 'da-excel',
            label: 'Excel/Google Sheets',
            description: 'Pivot tables, VLOOKUP, and advanced formulas for quick data analysis.',
            parentId: 'da-root',
            resources: [
                { type: 'video', title: 'Excel for Data Analysis', url: 'https://www.youtube.com/watch?v=opJgMi1IUrc', isFree: true }
            ],
            content: {
                overview: 'Excel and Google Sheets are often the starting point for data analysis and remain essential tools throughout your career. They are perfect for quick analysis, ad-hoc exploration, and sharing findings with non-technical stakeholders. Key skills include pivot tables (summarizing large datasets by categories), VLOOKUP/XLOOKUP (matching data across tables), conditional formatting (visual patterns), and formulas like SUMIFS, COUNTIFS, INDEX-MATCH. Power Query in Excel handles data cleaning and transformation. For larger datasets or repeatable analysis, you graduate to SQL and Python, but spreadsheets remain invaluable for prototyping and presenting results.',
                keyConcepts: [
                    'Pivot tables for quick data summarization',
                    'VLOOKUP, XLOOKUP, INDEX-MATCH for lookups',
                    'SUMIFS, COUNTIFS for conditional aggregation',
                    'Conditional formatting for visual analysis',
                    'Charts: bar, line, scatter, histogram',
                    'Power Query for data cleaning and transformation',
                    'Data validation and dropdown lists',
                    'Named ranges and structured references'
                ],
                practiceQuestions: [
                    { question: 'When should you use INDEX-MATCH over VLOOKUP?', hint: 'INDEX-MATCH is more flexible: it can look left, is not affected by column insertions, and handles large datasets better.', difficulty: 'medium' },
                    { question: 'What is a pivot table used for?', hint: 'Quickly summarizing, grouping, and analyzing large datasets by dragging fields into rows, columns, and values.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use structured tables (Ctrl+T) instead of plain ranges.',
                    'Never modify raw data — keep a clean copy and work on transformations separately.',
                    'Use named ranges for readable formulas.',
                    'Learn keyboard shortcuts for speed: Ctrl+Shift+L (filter), Alt+N+V (pivot).'
                ]
            }
        },
        'da-sql': {
            id: 'da-sql',
            label: 'SQL for Analysis',
            description: 'Querying and joining tables to extract insights from databases.',
            parentId: 'da-root',
            children: ['da-sql-joins', 'da-sql-aggregations'],
            resources: [
                { type: 'article', title: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial', isFree: true }
            ],
            content: {
                overview: 'SQL is the most important technical skill for a data analyst. Every company stores data in relational databases, and SQL is how you access it. As an analyst, you write queries to answer business questions: Which products sell the most? How has revenue changed over time? Which customers are at risk of churning? You need to master SELECT for retrieving data, JOIN for combining tables, GROUP BY with aggregate functions for summarizing, WHERE and HAVING for filtering, and window functions (ROW_NUMBER, RANK, LAG, LEAD, running totals) for advanced analytics. Common Table Expressions (CTEs) organize complex queries into readable steps.',
                keyConcepts: [
                    'SELECT, FROM, WHERE, ORDER BY, LIMIT',
                    'Aggregate functions: COUNT, SUM, AVG, MIN, MAX',
                    'GROUP BY and HAVING for grouped analysis',
                    'JOIN types: INNER, LEFT, RIGHT, FULL',
                    'Subqueries and Common Table Expressions (CTEs)',
                    'Window functions: ROW_NUMBER, RANK, LAG, LEAD',
                    'CASE WHEN for conditional logic',
                    'Date functions for time-based analysis'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between WHERE and HAVING?', hint: 'WHERE filters individual rows before grouping. HAVING filters groups after GROUP BY.', difficulty: 'easy' },
                    { question: 'When would you use a window function?', hint: 'When you need to calculate across rows without collapsing them — running totals, rankings, comparing to previous row.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Practice SQL on real datasets (HackerRank, LeetCode, StrataScratch).',
                    'Use CTEs to break complex queries into readable steps.',
                    'Always check your results with a sanity check (total counts, known values).',
                    'Comment your queries to explain business logic.'
                ]
            }
        },
        'da-sql-joins': {
            id: 'da-sql-joins',
            label: 'Joins & Subqueries',
            description: 'Combining multiple datasets with different join types and nested queries.',
            parentId: 'da-sql',
            resources: [],
            content: {
                overview: 'Joins combine rows from two or more tables based on a related column. INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table plus matches from the right (nulls where no match). RIGHT JOIN is the reverse. FULL OUTER JOIN returns all rows from both tables. Subqueries are queries nested inside another query — used for filtering (WHERE id IN (SELECT ...)), derived tables (FROM (SELECT ...)), and correlated subqueries that reference the outer query. CTEs (WITH clause) are a cleaner alternative to subqueries for complex analysis.',
                keyConcepts: [
                    'INNER JOIN for matching rows only',
                    'LEFT JOIN for preserving all left-table rows',
                    'FULL OUTER JOIN for all rows from both tables',
                    'Self-joins for hierarchical or sequential data',
                    'Subqueries in WHERE, FROM, and SELECT clauses',
                    'CTEs as readable alternatives to subqueries',
                    'Correlated subqueries'
                ]
            }
        },
        'da-sql-aggregations': {
            id: 'da-sql-aggregations',
            label: 'Aggregations',
            description: 'SUM, AVG, MIN/MAX, GROUP BY, and window functions for analytical queries.',
            parentId: 'da-sql',
            resources: [],
            content: {
                overview: 'Aggregation is where SQL becomes a powerful analytical tool. GROUP BY collapses rows into groups, and aggregate functions (SUM, COUNT, AVG, MIN, MAX) calculate summary values per group. Window functions perform calculations across rows related to the current row without collapsing them: RANK() ranks rows within a partition, LAG()/LEAD() access previous/next rows for period-over-period comparisons, SUM() OVER() calculates running totals, and NTILE() divides rows into buckets. These are the queries that analysts write most frequently for business reporting and analysis.',
                keyConcepts: [
                    'GROUP BY with aggregate functions',
                    'HAVING for filtering grouped results',
                    'PARTITION BY for window function grouping',
                    'RANK, DENSE_RANK, ROW_NUMBER',
                    'LAG and LEAD for comparing rows',
                    'Running totals with SUM() OVER(ORDER BY)',
                    'Moving averages for trend analysis',
                    'ROLLUP and CUBE for multi-level aggregation'
                ]
            }
        },
        'da-python': {
            id: 'da-python',
            label: 'Python/R',
            description: 'Programming for advanced data manipulation and statistical analysis.',
            parentId: 'da-root',
            children: ['da-pandas', 'da-stats'],
            resources: [
                { type: 'documentation', title: 'Pandas Documentation', url: 'https://pandas.pydata.org/docs/', isFree: true }
            ],
            content: {
                overview: 'Python extends what you can do beyond SQL and spreadsheets. When data is messy, comes from multiple sources, or needs complex transformations, Python is the tool. pandas (data manipulation library) is the core: DataFrames represent tabular data, and methods like groupby(), merge(), pivot_table(), apply(), and resample() handle anything SQL can do and more. NumPy provides fast numerical operations on arrays. For statistical analysis, scipy.stats has hypothesis tests, and statsmodels provides regression and time series models. Jupyter notebooks combine code, output, and markdown for reproducible analysis.',
                keyConcepts: [
                    'pandas DataFrames and Series',
                    'Data cleaning: dropna, fillna, astype, str methods',
                    'Merging and joining datasets: merge, concat',
                    'GroupBy and aggregation with agg()',
                    'Pivot tables and cross-tabulation',
                    'NumPy arrays for numerical computation',
                    'Jupyter notebooks for interactive analysis',
                    'Regular expressions for text data cleaning'
                ],
                practiceQuestions: [
                    { question: 'When would you use Python over SQL for analysis?', hint: 'When data comes from multiple sources (APIs, CSVs, web scraping), needs complex text processing, or requires statistical modeling.', difficulty: 'medium' },
                    { question: 'What is a Jupyter notebook?', hint: 'An interactive environment where you can write code, see output, and add explanations in markdown — all in one document.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use Jupyter notebooks for exploration, .py scripts for production.',
                    'Chain pandas operations for readable transformations.',
                    'Profile data with .info(), .describe(), .value_counts() before analysis.',
                    'Version control your notebooks with Git.'
                ]
            }
        },
        'da-pandas': {
            id: 'da-pandas',
            label: 'Pandas & NumPy',
            description: 'Data cleaning, transformation, and numerical operations with Python.',
            parentId: 'da-python',
            resources: [],
            content: {
                overview: 'pandas is the most important Python library for data analysts. A DataFrame is a table with rows and columns (like a spreadsheet in code). Key operations include: reading data (pd.read_csv, read_excel, read_sql), filtering (df[df["price"] > 100]), selecting columns (df[["name", "price"]]), handling missing values (dropna, fillna), transforming data (apply, map, replace), and grouping (groupby with agg). Method chaining makes transformations readable. NumPy provides the underlying array operations and is faster than pure Python for numerical work.',
                keyConcepts: [
                    'Reading data: read_csv, read_excel, read_sql',
                    'Selecting and filtering: loc, iloc, boolean indexing',
                    'Handling missing data: isnull, dropna, fillna',
                    'Data types: astype, to_datetime, category',
                    'String operations: str.contains, str.replace, str.split',
                    'GroupBy: groupby().agg() for summarization',
                    'Merging DataFrames: merge, concat, join',
                    'NumPy: arrays, broadcasting, vectorized operations'
                ]
            }
        },
        'da-stats': {
            id: 'da-stats',
            label: 'Statistics',
            description: 'Hypothesis testing, distributions, probability, and regression.',
            parentId: 'da-python',
            resources: [],
            content: {
                overview: 'Statistics is the mathematical foundation of data analysis. Descriptive statistics (mean, median, mode, standard deviation, percentiles) summarize data. Probability distributions (normal, binomial, Poisson) model random processes. Hypothesis testing (t-tests, chi-square, ANOVA) determines whether observed differences are statistically significant or due to chance. Correlation measures the relationship between two variables. Regression analysis (linear and logistic) predicts outcomes based on input variables. A/B testing is a practical application of hypothesis testing used to compare two versions of a webpage, feature, or campaign.',
                keyConcepts: [
                    'Descriptive statistics: mean, median, mode, standard deviation',
                    'Probability distributions: normal, binomial, Poisson',
                    'Hypothesis testing: null hypothesis, p-values, significance level',
                    'T-tests for comparing means',
                    'Chi-square tests for categorical data',
                    'Correlation: Pearson, Spearman',
                    'Linear regression for prediction',
                    'A/B testing methodology'
                ],
                practiceQuestions: [
                    { question: 'What is a p-value?', hint: 'The probability of seeing your result (or more extreme) if the null hypothesis is true. Below 0.05 is typically considered significant.', difficulty: 'medium' },
                    { question: 'What is the difference between correlation and causation?', hint: 'Correlation means two variables move together. Causation means one actually causes the other. You need experiments to prove causation.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Check assumptions (normality, equal variance) before running statistical tests.',
                    'Report confidence intervals alongside p-values.',
                    'Use appropriate sample sizes for reliable results.',
                    'Distinguish between statistical significance and practical significance.'
                ]
            }
        },
        'da-visualization': {
            id: 'da-visualization',
            label: 'Data Visualization',
            description: 'Communicating findings visually with charts, dashboards, and reports.',
            parentId: 'da-root',
            children: ['da-tableau', 'da-matplotlib'],
            resources: [
                { type: 'article', title: 'Storytelling with Data (Book)', url: 'https://www.storytellingwithdata.com/', isFree: false }
            ],
            content: {
                overview: 'Data visualization is how analysts communicate findings to stakeholders. A well-designed chart can convey insights in seconds that would take paragraphs to explain in text. Choose the right chart for the relationship: bar charts for comparisons, line charts for trends over time, scatter plots for correlations, histograms for distributions, and pie charts only for parts-of-a-whole with few categories. Dashboards combine multiple visualizations into an interactive view of key metrics. The best analysts practice "storytelling with data" — structuring their visualizations into a narrative that guides the audience from question to insight to action.',
                keyConcepts: [
                    'Choosing the right chart for your data',
                    'Design principles: clear labels, minimal ink, no 3D effects',
                    'Interactive dashboards for stakeholders',
                    'Color theory: using color purposefully',
                    'Small multiples for comparing across categories',
                    'Annotations for highlighting key insights',
                    'Dashboard design for different audiences',
                    'Storytelling with data: narrative structure'
                ],
                practiceQuestions: [
                    { question: 'When should you NOT use a pie chart?', hint: 'When comparing more than 4-5 categories, when differences are small, or when you need to compare values precisely.', difficulty: 'easy' },
                    { question: 'What makes a dashboard effective?', hint: 'Clear hierarchy, no clutter, answers specific questions, interactive filters, and shows the most important metrics prominently.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always title and label your axes clearly.',
                    'Remove chart junk: gridlines, 3D effects, unnecessary legends.',
                    'Use color intentionally — to highlight, not to decorate.',
                    'Design for your audience: executives want summaries, analysts want detail.'
                ]
            }
        },
        'da-tableau': {
            id: 'da-tableau',
            label: 'Tableau / Power BI',
            description: 'Building interactive dashboards and business intelligence reports.',
            parentId: 'da-visualization',
            resources: [],
            content: {
                overview: 'Tableau and Power BI are the two dominant business intelligence tools. Tableau excels at creating beautiful, interactive visualizations with a drag-and-drop interface. Power BI integrates tightly with Microsoft products (Excel, Azure, SharePoint) and is more affordable. Both connect to databases, spreadsheets, and cloud services to build live dashboards. Tableau Public is free and a great way to build a portfolio. Power BI Desktop is also free. Key skills include creating calculated fields, building dashboard actions (filters, highlights), designing for mobile, and using parameters for user interactivity.',
                keyConcepts: [
                    'Connecting to data sources',
                    'Dimensions vs measures',
                    'Calculated fields and table calculations',
                    'Filters: context, data source, dimension, measure',
                    'Dashboard actions: filter, highlight, URL',
                    'Parameters for user input',
                    'Power BI DAX for calculations',
                    'Tableau Public for portfolio building'
                ]
            }
        },
        'da-matplotlib': {
            id: 'da-matplotlib',
            label: 'Matplotlib / Seaborn',
            description: 'Python visualization libraries for custom charts and statistical plots.',
            parentId: 'da-visualization',
            resources: [],
            content: {
                overview: 'matplotlib is the foundational Python visualization library — flexible but verbose. seaborn is built on top of matplotlib and creates beautiful statistical visualizations with minimal code. seaborn\'s strengths include heatmaps (correlation matrices), pair plots (all pairwise relationships), violin plots (distributions), and facet grids (small multiples). plotly creates interactive, web-based visualizations with hover tooltips, zoom, and click events. For data analysts, seaborn handles most needs. For interactive dashboards in Python, Streamlit or Dash let you build web apps from your analysis.',
                keyConcepts: [
                    'matplotlib: Figure, Axes, plt.plot, plt.bar, plt.scatter',
                    'Customizing matplotlib: colors, fonts, labels, legends',
                    'seaborn: heatmap, pairplot, violinplot, boxplot',
                    'Distribution plots: histplot, kdeplot',
                    'plotly for interactive charts',
                    'Streamlit for Python web dashboards',
                    'Subplots for multiple charts',
                    'Saving figures for reports: savefig, DPI settings'
                ]
            }
        }
    }
};
