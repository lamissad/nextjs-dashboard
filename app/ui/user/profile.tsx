import { getCookies } from 'next-client-cookies/server';
import Image from 'next/image';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

import { UserProfile } from '@/app/lib/definitions';
import { getUser, getUsers, updateUser } from '../../lib/strapi/data';
import { fetchGitHubData } from '@/app/lib/strapi/github';

export default async function Profile() {
  const cookies = getCookies();
  const token = cookies.get('token') ?? '';
  console.log('username =>', token);
  let user = await getUser(token);
  console.log('user =>', user);

  const { data } = await fetchGitHubData(user.username);
  if (data?.email === null) {
    delete data.email;
  }
  const updatedUser = await updateUser(data, token, user.id);
  user = updatedUser ?? user;
  // useEffect(() => {
  //   // TODO: Move it to middleware
  //   // if (!isLoggedIn) router.push('/login');

  //   loadProfile();
  // }, [isLoggedIn, router]);

  // const loadProfile = async () => {
  //   // setLoading(true);
  //   try {
  //     const userData = await getUser();
  //     const { data: githubData } = await fetchGitHubData(userData.username);
  //     if (!githubData) {
  //       // setLoading(false);
  //       setUser(userData);
  //       return;
  //     }
  //     setUser(githubData as UserProfile);
  //   } catch (error) {
  //     //   setLoading(false);
  //     return (
  //       // TODO: Create a component for this
  //       <div className="flex h-full justify-center bg-gray-100">
  //         <div className="flex flex-col items-center justify-center">
  //           <h1 className="text-3xl font-bold">Error</h1>
  //           <p className="text-gray-600">Something went wrong</p>
  //         </div>
  //       </div>
  //     );
  //   } finally {
  //     //   setLoading(false);
  //   }
  // };

  // const refreshProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const userData = await getUser();
  //     console.log(userData);
  //     const { data, error } = await fetchGitHubData(userData.username);
  //     if (error) return;
  //     setUser(data as UserProfile);
  //     await updateUser(data); // Update user data in DB
  //   } catch (error) {
  //     console.error('Error:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
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
            {/* <Button
              onClick={refreshProfile}
              className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              <ArrowPathIcon className="mr-2 h-5 w-5" aria-hidden="true" />
              Profile
            </Button> */}
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
            <p className="text-gray-700">{user.readme ?? 'No bio available'}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
