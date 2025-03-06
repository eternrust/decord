import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/layout/Header";

const Pretendard = localFont({
  src: './PretendardVariable.woff2',
})

export const metadata: Metadata = {
  title: "decord",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={Pretendard.className}
      >
        <Header />
        <main className="min-h-screen min-w-[550px] pt-[60px]">
          {children}
        </main>
        <Toaster
          position="top-center"
          reverseOrder={true}
          gutter={8}
          toastOptions={{
            className: 'bg-white text-black',
            duration: 3000
          }}
        />
      </body>
    </html>
  );
}
