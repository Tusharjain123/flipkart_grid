import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/card";
import Loader from "@/components/loader";
import { Navbar } from "@/components/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Guide() {
    const [query, setQuery] = useState("");
    const router = useRouter()
    const session = useSession();
    const [productdata, setData] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatHistoryRef = useRef(null);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            var new_query = query + " "
            chatHistory.map((ele) => new_query += ele.message + " ")
            console.log(new_query)

            const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK}chat`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ message: new_query }),
            });
            const data = await response.json();
            setData(data);
            setChatHistory((prevHistory) => [...prevHistory, { type: "user", message: query, output: data }]);
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
            setQuery("");
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        setLoading(false);
    };

    useEffect(() => {
        chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }, [chatHistory]);

    if (session?.status === "loading") {
        return null
    }    
    if (session?.status === "unauthenticated") {
        router.push("/signin");
        return null
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                <div className="p-2">
                    <h1 className="text-3xl text-center">Flipkart Guide</h1>
                    <p className="text-center">Your one stop solution for finding product</p>
                </div>
                <div ref={chatHistoryRef} className="flex flex-col justify-between bg-white h-full md:h-[90%] mx-auto rounded-lg shadow-lg overflow-auto">
                    {!loading && chatHistory.map((entry, index) => (
                        <div className="w-[80%] mx-auto" key={index}>
                            <div key={index} className="relative -right-[87%] bg-[#c5ddff] w-fit flex justify-end text-xl rounded-br-[20px] rounded-l-[20px] py-3 px-6 m-4 text-black mb-2">
                                {entry.message}
                            </div>
                            {entry?.output && <div key={index} className="flex justify-evenly  text-xl rounded-bl-[20px] rounded-r-[20px] py-3 px-6 m-4 text-black ">
                                {(entry.output).map((ele) => {
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
                                            className="mr-4"
                                        />
                                    );
                                })}
                            </div>}
                        </div>
                    ))}
                    {
                        loading && <div className="text-center text-gray-500 text-2xl m-4">Bot is thinking...</div>
                    }
                    <form className="p-4 border-t md:sticky -bottom-1 w-[80%] mx-auto left-0 right-0 bg-white z-10">
                        <div className="flex justify-between items-center">
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
