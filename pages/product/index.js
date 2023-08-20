import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/loader";
import authCheck from "@/Wrapper/authcheck";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/card";

function Product() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [purchased, setPurchased] = useState(false)
    const [recommendData, setRecommend] = useState()

    useEffect(() => {
        if (id) {
            setLoading(true)
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:5001/api/flipkart/product?id=${id}`);
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
            setLoading(false)
        }
    }, [id]);

    const handleClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { Brand, Name, Rating, Reviews, Image, Price, Index, BreadCrumbs } = product
        console.log(JSON.parse(Reviews.replace(/'/g, "\"")).reviews)
        await fetch("http://localhost:5001/api/flipkart/purchase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: Name, brand: Brand, image: Image, price: Price, rating: Rating, review: JSON.parse(Reviews.replace(/'/g, "\"")).reviews, index: Index, breadcrumbs: BreadCrumbs
            })
        })
        setPurchased(true)
        setLoading(false)
    }
    useEffect(() => {
        const recommend = async (breadcrumbs) => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:5000/chat", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ message: breadcrumbs }),
                });
                const data = await response.json();
                setRecommend(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        }
        if (product?.BreadCrumbs) {
            recommend(product.BreadCrumbs)
        }
    }, [product])
    return (
        <>
            <Navbar />
            {loading ? (
                <Loader />
            ) : (
                product && (
                    <div className="flex flex-wrap border rounded-lg justify-center items-start p-4 shadow-md w-[70%] mx-auto m-8">
                        <img
                            src={product.Image}
                            alt={product.Name}
                            className="h-96 w-full md:w-64 object-contain mx-auto "
                        />
                        <div className="max-w-lg overflow-hidden mx-4 p-4">
                            <div>
                                <h1 className="text-2xl md:text-4xl font-semibold my-2">{product.Name}</h1>
                                <p className="text-gray-600">{product.Brand}</p>
                            </div>
                            <p className="font-bold mt-2">Price: {product.Price}</p>
                            <p className="mt-1">Rating: {product.Rating}</p>
                            <button
                                className={`${purchased ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                                    } text-white font-semibold py-2 px-4 rounded-md mt-4 w-full md:w-auto`}
                                onClick={handleClick}
                                disabled={purchased}
                            >
                                {purchased ? "Purchased" : "Buy Item"}
                            </button>
                        </div>
                    </div>
                )
            )}
            <div className="mt-8">
                <h1 className="text-2xl font-semibold mb-4 text-center">Recommended Products</h1>
                <div className="flex-3 justify-evenly p-4 overflow-x-auto flex">
                    {loading ? (
                        <Loader />
                    ) : (
                        recommendData &&
                        recommendData.map((ele) => {
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
                                    className="md:mr-4" // Adjust spacing between cards
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}

export default authCheck(Product);