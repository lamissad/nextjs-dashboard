'use client';
import React, { useEffect, useState } from 'react';
import { UserProfile } from '../lib/definitions';
import { fetchGitHubData } from '../lib/strapi/github';
import { getUser } from '../lib/strapi/data';
import Image from 'next/image';

const ProfilePage: React.FC = () => {
  const defaultUser: UserProfile = {
    username: 'Default User',
    email: 'default@example.com',
    image: 'https://avatars.githubusercontent.com/exampleuser',
    followers: 0,
    repository: 0,
    stars: 0,
    readme: 'Default README content',
  };
  const [user, setUser] = useState<UserProfile | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (!isAuthenticated) return; // If not authenticated, exit the effect

    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const userData = await getUser();
      const githubData = await fetchGitHubData(userData.username);
      setUser(githubData);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      setUser(defaultUser);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {user && (
          <div className="m-auto w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center border-b border-gray-300 pb-4">
              <Image
                src={
                  user.image ||
                  'https://avatars.githubusercontent.com/exampleuser'
                }
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Bio</h2>
              <p className="text-gray-700">
                {user.readme || 'No bio available'}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <h3 className="text-lg font-semibold">Followers</h3>
                <p className="text-gray-700">{user.followers}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Repositories</h3>
                <p className="text-gray-700">{user.repository}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Stars</h3>
                <p className="text-gray-700">{user.stars}</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <a
                href={`https://github.com/${user.username}`}
                className="text-blue-600 hover:underline"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
