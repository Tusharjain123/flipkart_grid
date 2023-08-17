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

  const addData = async () => {
    await fetch("")
  }

  return (
    <div className='min-h-screen min-w-screen'>
      <Navbar />
      {/* <Hero/> */}<div className='flex flex-wrap justify-evenly items-center'>
        {products && products.map((ele) => {
          const reviewsObject = JSON.parse(ele.Reviews.replace(/'/g, "\""));
          return <Card
            name={ele.Name}
            brand={ele.Brand}
            image={ele.Image}
            price={ele.Price}
            rating={ele.Rating}
            review={reviewsObject.reviews}
            index = {ele.Index}
            breadcrumbs={ele.BreadCrumbs}
          />
        })}</div>
    </div>
  )
}
