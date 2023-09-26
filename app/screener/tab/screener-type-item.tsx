
import { Accordion } from '@mantine/core';
import ScreenerFeature from './screener-feature';
import { FeatureDef } from '../screener-store';

interface ScreenerTypeItemProp {
  featureDefs: Array<FeatureDef>
  name: string
}

export default function ScreenerTypeItem(props: ScreenerTypeItemProp) {
  // console.log(props.featureDefs)
  //rgb(100 116 139); 64748b
  return (
    <Accordion.Item key={props.name} value={props.name} className='dark:!border-b-[--border-color-dark-rgb]'> 
      <Accordion.Control>
        <div className='TypeName text-xl text dark:text-[--text-dark] mb-0'>
          {props.name}
        </div>
      </Accordion.Control>
      <Accordion.Panel>
        {props.featureDefs.map(fd => <ScreenerFeature key={fd.code} featureDef={fd}></ScreenerFeature>)}
        
        {/* <ScreenerFeature name={'Revenues'}></ScreenerFeature> */}
      </Accordion.Panel>
    </Accordion.Item>
  )
}