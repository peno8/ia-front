"use client";

import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MenuDialog from "../menu/menu-dialog";
import { AppMetadata } from "@/app/app.store";
import styles from "./header.module.scss";

export default function MenuButton({ metadata }: { metadata: AppMetadata }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <div className={styles.menuButton}>
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
      <MenuDialog
        opened={opened}
        close={toggle}
        metadata={metadata}
      ></MenuDialog>
    </div>
  );
}
