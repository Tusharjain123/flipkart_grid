import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "@/components/card";

export default function Product() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Only fetch data if id is available
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/flipkart/product?id=${id}`);
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const handleClick = async () =>{
        const {Brand, Name, Rating, Reviews, Image, Price, Index, BreadCrumbs} = product

        await fetch("http://localhost:5001/api/flipkart/purchase",{
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            name: Name, brand: Brand, image: Image, price:Price, rating: Rating, review: JSON.parse(Reviews.replace(/'/g, "\"")).reviews ,index: Index, breadcrumbs: BreadCrumbs
          })
        })
      }

    return (
        <div className="flex flex-wrap border rounded-lg justify-center items-start p-4 shadow-md">
            <img src={product.Image} alt={product.Name} height={700} width={500}/>
            <div className="max-w-lg  overflow-hidden mx-4 p-4">
            <div>
                <h1 className="text-4xl font-semibold my-2">{product.Name}</h1>
                <p className="text-gray-600">{(product.Brand)}</p>
            </div>
                <p className="text-red-600 font-bold mt-2">Price: {product.Price}</p>
                <p className="text-yellow-500 mt-1">Rating: {product.Rating}</p>
            </div>
            <button className="button" onClick={handleClick}>
                Buy Item
            </button>
        </div>
    );
}
