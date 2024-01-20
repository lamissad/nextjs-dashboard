import LoginWithGithub from '../ui/login-github';

export default function LoginPage() {
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
