// import { readFeatureDefs } from "./screener-store";
// import { useFeatureDefs } from "./screener-store";

export default function SreenerLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {

    // const jsonObj = readFeatureDefs();
    // console.log(jsonObj);
    // useFeatureDefs.setState(jsonObj)

    return (
      <section className="flex grow">   
        {children}
      </section>
    )
  }