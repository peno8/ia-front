// import { NextResponse } from 'next/server'
 
export interface ScreenerApiParam {
  cq?: string
  exchange?: string
  naics?: string
  features: string[]
}

export interface ScreenerApiResult {
  symbol: string
  exg: string
  cq: string
  end: string
  percentiles: {
    [key: string]: number[]
  }
}

export async function POST(req: Request): Promise<Array<ScreenerApiResult>> {
  // console.log(req);
  const res = await fetch(req)
  
  const data = await res.json()
  return data;
}

// export async function POST2(req: Request, reqObj): Promise<Array<ScreenerApiResult>> {
//   const res = await fetch(req)
  
//   const data = await res.json()
//   return { result: data, reqObj: reqObj };
// }

