import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/card'
import { Hero } from '@/components/hero'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='min-h-screen min-w-screen'>
      <Navbar/>
      <Hero/>
      <Card/>
    </div>
  )
}
