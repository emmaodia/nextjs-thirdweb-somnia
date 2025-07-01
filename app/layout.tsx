import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThirdwebProvider } from 'thirdweb/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Thirdweb AA on Somnia',
  description: 'Account Abstraction demo on Somnia blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThirdwebProvider>
          <main className='min-h-screen bg-zinc-950 text-white'>
            <div className='container mx-auto px-4 py-16'>{children}</div>
          </main>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
