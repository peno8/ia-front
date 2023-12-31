
export default function SreenerLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="flex grow">   
        {children}
      </section>
    )
  }