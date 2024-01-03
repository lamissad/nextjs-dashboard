import './globals.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Header from './ui/header';
import { UserProvider } from './lib/context/User';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <UserProvider>
          {' '}
          {/* Wrap with UserProvider */}
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
