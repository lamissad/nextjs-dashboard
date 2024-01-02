// lib/github.ts

import { Repository, UserProfile } from '../definitions';

export const fetchGitHubUserProfile = async (
  username: string,
): Promise<UserProfile> => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user. Status: ${response.status}`);
  }
  const data = await response.json();
  return {
    username: data.login,
    email: data.email, // Note: GitHub API may not return email
    image: data.avatar_url,
    followers: data.followers,
    repository: data.public_repos,
    stars: 0, // Will be calculated separately
    readme: null, // Will be fetched separately
  };
};

export const fetchGitHubUserRepos = async (
  username: string,
): Promise<Repository[]> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repos. Status: ${response.status}`);
  }
  return response.json();
};

export const fetchGitHubRepoReadme = async (
  username: string,
  repoName: string,
): Promise<string> => {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/readme`,
    {
      headers: { Accept: 'application/vnd.github.VERSION.raw' },
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch README. Status: ${response.status}`);
  }
  return response.text();
};

export async function fetchGitHubData(username: string): Promise<UserProfile> {
  const userProfile = await fetchGitHubUserProfile(username);
  const userRepos = await fetchGitHubUserRepos(username);

  const starsCount = userRepos.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0,
  );
  let readmeContent = '';
  if (userRepos.length > 0) {
    readmeContent = await fetchGitHubRepoReadme(username, userRepos[0].name);
  }

  return {
    ...userProfile,
    stars: starsCount,
    readme: readmeContent,
  };
}
