"use client";

import { Modal, Divider } from "@mantine/core";
import Link from "next/link";
import { IconSortDescending } from "@tabler/icons-react";
import { AppMetadata } from "@/app/app.store";

export default function MenuDialog({
  opened,
  close,
  metadata,
}: {
  opened: boolean;
  close: Function;
  metadata: AppMetadata;
}) {
  function closeMenu() {
    close();
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => close()}
        title=""
        yOffset={"3.5rem"}
        xOffset={0}
        className="menu-modal"
        zIndex={300}
        styles={{
          inner: { left: 0 },
        }}
      >
        <div>
          <Link
            href="/screener"
            onClick={closeMenu}
            className="flex flex-row py-3 dark:border-b-[--border-color-dark-rgb] hover:bg-opacity-10 hover:bg-black "
          >
            <IconSortDescending style={{ width: 18, height: 18 }} />
            <div className="ml-2.5">Screener</div>
          </Link>
          <Divider my="sm" />
          <div className="py-3 dark:text-[--text-dark]">
            {`Last Updated: ` + metadata?.DATE}
          </div>
        </div>
      </Modal>
    </>
  );
}
