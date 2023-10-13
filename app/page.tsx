import Image from 'next/image'
import Footer from './footer'
import Sidebar from './component/sidebar'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/screener');
  return (
    <div className='grow'></div>
  )
}
