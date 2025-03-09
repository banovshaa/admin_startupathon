import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import { UserProvider } from "@/components/providers/UserProvider";
import React from "react";

export const metadata = {
  title: "Admin",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <DashboardLayout>{children}</DashboardLayout>;
    </UserProvider>
  );
}
