import localFont from 'next/font/local';
import type { Metadata } from 'next';
import './globals.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const bravura = localFont({
  src: "./fonts/Bravura.woff",
  variable: "--font-bravura",
  weight: "100 900",
});
const bravuraText = localFont({
  src: "./fonts/BravuraText.woff",
  variable: "--font-bravura-text",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dynamics Detector",
  description:
    "Shows current level of dynamics recorded through the browser microphone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bravura.variable} ${bravuraText.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
