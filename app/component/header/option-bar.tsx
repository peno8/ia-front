import { AppMetadata } from '../../app.store';
import DarkModeButton from '../dark-mode-button';

export default function OptionBar({ metadata }: {metadata: AppMetadata}) {
  return (
    <div className='option-bar flex flex-row flex-none items-center justify-end align-right h-[30px] bg-[--bg-gray] dark:bg-[--bg-dark]'>
      <div className="option-bar-content flex flex- items-center mr-12">
        <DarkModeButton></DarkModeButton>
        <div className='dark:text-[--text-dark]'>
          {`Last Update: ` + metadata?.DATE}
        </div>
      </div>
    </div>
  )
}