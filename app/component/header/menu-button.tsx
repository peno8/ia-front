'use client'

import { Burger } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import MenuDialog from "../menu/menu-dialog";
import { AppMetadata } from "@/app/app.store";

export default function MenuButton({ metadata }: { metadata : AppMetadata}) {
  const [opened, { toggle }] = useDisclosure();
  
  return(
    <div className="menu-button">
    
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" className="dark:!text-[--text-dark]"
      />
      <MenuDialog opened={opened} close={toggle} metadata={metadata}></MenuDialog>
    </div>
  )
}