import type { Metadata } from "next";

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
    <div>
        common nav
        {children}
        </div>
  );
}
