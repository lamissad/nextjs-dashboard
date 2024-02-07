import { EnvelopeIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { getUsers } from '../lib/strapi/data';

export default async function UsersList() {
  const defaultUsers = [
    {
      email: 'defaultUser1@example.com',
      username: 'Default User 1',
      image: 'https://via.placeholder.com/150',
    },
    {
      email: 'defaultUser2@example.com',
      username: 'Default User 2',
      image: 'https://via.placeholder.com/150',
    },

    // Add more default users as needed
  ];
  const users = await getUsers();
  console.log(users);
  // const users = { data: defaultUsers };
  return (
    <>
      <div className="flex h-screen bg-custom-beige">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8  text-3xl font-bold text-gray-800">Our Team</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {users &&
              users.data.map((person: any, index: number) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg bg-white shadow transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center p-4">
                    <Image
                      src={
                        person.image
                          ? person.image
                          : 'https://via.placeholder.com/150'
                      }
                      alt={person.username}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <h3 className="mt-4 text-lg font-semibold text-gray-800">
                      {person.username ? person.username : 'Default User'}
                    </h3>
                    <p className="text-gray-600">{person.email}</p>
                  </div>
                  <div className="bg-gray-100 p-4">
                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                      Send Email
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
