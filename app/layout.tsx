import "./globals.css";
import { Space_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const font = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import NavBar from "@/components/NavBar";
config.autoAddCss = false;

export const metadata = {
  title: "Evan J. Martin Productions",
  description:
    "Professional music production services from South Leeds and Eiger Studios. Working with artists across all budgets to create exceptional music.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`bg-white ${font.className}`}>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <div className="flex-1">{children}</div>
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
