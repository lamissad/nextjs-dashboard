// export async function getUserDetails() {
//     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
//         credentials: 'include',
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('jwt')}`
//         },
//     })
//     .then((res) => {
//         console.log('RES', res);
//         if (res.status !== 200) {
//             throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
//         }
//         return res.json(); // Assuming the response is JSON. Don't forget to handle it accordingly.
//     })
//     .then((data) => {
//         console.log('RESULTTT v=>', data); // This will log the actual data from the response
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

// }

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
