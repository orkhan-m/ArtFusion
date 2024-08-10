import { config } from "@/config";
import { cookieToInitialState } from "@alchemy/aa-alchemy/config";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Embedded Accounts Getting Started",
  description: "Embedded Accounts Quickstart Guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined
  );

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
