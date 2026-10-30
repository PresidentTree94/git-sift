import { getGithubUser, getRepos, getRepoLanguages, getRepoReadMe, getRepoCommits } from "./github";
import { ReportData } from "@/types/ReportData";

export async function buildReport(username: string): Promise<ReportData> {
  const user = await getGithubUser(username);
  const repos = await getRepos(username);

  const now = new Date();
  const created = new Date(user.created_at);

  const resolvedRepos = await Promise.all(
    repos.map(async (repo: any) => ({
      url: repo.html_url,
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
    company: user.company,
    email: user.email,
    blog: user.blog,
    repos: resolvedRepos,
    followers: user.followers,
    months: (now.getFullYear() - created.getFullYear()) * 12 + (now.getMonth() - created.getMonth())
  };
}