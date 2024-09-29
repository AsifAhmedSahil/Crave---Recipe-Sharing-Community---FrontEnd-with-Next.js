import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: "Crave | Recipe Sharing Community ",
  description: "Recipe Sharing Community ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        
        {children}
        footer
      </body>
    </html>
  );
}
