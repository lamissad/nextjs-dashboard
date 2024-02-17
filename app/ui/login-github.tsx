'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '../lib/context/User';

const LoginWithGithub = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const callbackUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/github/callback${location.search}`;
        const response = await fetch(callbackUrl, { credentials: 'include' });

        if (!response.ok) {
          // Instead of throwing an error, we're setting an error message based on the response status
          setError(
            `Login failed with status: ${response.status}. Please try again.`,
          );
        } else {
          const userData = await response.json();
          login(userData.jwt);
          router.push('/profile');
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
        // Handle any other errors that might occur during fetching
        setError(
          'An unexpected error occurred while logging in. Please try again.',
        );
      } finally {
        setLoading(false);
      }
    };

    if (location.search.includes('access_token')) {
      fetchUserDetails();
    }
  }, [router, login]);

  const handleGithubLogin = () => {
    setLoading(true);
    const strapiConnectUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/connect/github`;
    router.push(strapiConnectUrl);
  };

  return (
    <Card className="flex h-1/2 w-1/2 flex-col items-center justify-center p-20 text-center">
      <p className="mb-8">Log in with your GitHub account to get started</p>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <Button onClick={handleGithubLogin} size="lg" disabled={loading}>
        {loading ? 'Logging in...' : 'Log in with GitHub'}
        <ArrowRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Button>
    </Card>
  );
};

export default LoginWithGithub;
