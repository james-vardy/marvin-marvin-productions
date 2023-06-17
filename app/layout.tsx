import "./globals.css";
import { Space_Mono } from "next/font/google";

const font = Space_Mono({
  weight: "400",
  subsets: ["latin"],
});

import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import NavBar from "./NavBar";
config.autoAddCss = false;

export const metadata = {
  title: "MarvinMarvin Productions",
  description: "MarvinMarvin Portfolio Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className={`bg-slate-100 ${font.className}`}>
          <div className="flex flex-col justify-center px-8 md:px-32 2xl:px-64">
            <NavBar></NavBar>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
