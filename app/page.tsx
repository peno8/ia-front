import Image from "next/image";
import Sidebar from "./component/sidebar";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/screener");
}
