import Image from 'next/image'

export default function Sidebar() {
  return (
    <aside className='sidebar flex flex-col'>
      <div className="mx-[10px] flex flex-row px-[30px] py-[20px] border-b hover:bg-opacity-10 hover:bg-black ">
        <Image src="/svg/list_numbered.svg" alt="Screener" width={20} height={20}/>
        <div className='ml-[10px]'>Screener</div>
      </div>
      <div className="mx-[10px] flex flex-row px-[30px] py-[20px] border-b hover:bg-opacity-10 hover:bg-black ">
        <Image src="/svg/search.svg" alt="Screener" width={20} height={20}/>
        <div className='ml-[10px]'>Zoom in</div>
      </div>
    </aside>
  )
}