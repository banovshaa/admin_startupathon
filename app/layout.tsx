import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/assets/css/global.scss";
import LoaderProvider from "@/components/providers/LoaderProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <LoaderProvider>{children}</LoaderProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
