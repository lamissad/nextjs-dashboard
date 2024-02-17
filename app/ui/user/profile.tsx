import { getCookies } from 'next-client-cookies/server';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { getUser, updateUser } from '../../lib/strapi/data';
import { fetchGitHubData } from '@/app/lib/strapi/github';
import remarkGfm from 'remark-gfm';

export default async function Profile() {
  const cookies = getCookies();
  const token = cookies.get('token') ?? '';
  const userResponse = await getUser(token);

  // Early return if user fetch was unsuccessful
  if (!userResponse.data) {
    return <div>Error loading user data: {userResponse.error}</div>;
  }

  let user = userResponse.data;

  // Fetch additional GitHub data only if user data is successfully fetched
  if (user) {
    const githubResponse = await fetchGitHubData(user.username);
    if (githubResponse.data && githubResponse.data.email === null) {
      delete githubResponse.data.email;
    }
    if (githubResponse.data) {
      const updateResponse = await updateUser(
        githubResponse.data,
        token,
        user.id,
      );
      user = updateResponse.data ?? user;
    }
  }

  return (
    <>
      <div className="bg-white pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32">
        <div className="bg-gray-900 pb-20 sm:pb-24 xl:pb-0">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
            <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
              <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                <Image
                  src={
                    user.image ||
                    'https://avatars.githubusercontent.com/exampleuser'
                  }
                  alt="Profile Picture"
                  width={384}
                  height={532}
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                />
              </div>
            </div>
            <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
              <figure className="relative isolate">
                <blockquote className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                  <div className="mb-4 grid grid-cols-3 gap-4 text-center">
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
                </blockquote>
                <figcaption className="mt-8 text-base">
                  <div className="font-semibold text-white">
                    {user.username}
                  </div>
                  <div className="mt-1 text-gray-400">{user.email}</div>
                </figcaption>
              </figure>
            </div>
          </div>
          {user && user.readme && (
            <div className="bg-white py-16 sm:py-24">
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative isolate flex flex-col gap-10 overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:flex-row xl:items-center xl:py-32">
                  <h2 className="max-w-lg text-xl font-light tracking-tight text-white sm:text-lg xl:max-w-none xl:flex-auto">
                    Behind the Code:
                  </h2>
                  <h3 className="max-w-lg text-lg font-light tracking-tight text-white sm:text-sm xl:max-w-none xl:flex-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {user.readme}
                    </ReactMarkdown>
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
