'use client'

import { Button } from '@mantine/core';
import { getScreenerParam } from '../screener-store';

export default function ScreenerButton(props: { action : Function }) {


  return <Button variant="filled" onClick={(event) => {

    props.action(getScreenerParam());

  }}>Go</Button>;
}