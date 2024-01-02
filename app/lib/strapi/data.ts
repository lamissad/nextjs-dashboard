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
