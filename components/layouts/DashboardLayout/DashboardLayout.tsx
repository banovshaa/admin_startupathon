import { ReactNode } from "react";
import styles from "./DashboardLayout.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import LogoIcon from "@/assets/images/logo.svg";
import Image from "next/image";

interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className={styles.dashboard__layout}>
      <div className={`${styles.sidebar__wrapper} container`}>
        <div className={styles.logo}>
          <Image src={LogoIcon} alt="Logo" />
        </div>
        <Sidebar />
      </div>
      <div className={styles.children__wrapper}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
