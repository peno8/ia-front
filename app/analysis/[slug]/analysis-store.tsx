import { create } from "zustand";
import { FeatureData, POST } from "../api/route";
import { getRequest } from "../../utils";
import { fetchStatusStore } from "@/app/app.store";

export const featureDataStore = create<{ data: FeatureData | null }>(() => ({ data: null }));

export function fetchFeatureData(symbol: string) {
    fetchStatusStore.setState({ isLoading: true });
    const request = {
      cq: '2023-Q2',
      sector: 'ALL|X',
      symbol: symbol
    }

    POST(getRequest(JSON.stringify(request), `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feature/aggregate`))
    .then((data) => {
      featureDataStore.setState({ data: data });
    })
    .finally(() => {
      fetchStatusStore.setState({ isLoading: false });
    })
}
