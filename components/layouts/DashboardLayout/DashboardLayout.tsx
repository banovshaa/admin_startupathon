import { ReactNode } from "react";
import styles from "./DashboardLayout.module.scss";
import Sidebar from "./Sidebar/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className={styles.dashboard__layout}>
      <div className={styles.sidebar__wrapper}>
        <Sidebar />
      </div>
      <div className={styles.children__wrapper}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
