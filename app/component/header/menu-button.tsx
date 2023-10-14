'use client'

import { Burger } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import MenuDialog from "../menu/menu-dialog";

export default function MenuButton() {
  const [opened, { toggle }] = useDisclosure();
  console.log(opened);
  return(
    <div className="menu-button">
    
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
      <MenuDialog opened={opened} close={toggle}></MenuDialog>
    </div>
  )
}