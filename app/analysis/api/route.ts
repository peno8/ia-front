

export interface FeatureData {
  symbol: string
  features: {
    [key: string]: { value: string, cq: string, end: string }
  }
}

export async function POST(req: Request): Promise<FeatureData> {
  const res = await fetch(req)
  
  const data = await res.json()
  console.log(data);
  const parsedFeature = JSON.parse(data.featureString);
  data.feature = parsedFeature;
  delete data['featureString'];
  return data;
}

// export async function POST(req: Request): Promise<Array<ScreenerApiResult>> {
//   const res = await fetch(req)
  
//   const data = await res.json()
//   return data;
// }

