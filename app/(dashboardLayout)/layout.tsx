import type { Metadata } from "next";





export const metadata: Metadata = {
  title: "Crave | Dashboard ",
  description: "Recipe Sharing Community ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
    Dashboard Navbar
    {children}
  </div>
  );
}
