export type ReportData = {
  name: string;
  username: string;
  avatar: string;
  url: string;
  bio: string;
  location: string;
  repos: {
    id: string;
    title: string;
    description: string;
    topics: string[];
    languages: Record<string, number>;
    hasReadMe: boolean;
    stars: number;
    forks: number;
    pushed: string;
  }[];
  followers: number;
  years: number;
}