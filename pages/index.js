import { Navbar } from '@/components/navbar'
import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { useState, useEffect } from 'react'

export default function Home() {
  const [products, setProducts] = useState()
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://flipkart-backend-qn4j.onrender.com/api/flipkart/allproducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      console.log(data)
      setProducts(data)
    }
    getData()
  }, [])

  return (
    <div className='min-h-screen min-w-screen'>
      <Navbar />
      {/* <Hero/> */}<div className='flex flex-wrap justify-evenly items-center'>
        {products && products.map((ele) => {
          return <Card
            name={ele.Name}
            brand={ele.Brand}
            image={ele.Image}
            price={ele.Price}
            rating={ele.Rating}
            users={ele.Reviews}
          />

        })}</div>
    </div>
  )
}
