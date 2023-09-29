
export default function SreenerLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    console.log('SreenerLayout')
    return (
      <section className="flex grow">   
        {children}
      </section>
    )
  }