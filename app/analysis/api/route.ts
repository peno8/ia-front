

export interface FeatureData {
  symbol: string
  features: {
    [key: string]: { value: string, cq: string, end: string }
  }
}

export async function GET(req: Request): Promise<FeatureData> {
  const res = await fetch(req)
  
  const data = await res.json()
  const parsedData = JSON.parse(data.json);
  return parsedData;
}

