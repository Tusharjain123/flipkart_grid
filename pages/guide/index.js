import { useState } from "react";
import { Card } from "@/components/card";
import Loader from "@/components/loader";
import { Navbar } from "@/components/navbar";

export default function Guide() {
    const [query, setQuery] = useState("");
    const [productdata, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData([]);
        setLoading(true);
        
        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ message: query }),
            });
            const data = await response.json();
            setData(data);
            setQuery("")
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-1 p-10 bg-gray-100 overflow-y-auto">
                <div className="p-4">
                    <h1 className="text-3xl text-center">Flipkart Guide</h1>
                    <p className="text-center">Your one stop solution for finding product</p>
                </div>
                <div className="flex flex-col justify-between bg-white h-[85%] rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-3 justify-evenly p-4 overflow-x-auto flex">
                        {loading ? (
                            <div className="text-gray-500 text-2xl">Bot is thinking...</div>
                        ) : (
                            productdata.map((ele) => {
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
                                        className="mr-4" // Adjust spacing between cards
                                    />
                                );
                            })
                        )}
                    </div>
                    <form className="p-4 border-t">
                        <div className="flex">
                            <input
                                type="text"
                                name="query"
                                id="query"
                                value={query}
                                onChange={handleChange}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
