import { featureDefsStringStore } from "../screener/screener-store";

export default function AnalysisLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    console.log('AnalysisLayout')
    return (
      <section className="flex grow">   
        {children}
      </section>
    )
  }