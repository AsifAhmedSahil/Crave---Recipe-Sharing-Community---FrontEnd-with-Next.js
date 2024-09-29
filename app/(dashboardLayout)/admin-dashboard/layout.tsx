import type { Metadata } from "next";





export const metadata: Metadata = {
  title: "Crave | Dashboard ",
  description: "Recipe Sharing Community ",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
    Admin Dashboard sidebar
    {children}
  </div>
  );
}
