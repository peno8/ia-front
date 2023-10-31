import Image from "next/image"
import AutocompleteSearch from "./autocompleteSearch"
import Link from "next/link"
import OptionBar from "./option-bar"
import "./header.css"
import MenuButton from "./menu-button"
import { appMetadataStore } from "@/app/app.store"

async function getMetadata() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/metadata/get`, {
    method: 'GET',
    cache: 'no-cache'
  })
  console.log(res)

  if (!res.ok) {
    throw new Error('Failed to fetch metadata')
  }
 
  return res.json()
}


export default async function Header({companyDefStr}: {companyDefStr: string}) {

  const metadata = await getMetadata();
  console.log(metadata)
  appMetadataStore.setState(metadata);

  return (
    <header className="w-full">
      <div className="header-main flex items-center justify-between align-center flex-nowrap h-24">
        <Link href={'/screener'}>
          <div className="flex flex-row align-center">
            <div className="w-[25px] h-[25px] mr-1">
              <Image src="/image/logo.png" alt="logo" width={20} height={20} />
            </div>
            <div className="logo-text text-[16px] font-semibold ml-[10px] dark:text-white">interactive-alpha</div>
          </div>
        </Link>
          <AutocompleteSearch companyDefStr={companyDefStr}></AutocompleteSearch>
        <div>
          <MenuButton metadata={metadata}></MenuButton>
        </div>
        
      </div>
      <OptionBar metadata={metadata}></OptionBar>
    </header>
  )
}
