import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "ui/styles/globals.css";
import { Providers } from "../components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Max Wiseman",
  description: "Developer based in Knoxville, TN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
