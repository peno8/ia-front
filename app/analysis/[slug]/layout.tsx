export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="h-full min-h-0">{children}</section>;
}
