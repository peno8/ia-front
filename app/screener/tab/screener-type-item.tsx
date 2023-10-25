
import { Accordion } from '@mantine/core';
import ScreenerFeature from './screener-feature';
import { FeatureDef } from '../screener-store';
import { Content } from 'next/font/google';

interface ScreenerTypeItemProp {
  featureDefs: Array<FeatureDef>
  name: string
}

export default function ScreenerTypeItem(props: ScreenerTypeItemProp) {
  
  //rgb(100 116 139); 64748b
  return (
    <Accordion.Item key={props.name} value={props.name} className='dark:!border-b-[--border-color-dark-rgb]'> 
      <Accordion.Control>
        <div className='screener-tab-label dark:text-[--text-dark] mb-0'>
          {props.name}
        </div>
      </Accordion.Control>
      <Accordion.Panel>
        {props.featureDefs.map(fd => <ScreenerFeature key={fd.code} featureDef={fd}></ScreenerFeature>)}
      </Accordion.Panel>
    </Accordion.Item>
  )
}