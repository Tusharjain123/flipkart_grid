import { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import authCheck from "@/Wrapper/authcheck";
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import Loader from "@/components/loader";

function Product() {
    const [products, setProduct] = useState(null);
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession()
    const router = useRouter();

    if (session.status === "loading") {
        return null
    }    
    if (session.status === "unauthenticated") {
        router.push("/signin");
        return null
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/flipkart/getpurchased`);
                const data = await response.json();
                console.log(data.purchased)
                setProduct(data.purchased);
            } catch (error) {
                console.error(error); ``
            }
        };
        fetchData();
        setLoading(false)

    }, []);
    return (
        <div className="w-screen h-screen">
            <Navbar />
            <div className="m-8">
                <h1 className="text-center text-3xl">Purchased Items</h1>
                {loading ? <Loader /> : <div className="flex flex-wrap items-start justify-evenly p-4">
                    {products &&
                        products.map((ele) => {
                            console.log(ele)
                            return (
                                <Card
                                    key={ele.index}
                                    name={ele.name}
                                    brand={ele.brand}
                                    image={ele.image}
                                    price={ele.price}
                                    rating={ele.rating}
                                    index={ele.index}
                                    breadcrumbs={ele.breadcrumbs}
                                />
                            );
                        })}
                </div>}
            </div>
            <div onClick={() => router.push("/guide")} className="fixed right-10 p-4 rounded-[25%] cursor-pointer bg-[#fecdd3] bottom-10">
                <div className="absolute -left-24 -top-4 border-2 border-black p-2 bg-white rounded-[10px] ">Need any Help ?</div>
                <Image src="/chatbot.png" alt="chatbot" width={100} height={100} />
            </div>
        </div>
    );
}

export default authCheck(Product)
