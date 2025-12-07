import localFont from 'next/font/local';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff2',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'AgentForge - Multi-Agent AI System Builder',
  description:
    'Design, configure, and deploy autonomous multi-agent AI systems with real code execution capabilities.',
  keywords: ['AI', 'multi-agent', 'automation', 'pipeline builder', 'code execution'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
