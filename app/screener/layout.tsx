import "./screener.css";

export default function SreenerLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section className="h-full h-min-0">{children}</section>;
}
