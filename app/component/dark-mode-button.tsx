"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes";
import { ActionIcon } from '@mantine/core';
import { IconMoonStars, IconBrightnessDown } from '@tabler/icons-react';

function DarkModeIcon({ theme }: { theme: string | undefined }) {
  if (theme !== 'dark')
    return <IconMoonStars style={{ width: '70%', height: '70%' }} stroke={1.5} className="bg-transparent" />
  else
    return <IconBrightnessDown style={{ width: '70%', height: '70%' }} stroke={1.5} className="bg-transparent" />
}

const getText = (theme: string | undefined) => {
  if (theme === 'light') return 'Dark mode';
  else return 'Light mode';
}

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(() => true);
  }, [])

  if (!mounted) {
    return null;
  }

  return (

    <div className='flex flex-row items-center mr-5'>
      <ActionIcon variant="default" aria-label="Settings" className="!bg-transparent hover:!bg-opacity-10 hover:!bg-black dark:hover:!bg-slate-500 dark:text-[--text-dark] !border-0"
        onClick={() => theme === "dark" ? setTheme('light') : setTheme("dark")}>
        <DarkModeIcon theme={theme} />
      </ActionIcon>
      <div className='dark:text-[--text-dark]'>{getText(theme)}</div>

    </div>
  )
}
