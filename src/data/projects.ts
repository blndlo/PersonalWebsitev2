// The first tag of each project picks its thumbnail colour (see src/lib/tags.ts).
// To use a screenshot instead, import it from src/assets and set `image`.

export type Project = {
  id: string;
  title: string;
  /** One or two lines shown on the card */
  summary: string;
  /** Fuller description shown in the detail modal */
  description: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
};

// Add projects here. While the list is empty the page shows "Coming soon".
// Example:
// {
//   id: 'serverless-api',
//   title: 'Serverless API',
//   summary: 'A REST API built on AWS Lambda and API Gateway.',
//   description: 'Fuller description shown in the modal.',
//   tags: ['AWS', 'Lambda'],
//   githubUrl: 'https://github.com/blndlo/<repo>',
//   liveUrl: 'https://example.com',
// },
export const projects: Project[] = [];

/** Filter options: "All" plus every tag used by at least one project */
export const projectTags = ['All', ...new Set(projects.flatMap((project) => project.tags))];
