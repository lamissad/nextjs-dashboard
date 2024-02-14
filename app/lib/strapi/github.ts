export const fetchGitHubUserProfile = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      return {
        data: null,
        error: `Failed to fetch GitHub user. Status: ${response.status}`,
      };
    }
    const data = await response.json();
    return {
      data: {
        username: data.login,
        email: data.email,
        image: data.avatar_url,
        followers: data.followers,
        repository: data.public_repos,
        stars: 0, // Will be calculated separately
        readme: null, // Will be fetched separately
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: `Error fetching GitHub user profile: ${error}`,
    };
  }
};

export const fetchGitHubUserRepos = async (username: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
    );
    if (!response.ok) {
      return {
        data: null,
        error: `Failed to fetch GitHub repos. Status: ${response.status}`,
      };
    }
    const repos = await response.json();
    return { data: repos, error: null };
  } catch (error) {
    return { data: null, error: `Error fetching GitHub user repos: ${error}` };
  }
};

export const fetchGitHubRepoReadme = async (
  username: string,
  repoName: string,
) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/readme`,
      { headers: { Accept: 'application/vnd.github.VERSION.raw' } },
    );
    if (!response.ok) {
      return {
        data: '',
        error: `Failed to fetch README. Status: ${response.status}`,
      };
    }
    const readmeContent = await response.text();
    return { data: readmeContent, error: null };
  } catch (error) {
    return { data: '', error: `Error fetching GitHub repo README: ${error}` };
  }
};

export async function fetchGitHubData(username: string) {
  if (!username) {
    return { data: null, error: 'Username is required' };
  }

  const userProfileResponse = await fetchGitHubUserProfile(username);
  if (userProfileResponse.error) {
    return { data: null, error: userProfileResponse.error };
  }

  const userReposResponse = await fetchGitHubUserRepos(username);
  if (userReposResponse.error) {
    return { data: null, error: userReposResponse.error };
  }

  const starsCount = userReposResponse.data.reduce(
    (acc: any, repo: { stargazers_count: any }) => acc + repo.stargazers_count,
    0,
  );

  let readmeContent = '';
  if (userReposResponse.data.length > 0) {
    const readmeResponse = await fetchGitHubRepoReadme(
      username,
      userReposResponse.data[0].name,
    );
    if (readmeResponse.error) {
      readmeContent = readmeResponse.error;
    } else {
      readmeContent = readmeResponse.data;
    }
  }

  return {
    data: {
      ...userProfileResponse.data,
      stars: starsCount,
      readme: readmeContent,
    },
    error: null,
  };
}
