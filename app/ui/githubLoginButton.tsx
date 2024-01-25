'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function GithubLoginButton() {
  const router = useRouter();
  const handleGithubLogin = () => {
    const strapiConnectUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/connect/github`;
    router.push(strapiConnectUrl);
  };
  return (
    <Button onClick={handleGithubLogin} size="lg">
      Log in with GitHub
      {/* <ArrowRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
    </Button>
  );
}
