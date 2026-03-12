export type Project = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  links?: {
    label: string;
    href: string;
  }[];
};

export const projects: Project[] = [
  {
    id: "mine-operating-risk-mvp",
    title: "Mine Operating Risk MVP",
    summary:
      "Mining operations review and risk-prioritization system built on public MSHA data. 91k mines and 1.4M mine-quarters feed a governed quarterly review spine, feature layer, logistic model, and Streamlit demo. Backtests across 2019–2021 delivered top-decile lift 6.06 with 0.382 precision and 0.606 recall.",
    stack: [
      "Python",
      "PostgreSQL",
      "SQL",
      "scikit-learn",
      "Streamlit",
      "dbt-style modeling",
      "BI views",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/saadshaiikh/mine-operating-risk-platform.git" },
    ],
  },
  {
    id: "trading-portfolio-analytics-platform",
    title: "Trading & Portfolio Analytics Research Platform",
    summary:
      "I built a repeatable backtest pipeline that downloads data, runs three baseline strategies across 4 tickers (2022–2024), and produces benchmark-relative reports and figures. In 12 runs, total returns ranged from -0.0439% to 0.7797%. SmaCross(5,20) ranked #1 with 0.3397% average return and the lowest average drawdown at 45.195%.",
    stack: ["Python", "Backtrader", "pandas", "matplotlib", "Streamlit", "yfinance"],
    links: [{ label: "GitHub", href: "https://github.com/saadshaiikh/trading-portfolio-analytics.git" }],
  },
  {
    id: "energy-ops-control-tower",
    title: "Energy Operations Control Tower",
    summary:
      "A portfolio-grade energy analytics and reporting platform that turns public EIA commodity data into weekly operational KPIs, anomaly insights, forecasts, and a stakeholder-ready Excel reporting pack.",
    stack: [
      "Python 3.11+",
      "PostgreSQL (Docker)",
      "pandas",
      "SQLAlchemy + psycopg2",
      "scikit-learn",
      "matplotlib",
      "openpyxl + XlsxWriter",
      "pytest",
      "ruff",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/saadshaiikh/energy-ops-control-tower.git" },
    ],
  },
  {
    id: "3d-product-configurator",
    title: "3D Product Configurator",
    summary:
      "Production-style 3D product customization experience with a real-time WebGL frontend and a Go API. Users can explore multiple models, tweak per-part materials and colors, and save/share configurations with backend persistence.",
    stack: [
      "React",
      "React Three Fiber",
      "Three.js",
      "Go",
      "PostgreSQL",
      "Playwright",
      "Docker Compose",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/saadshaiikh/3d-product-configurator.git" },
    ],
  },
];
