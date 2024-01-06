'use client';
import React, { use, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../lib/definitions';
import { fetchGitHubData } from '../lib/strapi/github';
import { getUser, updateUser } from '../lib/strapi/data';
import Image from 'next/image';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import UserContext from '../lib/context/User';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const userContext = useContext(UserContext);
  const isLoggedIn = userContext?.user?.loggedIn;

  useEffect(() => {
    if (!isLoggedIn) router.push('/login');

    loadProfile();
  }, [isLoggedIn, router]);

  const loadProfile = async () => {
    setLoading(true);
    console.log('Loading profile...');
    try {
      const userData = await getUser();
      console.log(userData);
      const githubData = await fetchGitHubData(userData.username);
      console.log(githubData);
      setUser(githubData ? githubData : userData);
      console.log(githubData);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      // setUser(defaultUser);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    setLoading(true);
    try {
      const userData = await getUser();
      console.log(userData);
      const githubData = await fetchGitHubData(userData.username);
      setUser(githubData);
      await updateUser(githubData); // Update user data in DB
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex h-full justify-center bg-gray-100">
        {user && (
          <Card className="my-10 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between border-b border-gray-300 pb-4">
              <div className="flex items-center">
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
              <Button
                onClick={refreshProfile}
                className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                <ArrowPathIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Profile
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-gray-700">{user.followers}</p>
                <h3 className="text-lg font-semibold">Followers</h3>
              </div>
              <div>
                <p className="text-gray-700">{user.repository}</p>
                <h3 className="text-lg font-semibold">Repositories</h3>
              </div>
              <div>
                <p className="text-gray-700">{user.stars}</p>
                <h3 className="text-lg font-semibold">Stars</h3>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-lg font-semibold">Bio</h2>
              <p className="text-gray-700">
                {user.readme || 'No bio available'}
              </p>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
