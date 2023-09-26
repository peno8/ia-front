import Image from 'next/image'
import { IconEyeSearch, IconSortDescending} from '@tabler/icons-react';
import { rem } from '@mantine/core';

export default function Sidebar() {
  return (
    <aside className='sidebar flex flex-col dark:text-sky-300 border-r dark:!border-r-[--border-color-dark-rgb]'>
      <div className="mx-[10px] flex flex-row px-[30px] py-[20px] border-b dark:border-b-[--border-color-dark-rgb] hover:bg-opacity-10 hover:bg-black ">
        {<IconSortDescending style={{ width: 18, height: 18 }} className='dark:text-blue-500'/>}
        {/* <Image src="/svg/list_numbered.svg" alt="Screener" width={20} height={20}/> */}
        <div className='ml-[10px]'>Screener</div>
      </div>
      <div className="mx-[10px] flex flex-row px-[30px] py-[20px] border-b dark:border-b-[--border-color-dark-rgb] hover:bg-opacity-10 hover:bg-black ">
        {<IconEyeSearch style={{ width: 18, height: 18 }} className='dark:text-blue-500'/>}
        {/* <Image src="/svg/search.svg" alt="Screener" width={20} height={20} className='text-white'/> */}
        <div className='ml-[10px]'>Zoom in</div>
      </div>
    </aside>
  )
}