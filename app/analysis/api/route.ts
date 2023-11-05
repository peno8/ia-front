

export interface FeatureObj {
  key: string
  features: { value: number, cq: string, end: string }[]
}

export interface PercentileObj {
  [keys: string]: {
    v: number
    p: number
  }
}

export interface PercentileResult {
  symbol: string
  cq: string
  end: string
  percentiles: PercentileObj
}


export interface FeatureData {
  status: string
  symbol: string
  feature: {
    symbol: string
    features: FeatureObj[]
  }
  sectorPercentile: PercentileResult
  stockPercentile: PercentileResult

}



export async function POST(req: Request) {
  // console.log(req);
  const res = await fetch(req);
  const data = await res.json();

  const parsedFeature = JSON.parse(data.featureString);
  data.feature = parsedFeature;

  delete data['featureString'];
  return data;
}


// export async function POST(req: Request): Promise<Response> {
//   // console.log(req);
//   const res = await fetch(req);
//   const data = await res.json();
//   return data;
// }
