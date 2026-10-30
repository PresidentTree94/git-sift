export type ReportData = {
  name: string;
  username: string;
  avatar: string;
  url: string;
  bio: string;
  location: string;
  company: string;
  email: string;
  blog: string;
  repos: {
    url: string;
    title: string;
    description: string;
    languages: Record<string, number>;
    hasReadMe: boolean;
    stars: number;
    forks: number;
    commits: {
      commit: {
        author: {
          name: string;
          date: string;
        }
      }
    }[];
    pushed: string;
  }[];
  followers: number;
  months: number;
}