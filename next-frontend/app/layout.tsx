import Link from "next/link";
import "./globals.css";

import NavBar from "./NavBar";

export const metadata = {
  title: "MarvinMarvin Productions",
  description: "Evan Martin's website to promote his productions business!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
