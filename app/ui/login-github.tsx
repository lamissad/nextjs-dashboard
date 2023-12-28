'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import UserContext from '../lib/context/User'; // Adjust the import path as needed
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function LoginWithGithub() {
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    // Check if we have an access token in the URL (after redirection from GitHub)
    if (location.search.includes('access_token')) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/github/callback${location.search}`,
        {
          credentials: 'include',
        },
      )
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
          }
          return res.json();
        })
        .then((res) => {
          localStorage.setItem('jwt', res.jwt);
          localStorage.setItem('username', res.user.username);
          userContext?.signIn({ name: res.user.username, loggedIn: true });
          router.push('/profile'); // Redirect to the profile page after successful login
        })
        .catch((err) => {
          console.error('An error occurred during login:', err);
        });
    }
  }, [router, userContext]);

  function handleGithubLogin() {
    const strapiConnectUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/connect/github`;
    window.location.href = strapiConnectUrl;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={handleGithubLogin}
        className="flex items-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white hover:bg-gray-700"
      >
        Log in with GitHub
        <ArrowRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
