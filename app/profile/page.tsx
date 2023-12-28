'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsAuthenticated(true);
    } else {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [router]);

  return isAuthenticated;
};

const ProfilePage: React.FC = () => {
  const isAuthenticated = useAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return; // If not authenticated, exit the effect

    const fetchUserData = async () => {
      const jwt = localStorage.getItem('jwt');
      try {
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`,
          {
            credentials: 'include',
            headers: { Authorization: `Bearer ${jwt}` },
          },
        );
        if (!userRes.ok)
          throw new Error(
            `Couldn't fetch user data. Status: ${userRes.status}`,
          );

        const userData = await userRes.json();
        const githubRes = await fetch(
          `https://api.github.com/users/${userData.username}`,
        );
        if (!githubRes.ok)
          throw new Error(
            `Couldn't fetch GitHub data. Status: ${githubRes.status}`,
          );

        const githubData = await githubRes.json();
        const repoRes = await fetch(
          `https://api.github.com/users/${userData.username}/repos`,
        );
        const repos = await repoRes.json();
        let starsCount = repos.reduce(
          (acc, repo) => acc + repo.stargazers_count,
          0,
        );

        let readmeContent = null;
        if (repos.length > 0) {
          const readmeRes = await fetch(
            `https://api.github.com/repos/${userData.username}/${repos[0].name}/readme`,
            {
              headers: { Accept: 'application/vnd.github.VERSION.raw' },
            },
          );
          if (readmeRes.ok) readmeContent = await readmeRes.text();
        }

        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userData.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              image: githubData.avatar_url,
              followers: githubData.followers,
              repository: githubData.public_repos,
              stars: starsCount,
              readme: readmeContent,
            }),
          },
        );

        setUser({
          ...userData,
          image: githubData.avatar_url,
          followers: githubData.followers,
          repository: githubData.public_repos,
          stars: starsCount,
          readme: readmeContent,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  if (loading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && (
        <div className="flex h-screen items-center justify-center">
          <div className="max-w-md rounded-lg bg-white p-6 shadow-lg">
            <img
              className="mx-auto h-32 w-32 rounded-full object-cover"
              src={
                user.image ||
                'https://avatars.githubusercontent.com/exampleuser'
              }
              alt="Profile Picture"
            />
            <h2 className="mt-4 text-center text-xl font-bold">
              {user?.username}
            </h2>
            <p className="text-center text-gray-500">{user?.email}</p>
            <div className="mt-4 text-center">
              <p>Followers: {user.followers}</p>
              <p>Repositories: {user.repository}</p>
              <p>Stars: {user.stars}</p>
              {user.readme ? (
                <div className="mt-4 overflow-auto">
                  <pre>{user.readme}</pre>
                </div>
              ) : (
                <p>No README available</p>
              )}
              <a
                href={`https://github.com/${user.username}`}
                className="mt-4 inline-block text-blue-500 hover:underline"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
