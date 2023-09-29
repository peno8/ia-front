import Image from 'next/image'
import { IconEyeSearch, IconSortDescending} from '@tabler/icons-react';
import { rem } from '@mantine/core';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className='sidebar flex flex-col dark:text-sky-300 border-r dark:!border-r-[--border-color-dark-rgb]'>
      <Link href='/screener' className="mx-[10px] flex flex-row px-[30px] py-[20px] border-b dark:border-b-[--border-color-dark-rgb] hover:bg-opacity-10 hover:bg-black ">
        {<IconSortDescending style={{ width: 18, height: 18 }} className='dark:text-blue-500'/>}
        <div className='ml-[10px]'>Screener</div>
      </Link>
      <Link href='/analysis' className="mx-[10px] flex flex-row px-[30px] py-[20px] border-b dark:border-b-[--border-color-dark-rgb] hover:bg-opacity-10 hover:bg-black ">
        {<IconEyeSearch style={{ width: 18, height: 18 }} className='dark:text-blue-500'/>}
        <div className='ml-[10px]'>Analyse Company</div>
      </Link>
    </aside>
  )
}