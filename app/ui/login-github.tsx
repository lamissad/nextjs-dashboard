'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '../lib/context/User';

const LoginWithGithub = () => {
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);
  // const cookies = useCookies();
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const callbackUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/github/callback${location.search}`;
        const response = await fetch(callbackUrl, { credentials: 'include' });

        if (!response.ok) {
          throw new Error(
            `Couldn't login to Strapi. Status: ${response.status}`,
          );
        }

        const userData = await response.json();

        login(userData.jwt);

        router.push('/profile');
      } catch (error) {
        console.error('An error occurred during login:', error);
      }
    };

    if (location.search.includes('access_token')) {
      fetchUserDetails();
    }
  }, [router, login]);

  const handleGithubLogin = () => {
    const strapiConnectUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/connect/github`;
    router.push(strapiConnectUrl);
  };

  return (
    <Card className="flex h-1/2 w-1/2 flex-col items-center justify-center p-20 text-center ">
      <p className="mb-8">Log in with your GitHub account to get started</p>
      <Button onClick={handleGithubLogin} size="lg">
        Log in with GitHub
        <ArrowRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Button>
    </Card>
  );
};

export default LoginWithGithub;
