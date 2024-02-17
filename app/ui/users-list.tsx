import Image from 'next/image';
import { getUsers } from '../lib/strapi/data';
import { refreshProfile } from '../lib/strapi/actions';

export default async function UsersList() {
  const users = await getUsers();

  return (
    <>
      <div className="">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
              Software Engineers
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              We have worked with thousands of amazing people
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {users &&
                users.data.map((user: any) => (
                  <div
                    key={user.id}
                    className="pt-8 sm:inline-block sm:w-full sm:px-4"
                  >
                    <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                      <figcaption className=" flex items-center gap-x-4">
                        <Image
                          src={
                            user.image
                              ? user.image
                              : 'https://via.placeholder.com/150'
                          }
                          alt={user.username}
                          width={500}
                          height={500}
                          className="h-20 w-20 rounded-full bg-gray-50"
                        />
                        <div className="overflow-hidden">
                          <div className="font-semibold text-gray-900">
                            {user.username}
                          </div>
                          <blockquote className="text-gray-900">
                            <p>{`${user.email}`}</p>
                          </blockquote>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate flex flex-col gap-10 overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:flex-row xl:items-center xl:py-32">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl xl:max-w-none xl:flex-auto">
              Is Your Profile Reflecting the Latest You?
            </h2>
            <form action={refreshProfile}>
              <button className="flex-none rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Update Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
