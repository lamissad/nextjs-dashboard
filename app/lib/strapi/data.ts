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
      // Log the error or handle it as needed without throwing
      console.error(`Failed to fetch users. Status: ${response.status}`);
      return {
        data: null,
        error: `Failed to fetch users. Status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Error fetching users' };
  }
}

export async function getUser(jwt: string) {
  if (!jwt) {
    console.error('JWT not found');
    return { data: null, error: 'JWT not found' };
  }

  try {
    const userRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`,
      {
        credentials: 'include',
        headers: { Authorization: `Bearer ${jwt}` },
      },
    );

    if (!userRes.ok) {
      console.error(`Couldn't fetch user data. Status: ${userRes.status}`);
      return {
        data: null,
        error: `Couldn't fetch user data. Status: ${userRes.status}`,
      };
    }

    const data = await userRes.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { data: null, error: 'Error fetching user' };
  }
}

export async function updateUser(data: any, jwt: string, id: number) {
  if (!jwt) {
    console.log('JWT not found');
    return { data: null, error: 'JWT not found' };
  }

  try {
    const userRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
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
      console.error(`Couldn't update user data. Status: ${userRes.status}`);
      return {
        data: null,
        error: `Couldn't update user data. Status: ${userRes.status}`,
      };
    }

    const updatedData = await userRes.json();
    return { data: updatedData, error: null };
  } catch (error) {
    console.error('Error updating user:', error);
    return { data: null, error: 'Error updating user' };
  }
}
