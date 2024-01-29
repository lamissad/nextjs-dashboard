import React, { Suspense } from 'react';

import Profile from '../ui/user/profile';

const ProfilePage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loadinggg...</div>}>
      <Profile />
    </Suspense>
  );
};

export default ProfilePage;
