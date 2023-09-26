import Image from "next/image"
import HeaderSearchBox from './searchbox'
import AutocompleteSearch from "./autocomplete"

export default function Header() {
  return (
    <header className=" flex-none flex items-center justify-between align-center flex-nowrap w-full h-[80px]">
      <div className="flex flex-row align-center">
        <div className="w-[25px] h-[25px] ml-[20px]">
          <Image src="/image/Mediamodifier-Design-Template (1).png" alt="Screener" width={20} height={20} />
        </div>
        <div className="text-[16px] font-semibold ml-[10px] dark:text-white">interactive-alpha</div>

      </div>

      <div className="flex flex-row">
        <AutocompleteSearch></AutocompleteSearch>
        {/* <HeaderSearchBox></HeaderSearchBox> */}
        {/* <div><input type="search" className="border"></input></div>
        <div>
          <button>Search</button>
        </div> */}
      </div>
      <div>

      </div>

    </header>
  )
}
