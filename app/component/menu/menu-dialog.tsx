'use client'

import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, NavLink, Divider } from '@mantine/core';
import Link from 'next/link';
import { IconEyeSearch, IconSortDescending } from '@tabler/icons-react';
import DarkModeButton from '../dark-mode-button';

export default function MenuDialog({ opened, close }: { opened: boolean, close: Function }) {

  function closeMenu() {
    close();
  }

  return (
    <>
      <Modal opened={opened} onClose={() => close()} title="Menu" yOffset={'3.5rem'} xOffset={0} className='menu-modal'
      zIndex={300}
      styles={{
        inner: { left: 0 }
      }}
      >
        <div>
          {/*<NavLink href='/screener' onClick={closeMenu} label="Screener" leftSection={<IconSortDescending style={{ width: 18, height: 18 }} className='dark:text-blue-500'/>} />
          <NavLink href='/analysis/AAPL' onClick={closeMenu}  label="Financial Statement Charts" leftSection={<IconEyeSearch style={{ width: 18, height: 18 }} className='dark:text-blue-500'/>} /> */}
          <Link href='/screener' onClick={closeMenu} className="flex flex-row py-3 dark:border-b-[--border-color-dark-rgb] hover:bg-opacity-10 hover:bg-black ">
            <IconSortDescending style={{ width: 18, height: 18 }} />
            <div className='ml-[10px]'>Screener</div>
          </Link>

          <Link href='/analysis/AAPL' onClick={closeMenu} className="flex flex-row py-3 dark:border-b-[--border-color-dark-rgb] hover:bg-opacity-10 hover:bg-black ">
            <IconEyeSearch style={{ width: 18, height: 18 }} />  
            {/* className='dark:text-blue-500'  */}
            <div className='ml-[10px]'>Financial Statement Charts</div>
          </Link>
          <Divider my="sm" />
          <div className=''>
            <DarkModeButton></DarkModeButton>
          </div>
        </div>
      </Modal>
    </>
  );
}