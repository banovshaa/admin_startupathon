import { sidebarNavigation } from "@/constants/options.contant";
import styles from "./Sidebar.module.scss";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.sidebar__navigation}>
        {sidebarNavigation.map((nav, index) => (
          <Link key={`${nav.value}__${index}`} href={nav.path}>
            <span>{nav.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
