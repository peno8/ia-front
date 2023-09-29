import { create } from "zustand";
import { FeatureData, GET } from "./api/route";


export function getRequest(symbol: string) {
  return new Request('http://127.0.0.1:8080/api/feature/AAPL',
      {
          // headers: {
          //     'Content-Type': 'application/json'
          // },
          // body: jsonStr,
          method: 'GET',
          cache: 'no-store'

      }
  )
}

export const featureDataStore = create<{ data: FeatureData }>(() => ({ data: {} }));

export function fetchFeatureData(symbol: string) {
  const get = async () => {
      console.log('fetchFeatureData')
      const data = await GET(getRequest(symbol));
      console.log(data);
      
      // const parsedData = JSON.parse(data.json);
      featureDataStore.setState({ data: data });
      
      // return data;
  }
  get();
}