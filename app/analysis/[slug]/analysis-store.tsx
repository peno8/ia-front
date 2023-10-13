import { create } from "zustand";
import { FeatureData, POST } from "../api/route";
import { getRequest } from "../../utils";
import { fetchStatusStore } from "@/app/app.store";

export const featureDataStore = create<{ data: FeatureData | null }>(() => ({ data: null }));

export function fetchFeatureData(symbol: string) {
  const get = async () => {
    fetchStatusStore.setState({ isLoading: true });
    const request = {
      cq: '2023-Q2',
      sector: 'ALL|X',
      symbol: symbol
    }

    const data = await POST(getRequest(JSON.stringify(request), `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feature/aggregate`));

    featureDataStore.setState({ data: data });
    fetchStatusStore.setState({ isLoading: false });
  }
  get();

}
