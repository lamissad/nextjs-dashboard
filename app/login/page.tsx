import LoginWithGithub from '../ui/login-github';

export default function LoginPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log('params=>', params);
  console.log('searchParams =>', searchParams);
  return (
    <main
      className="flex items-center justify-center md:h-screen"
      style={{
        backgroundImage: "url('/github.png')",
        backgroundSize: 'cover',
      }}
    >
      <LoginWithGithub />
    </main>
  );
}
