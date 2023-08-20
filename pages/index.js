import { Navbar } from "@/components/navbar";
import { Card } from "@/components/card";
import { Hero } from "@/components/hero";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const router = useRouter()
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    try {
      setLoading(true)
      fetch("http://localhost:5000/recommend", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProducts(data);
          setLoading(false)
        });
    } catch (err) {
      console.log(err)
    }
  }, []);
  return (
    <div className="min-h-screen min-w-screen">
      <Navbar setProducts={setProducts} setLoading={setLoading} />
      {
        loading ?
          <Loader />
          :
          <div className="m-8">
            <h1 className="text-center text-3xl">Trending Products</h1>
            <div className="flex flex-wrap justify-evenly items-center">
              {products &&
                products.map((ele) => {
                  const reviewsObject = JSON.parse(ele.Reviews.replace(/'/g, "\""));
                  return (
                    <Card
                      key={ele.Index}
                      name={ele.Name}
                      brand={ele.Brand}
                      image={ele.Image}
                      price={ele.Price}
                      rating={ele.Rating}
                      review={reviewsObject.reviews}
                      index={ele.Index}
                      breadcrumbs={ele.BreadCrumbs}
                    />
                  );
                })}
            </div>
          </div>
      }
      {/* <Hero/> */}
      <div onClick={() => router.push("/guide")} className="fixed right-10 p-4 rounded-[25%] cursor-pointer bg-[#fecdd3] bottom-10">
        <div className="absolute -left-24 -top-4 border-2 border-black p-2 bg-white rounded-[10px] ">Need any Help ?</div>
        <Image src="/chatbot.png" alt="chatbot" width={100} height={100} />
      </div>

    </div>
  );
}
