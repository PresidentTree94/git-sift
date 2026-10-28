import { getGithubUser, getRepos, getRepoLanguages, getRepoReadMe, getRepoCommits } from "./github";
import { ReportData } from "@/types/ReportData";

export async function buildReport(username: string): Promise<ReportData> {
  const user = await getGithubUser(username);
  const repos = await getRepos(username);

  const resolvedRepos = await Promise.all(
    repos.map(async (repo: any) => ({
      id: repo.id,
      title: repo.name,
      description: repo.description,
      topics: repo.topics,
      languages: await getRepoLanguages(username, repo.name),
      hasReadMe: await getRepoReadMe(username, repo.name),
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      commits: await getRepoCommits(username, repo.name),
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
    followers: user.followers,
    months: new Date().getMonth() - new Date(user.created_at).getMonth()
  };
}