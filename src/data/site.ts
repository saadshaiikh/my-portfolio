export type SiteMeta = {
  title: string;
  description: string;
  name: string;
  headline: string;
  hero: {
    statementOne: string;
    statementTwo: string;
  };
};

export const site: SiteMeta = {
  title: "Portfolio",
  description: "Site metadata placeholder.",
  name: "Saad Shaikh",
  headline: "CS+Data Science",
  hero: {
    statementOne: "1+ year building production AI, MLOps, and data systems",
    statementTwo: "Applied ML for markets, systems, and scale",
  },
};
