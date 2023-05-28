import "./globals.css";
import { Lora } from "next/font/google";

const lora = Lora({ weight: "400", subsets: ["latin"] });

import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import NavBar from "./NavBar";
config.autoAddCss = false;

export const metadata = {
  title: "MarvinMarvin Production",
  description: "MarvinMarvin Portfolio Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <main className="h-screen bg-slate-50">
          <div className="flex flex-col justify-center px-8 sm:px-32 2xl:px-64">
            <NavBar></NavBar>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
