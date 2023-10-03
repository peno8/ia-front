import { create } from "zustand";
import { FeatureData, POST } from "../api/route";
import { getRequest } from "../../utils";

export const featureDataStore = create<{ data: FeatureData | null }>(() => ({ data: null }));

export function fetchFeatureData(symbol: string) {
  const get = async () => {
        const request = {
          cq: '2023-Q2',
          sector: 'ALL|X',
          symbol: symbol
        }
        
      const data = await POST(getRequest(JSON.stringify(request), 'http://127.0.0.1:8080/api/feature/aggregate'));
      
      featureDataStore.setState({ data: data });
  }
  get();
}
