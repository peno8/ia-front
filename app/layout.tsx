import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './component/header/header'
import Footer from './footer'
import localFont from 'next/font/local'
import OptionBar from './component/header/option-bar'
import Sidebar from './component/sidebar'
import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { featureDefsStringStore } from './screener/screener-store'
import { readFileFromSharedDist } from './utils'
import { Button } from '@mantine/core';
import { ThemeProviders } from './theme-provider'
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import GoogleAnalytics from './component/util/ga'
import { useContext } from 'react'
import { MetadataContext } from './MetadataContext'

// import 'ag-grid-community/styles/ag-theme-aline-dark.css'; // Optional theme CSS

export const dynamic = 'force-dynamic'

const localFonts = localFont({
  src: [
    {
      path: './fonts/selawkl.ttf',
      weight: '100',
      style: 'light',
    },
    {
      path: './fonts/selawksl.ttf',
      weight: '300',
      style: 'semi-light',
    },
    {
      path: './fonts/selawk.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/selawksb.ttf',
      weight: '600',
      style: 'semi-bold',
    },
    {
      path: './fonts/selawkb.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'interactive-alpha',
  description: 'Best financial statement visualization.',
  viewport: 'width=device-width, initial-scale=1.0'
}

const featureDefsStr = readFileFromSharedDist(process.env.FEATURE_DEFS_FILE);

featureDefsStringStore.setState(featureDefsStr);

const companyDefStr = readFileFromSharedDist(process.env.COMPANY_DEF_CODES_FILE);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <GoogleAnalytics />
      <body className={`${localFonts.className} font-medium text-sm flex w-full flex-col items-center justify-stretch p-0 m-0 min-h-screen dark:bg-slate-800`}>
        
        <ThemeProviders>
        <MantineProvider>
          <Header companyDefStr={companyDefStr} />
          
          
          <main className="wrap flex-none text-black dark:text-slate-50">
            <Sidebar></Sidebar>
            <div className="flex flex-col w-full h-full">
              {children}

              
            </div>
          </main>
          <Footer />
        </MantineProvider>
        </ThemeProviders>
        
      </body>
      
    </html>
  )
}
