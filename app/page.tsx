import { Suspense } from 'react';
import UsersList from './ui/users-list';

export default async function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <UsersList />
      </Suspense>
    </>
  );
}
