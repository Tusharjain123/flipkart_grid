import { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import authCheck from "@/Wrapper/authcheck";
import { Navbar } from "@/components/navbar";

function Product() {
    const [products, setProduct] = useState(null);
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession()
    const router = useRouter();

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/flipkart/getpurchased`);
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
        </div>
    );
}

export default authCheck(Product)
