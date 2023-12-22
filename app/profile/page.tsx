'use client';

import { use, useEffect, useState } from 'react';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log('RES', res);
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res.json(); // Assuming the response is JSON. Don't forget to handle it accordingly.
      })
      .then((data) => {
        console.log('RESULTTT v=>', data); // This will log the actual data from the response
        setUser(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <img
          className="mx-auto h-32 w-32 rounded-full"
          src="https://avatars.githubusercontent.com/exampleuser"
          alt="Profile Picture"
        />
        <h2 className="mt-4 text-xl font-bold">{user?.username}</h2>
        <p className="text-gray-500">{user.email}</p>
        <div className="mt-4">
          <a
            href="https://github.com/exampleuser"
            className="text-blue-500 hover:underline"
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
