

export default function AnalysisLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
      <section className="flex grow">   
        {children}
      </section>
    )
  }