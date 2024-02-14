import { Suspense } from 'react';
import UsersList from './ui/users-list';
import { CardSkeleton } from './ui/skeletons';

export default async function Page() {
  return (
    <>
      <Suspense fallback={<CardSkeleton />}>
        <UsersList />
      </Suspense>
    </>
  );
}
