import React, { Suspense } from 'react';

import Profile from '../ui/user/profile';
import { CardSkeleton } from '../ui/skeletons';

const ProfilePage: React.FC = () => {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <Profile />
    </Suspense>
  );
};

export default ProfilePage;
