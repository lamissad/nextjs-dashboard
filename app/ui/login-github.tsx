// 'use client';

// import React, { useContext, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import UserContext from '../lib/context/User';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fetchUserDetails } from '../lib/strapi/data';
import { redirect } from 'next/navigation';
import GithubLoginButton from './githubLoginButton';

const LoginWithGithub = async (token: any) => {
  // const router = useRouter();
  // const userContext = useContext(UserContext);
  const userData = await fetchUserDetails(token);
  console.log(userData);

  // useEffect(() => {
  //   // const fetchUserDetails = async () => {
  //   //   try {
  //   //     const callbackUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/github/callback${location.search}`;
  //   //     const response = await fetch(callbackUrl, { credentials: 'include' });

  //   //     if (!response.ok) {
  //   //       throw new Error(
  //   //         `Couldn't login to Strapi. Status: ${response.status}`,
  //   //       );
  //   //     }

  //   //     const userData = await response.json();
  //   //     localStorage.setItem('jwt', userData.jwt);
  //   //     localStorage.setItem('username', userData.user.username);

  //   //     userContext?.signIn({ name: userData.user.username, loggedIn: true });
  //   //     router.push('/profile');
  //   //   } catch (error) {
  //   //     console.error('An error occurred during login:', error);
  //   //   }
  //   // };

  //   if (location.search.includes('access_token')) {
  //     fetchUserDetails();
  //   }
  // }, [router, userContext]);

  const handleGithubLogin = () => {
    const strapiConnectUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/connect/github`;
    // router.push(strapiConnectUrl);
    redirect(strapiConnectUrl);
  };

  return (
    <Card className="flex h-1/2 w-1/2 flex-col items-center justify-center p-20 text-center ">
      <p className="mb-8">Log in with your GitHub account to get started</p>
      {/* <Button onClick={handleGithubLogin} size="lg">
        Log in with GitHub
        <ArrowRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Button> */}
      <GithubLoginButton />
    </Card>
  );
};

export default LoginWithGithub;
