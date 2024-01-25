export async function getUsers() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
      {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      },
    );

    if (response.status !== 200) {
      // Handle non-200 responses if needed
      throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }

    const data = await response.json();
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      data: null,
      error: error,
    };
  }
}

export async function getUser() {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    throw new Error('JWT not found');
  }

  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`,
    {
      credentials: 'include',
      headers: { Authorization: `Bearer ${jwt}` },
    },
  );
  if (!userRes.ok) {
    throw new Error(`Couldn't fetch user data. Status: ${userRes.status}`);
  }
  return await userRes.json();
}

export async function updateUser(data: any) {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    throw new Error('JWT not found');
  }

  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );
  if (!userRes.ok) {
    throw new Error(`Couldn't update user data. Status: ${userRes.status}`);
  }
  return await userRes.json();
}

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
    console.log('callbackUrl', callbackUrl);
    console.log('callbackUrl', callbackUrl);

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
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching GitHub user profile:', error);
    return {
      data: null,
      error: `Error fetching GitHub user profile`,
    };
  }
};
