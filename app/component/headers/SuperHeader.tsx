import Link from "next/link";
import { AppMetadata } from "../../app.store";
import styles from "./superHeader.module.scss";

const NAV_ITEMS = [
  { name: "Screener", href: "/screener" },
  // { name: "About", href: "/about" },
];

export default function SuperHeader({ metadata }: { metadata: AppMetadata }) {
  return (
    <div className={`${styles.superHeader}`}>
      <nav className={styles.navContainer}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.name} href={item.href} className={styles.navLink}>
            {item.name}
          </Link>
        ))}
      </nav>
      <div
        className={`${styles.optionBarContent} flex flex- items-center mr-12`}
      >
        {/* <DarkModeButton></DarkModeButton> */}
        <div className={`${styles.lastUpdated} dark:text-[--text-dark]`}>
          {`Last Updated: ` + metadata?.DATE}
        </div>
      </div>
    </div>
  );
}
