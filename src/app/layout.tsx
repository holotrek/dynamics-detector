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

        <script
          defer
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="honeydoodat"
          data-description="Support me on Buy me a coffee!"
          data-message="Hey 👋 thanks for visiting! If you like this free site, buy me a coffee!"
          data-color="#5F7FFF"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        />
      </body>
    </html>
  );
}
