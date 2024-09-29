import type { Metadata } from "next";





export const metadata: Metadata = {
  title: "Crave | Dashboard ",
  description: "Recipe Sharing Community ",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
    User Dashboard sidebar
    {children}
  </div>
  );
}
