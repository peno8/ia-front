import DarkModeButton from './dark-mode-button';

export default function OptionBar() {
  return (
    <div className='option-bar flex flex-row flex-none items-center justify-end align-right h-[30px] bg-[--bg-gray] dark:bg-[--bg-dark]'>
      <div className="option-bar-content flex flex-row mr-12">
        <DarkModeButton></DarkModeButton>
        {/* <DisplayDropdown dropdownName="Update Status" items={[{ key: 0, value: 'Last Updated: 10 Sep 2023' }]} />
        <DisplayDropdown dropdownName="Language" items={[{ key: 0, value: 'US' }, { key: 1, value: 'KR' }]} /> */}
      </div>
    </div>

  )
}