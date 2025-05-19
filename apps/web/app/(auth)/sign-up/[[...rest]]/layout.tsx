import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Template',
  description: 'Sign up to unlock the full potential of Template',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (children);
}
