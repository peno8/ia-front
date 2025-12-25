import Image from "next/image";
import AutocompleteSearch from "./autocompleteSearch";
import Link from "next/link";
import SuperHeader from "./SuperHeader";
import styles from "./header.module.scss";
import MenuButton from "./menu-button";
import { getMetadata } from "@/app/app.store";

export default async function Header({
  companyDefStr,
}: {
  companyDefStr: string;
}) {
  const metadata = await getMetadata();
  return (
    <header className={styles.header}>
      {/* flex items-center justify-between align-center flex-nowrap h-24 */}
      {/* <div className={`${styles.headerMain} `}> */}
      <Link href={"/screener"}>
        <div className="flex flex-row align-center">
          <div className="w-6.25 h-6.25 mr-1">
            <Image src="/image/logo.png" alt="logo" width={20} height={20} />
          </div>
          <div
            className={`${styles.logoText} text-[16px] font-semibold ml-2.5 dark:text-white`}
          >
            interactive-alpha
          </div>
        </div>
      </Link>
      <AutocompleteSearch companyDefStr={companyDefStr}></AutocompleteSearch>
      <div>
        <MenuButton metadata={metadata}></MenuButton>
      </div>
    </header>
  );
}
