import { FeatureDef } from "../screener-store"
import ScreenerOption from "./screener-option"


interface ScreenerFeatureProp {
  // name: string
  featureDef: FeatureDef
}

export default function ScreenerFeature(props: ScreenerFeatureProp) {
  const sorted = props.featureDef.variations.sort((a, b) => a.displayRank - b.displayRank)
  // console.log('ScreenerFeature');
  return (
    <div className="flex flex-col items-start Feature text-xl ml-4" key={props.featureDef.code}>
      <div className='flex flex-row items-center'>
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down-left" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M8 8v8h8"></path>
        </svg> */}
        <div className='text-lg'>
          {props.featureDef.desc}
        </div>
      </div>
      {sorted.map(e => <ScreenerOption key={e.code} code={e.code} name={e.variations.join(', ')}></ScreenerOption>)}

    </div>
  )
}