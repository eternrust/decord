import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Toaster } from "react-hot-toast";
import MainLayout from "@/components/layout/MainLayout";
import "./globals.css";

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
    <html lang="ko">
      <body
        className={Pretendard.className}
      >
        <MainLayout>
          {children}
        </MainLayout>
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
