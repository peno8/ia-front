import DisplayDropdown from './MyDropdown'

export default function OptionBar() {
  return (
    <div className='flex flex-row items-center justify-end align-right h-[30px] bg-gray-100'>
      <div className="flex flex-row mr-5">
        <DisplayDropdown dropdownName="Update Status" items={['Last Updated: 10 Sep 2023']} />
        <DisplayDropdown dropdownName="Language" items={['US', 'KR']} />
      </div>
    </div>

  )
}