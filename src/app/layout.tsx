import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.scss";
import ReactQueryProvider from './Providers/ReactQueryProvider/ReactQueryProvider ';
import { SnackbarProviderUi } from './Providers/SnackbarProvider/SnackbarProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Posts",
  description: "all posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href='./vercel.svg' sizes="any" />
      <body className={inter.className}>
        <ReactQueryProvider>
          <SnackbarProviderUi>
            {children}
          </SnackbarProviderUi>
        </ReactQueryProvider>
        </body>
    </html>
  );
}
