import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/authContext';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StartupBenefits | Exclusive SaaS Deals',
  description: 'Premium software deals for startups and founders.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-gray-100`}>
        <AuthProvider>
          <Navbar/>
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}