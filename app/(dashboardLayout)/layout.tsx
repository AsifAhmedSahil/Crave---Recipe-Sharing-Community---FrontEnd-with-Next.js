import type { Metadata } from "next";





export const metadata: Metadata = {
  title: "Crave | Dashboard ",
  description: "Recipe Sharing Community ",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
    Dashboard navbar
    {children}
  </div>
  );
}
