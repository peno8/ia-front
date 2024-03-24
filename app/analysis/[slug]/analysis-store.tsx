import { create } from "zustand";
import { FeatureData, POST } from "../api/route";
import { getRequest } from "../../utils";
import { fetchStatusStore } from "@/app/app.store";
import { useContext } from "react";
import { MetadataContext } from "../metadata-context";

export const featureDataStore = create<{ data: FeatureData | null }>(() => ({ data: null }));

export function fetchFeatureData(symbol: string, cq: string) {
  const controller = new AbortController();
  fetchStatusStore.setState({ isLoading: true });

  const request = {
    cq: cq,
    sector: 'ALL|X',
    symbol: symbol
  }

  POST(getRequest(JSON.stringify(request), `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feature/aggregate`))
    .then((data) => {
      // console.log(data);
      featureDataStore.setState({ data: data });
    })
    .finally(() => {
      fetchStatusStore.setState({ isLoading: false });
    })
  return () => {
    controller.abort();
  }
}
