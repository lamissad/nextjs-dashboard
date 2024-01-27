'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const fetchUserDetails = async (token: any) => {
  console.log('fetchUserDetails');
  console.log('token', token);
  try {
    const accessToken = token.token.access_token;
    const rawAccessToken = token.token['raw[access_token]'];
    const rawScope = token.token['raw[scope]'];
    const rawTokenType = token.token['raw[token_type]'];

    // Construct the query parameters
    const queryParams = new URLSearchParams({
      access_token: accessToken,
      'raw[access_token]': rawAccessToken,
      'raw[scope]': rawScope,
      'raw[token_type]': rawTokenType,
    });

    // Build the full URL with query parameters
    const callbackUrl = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/auth/github/callback?${queryParams.toString()}`;

    const response = await fetch(callbackUrl, {
      method: 'GET', // Specify the method if needed, GET is default

      credentials: 'include', // Keep this if your API requires cookies to be sent
    });
    // console.log('response', response);
    if (!response.ok) {
      return {
        data: null,
        error: `Failed to fetch GitHub user profile. Status: ${response.status}`,
      };
    }

    const data = await response.json();
    cookies().set('token', data.jwt);
    cookies().set('user', data.user);
    redirect('/profile');
    // return {
    //   data,
    //   error: null,
    // };
  } catch (error) {
    redirect('/login');
    // console.error('Error fetching GitHub user profile:', error);
    // return {
    //   data: null,
    //   error: `Error fetching GitHub user profile`,
    // };
  }
};
