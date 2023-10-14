import Image from "next/image"
import AutocompleteSearch from "./autocompleteSearch"
import Link from "next/link"
import OptionBar from "../option-bar"
import "./header.css"
import MenuButton from "./menu-button"


export default function Header({companyDefStr}: {companyDefStr: string}) {
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
        {/* <div className="flex flex-row"> */}
          <AutocompleteSearch companyDefStr={companyDefStr}></AutocompleteSearch>
          {/* <HeaderSearchBox></HeaderSearchBox> */}
          {/* <div><input type="search" className="border"></input></div>
          <div>
            <button>Search</button>
          </div> */}
        {/* </div> */}
        <div>
          <MenuButton></MenuButton>
        </div>
        
      </div>
      <OptionBar></OptionBar>
    </header>
  )
}
