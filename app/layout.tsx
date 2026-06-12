import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AquaFix Home Services — Plumbing, Electrical, HVAC',
  description:
    'Expert home services when you need them most. Licensed plumbers, electricians, and HVAC technicians available 24/7. Free estimates, upfront pricing, satisfaction guaranteed.',
  openGraph: {
    title: 'AquaFix Home Services',
    description:
      'Licensed, insured, and committed to your satisfaction. 24/7 emergency service with upfront pricing.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
