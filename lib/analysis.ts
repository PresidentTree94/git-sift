import { getGithubUser, getRepos, getRepoLanguages, getCumulativeLanguages } from "./github";
import { ReportData } from "@/types/ReportData";

export async function buildReport(username: string): Promise<ReportData> {
  const user = await getGithubUser(username);
  const repos = await getRepos(username);
  const languages = await getCumulativeLanguages(username);
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  const percentages = Object.entries(languages).map(([language, bytes]) => ({ language, percentage: Math.round((bytes / totalBytes) * 100) })).sort((a, b) => b.percentage - a.percentage);

  const resolvedRepos = await Promise.all(
    repos.map(async (repo: any) => ({
      id: repo.id,
      title: repo.name,
      description: repo.description,
      languages: await getRepoLanguages(username, repo.name),
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      pushed: repo.pushed_at
    }))
  );

  return {
    name: user.name,
    username: user.login,
    avatar: user.avatar_url,
    url: user.html_url,
    bio: user.bio,
    location: user.location,
    repos: resolvedRepos,
    followers: user.followers
  };
}