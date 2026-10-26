const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

export async function getGithubUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("GitHub user not found");
  }
  return res.json();
}

export async function getRepos(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Failed to fetch repos");
  }
  return res.json();
}

export async function getRepoLanguages(username: string, repo: string) {
  const res = await fetch(`https://api.github.com/repos/${username}/${repo}/languages`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Failed to fetch repo languages");
  }
  return res.json();
}

export async function getCumulativeLanguages(username: string) {
  const repos = await getRepos(username);
  const totals: Record<string, number> = {};

  for (const repo of repos) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`, { headers, next: { revalidate: 3600 } });
    const languages = await res.json();
    for (const [language, bytes] of Object.entries(languages)) {
      totals[language] =
        (totals[language] || 0) + Number(bytes);
    }
  }
  return totals;
}