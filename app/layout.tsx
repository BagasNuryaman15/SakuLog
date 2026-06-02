import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "SakuLog",
  description: "Personal finance tracking for a single user."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
