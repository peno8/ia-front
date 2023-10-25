import { FeatureDef } from "../screener-store"
import ScreenerOption from "./screener-option"


interface ScreenerFeatureProp {
  featureDef: FeatureDef
}

export default function ScreenerFeature(props: ScreenerFeatureProp) {
  const sorted = props.featureDef.variations.sort((a, b) => a.displayRank - b.displayRank)

  return (
    <div className="flex flex-col items-start Feature pb-1" key={props.featureDef.code}>
      <div className='flex flex-row items-center'>
        <div className='screener-feature-label'>
          {props.featureDef.desc}
        </div>
      </div>
      {sorted.map(e => <ScreenerOption key={e.code} code={e.code} name={e.variations.join(', ')}></ScreenerOption>)}

    </div>
  )
}