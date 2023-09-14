import { NextResponse } from 'next/server'
 
export interface ScreenerApiParam {
  cq?: string
  market?: string
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

export async function GET(params: ScreenerApiParam): Promise<Array<ScreenerApiResult>> {
  const res = await fetch('http://localhost:8080/api/percentile/ranks', { // http://127.0.0.1:52793/api/percentile/ranks
    headers: {
      'Content-Type': 'application/json',
      // 'API-Key': process.env.DATA_API_KEY,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: JSON.stringify(params),
    method: 'POST',
    cache: 'no-store'
  })
  
  const data = await res.json()
  return data;
}