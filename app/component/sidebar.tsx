'use client'

import { IconEyeSearch, IconLayoutSidebarLeftCollapse, IconLayoutSidebarRightCollapse, IconSortDescending} from '@tabler/icons-react';
import { rem } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [closed, setClosed] = useState(false);

  return (
    <aside className={'sidebar flex flex-col  dark:text-sky-300 border-r dark:!border-r-[--border-color-dark-rgb]' + (closed? ` sidebar-closed ` : ``)}>
      <div className='flex flex-row justify-end'>
        <button className='p-2 m-2 ia-hover' onClick={() => setClosed(!closed)}>
          {closed?  <IconLayoutSidebarRightCollapse size={'1.5rem'} className=' text-slate-500 dark:text-blue-500'/> :
           <IconLayoutSidebarLeftCollapse size={'1.5rem'} className=' text-slate-500 dark:text-blue-500'/>}
          
        </button>
      </div>
      <div className={closed? `sidebar-contents-closed` : ``}>
        <Link href='/screener' className="m-1 flex flex-row p-3 ia-hover ">
          {<IconSortDescending style={{ width: 18, height: 18 }} className='dark:text-blue-500'/>}
          <div className='ml-[10px]'>Screener</div>
        </Link>
        {/* border-b dark:border-b-[--border-color-dark-rgb]  */}
        <Link href='/analysis/AAPL' className="m-1 flex flex-row p-3 hover:bg-opacity-10 hover:bg-black ">
          {<IconEyeSearch style={{ width: 18, height: 18 }} className='dark:text-blue-500'/>}
          <div className='ml-[10px]'>Analyse Company</div>
        </Link>
      </div>
    </aside>
  )
}