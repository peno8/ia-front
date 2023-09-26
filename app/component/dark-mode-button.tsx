"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes";
import { ActionIcon } from '@mantine/core';
import { IconMoonStars, IconBrightnessDown } from '@tabler/icons-react';

function getDarkModeIcon(theme: string | undefined) {
  if(theme === 'light') 
    return <IconMoonStars style={{ width: '70%', height: '70%' }} stroke={1.5} className="bg-transparent" /> 
  else
    return <IconBrightnessDown style={{ width: '70%', height: '70%' }} stroke={1.5} className="bg-transparent" /> 
}

const getText =  (theme: string | undefined) => {
  if(theme === 'light') return 'Dark mode' 
  else return 'Light mode';
}
 
export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // const currentTheme = theme === 'system' ? systemTheme : theme;
  console.log('DarkModeButton' + theme);

  useEffect(() => {
    setMounted(true);
  }, [])

  if(!mounted) {
    return null;
  }

  return (

    <div className='flex flex-row items-center mr-5'>
      <ActionIcon variant="default" aria-label="Settings" className="!bg-transparent hover:!bg-white dark:hover:!bg-slate-500 dark:text-[--text-dark] !border-0"
        onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}>
        {getDarkModeIcon(theme)}
      </ActionIcon>
      <div className='dark:text-[--text-dark]'>{getText(theme)}</div>
      
    </div>
  )
}

// export default function DarkModeButton2() {
//     const { systemTheme, theme, setTheme } = useTheme();
//     const currentTheme = theme === 'system' ? systemTheme : theme;

//     return (
//         <button
//             onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
//             className='bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 px-8 py-2 text-2xl md:text-4xl rounded-lg absolute bottom-32'>
//             Toggle Mode
//         </button>
//     )
// }