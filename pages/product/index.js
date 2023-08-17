import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "@/components/card";

export default function Product() {
    const router = useRouter();
    const { id } = router.query;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Only fetch data if id is available
        if (id) {
            const getData = async () => {
                const response = await fetch(`http://localhost:5000/api/flipkart/product?id=${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const data = await response.json();
                setProducts(data);
            };

            getData();
        }
    }, [id]); 
    // const reviewsObject = products && JSON.parse(products?.Reviews?.replace(/'/g, "\""));
    return (
        <div className='flex flex-wrap justify-evenly items-center'>
            <Card
                key={products.Index} // Add a unique key for each Card
                name={products.Name}
                brand={products.Brand}
                image={products.Image}
                price={products.Price}
                rating={products.Rating}
                // review={reviewsObject.reviews}
                index={products.Index}
                breadcrumbs={products.BreadCrumbs}
            />
        </div>
    );
}
