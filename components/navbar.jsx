import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Navbar = ({ setProducts, setLoading }) => {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const { data: session } = useSession();

    const handleSignOut = (e) => {
        e.preventDefault();
        signOut().then(() => {
            router.push("/signin");
        });
    };

    const handleSearch = async (event) => {
        // event.preventDefault();
        // setLoading(true);
        // const response = await fetch("http://localhost:5000/chat", {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "application/json",
        //     },
        //     body: JSON.stringify({ message: search }),
        // });
        // const data = await response.json();
        // setProducts(data);
        // setLoading(false);
        // console.log(data);
    };

    return (
        <div className="bg-[#2874f0] p-4">
            <div className="flex flex-col md:flex-row w-[80%] justify-evenly mx-auto items-center">
                <div className="flex items-center  mb-4 md:mb-0">
                    <Link href="/">
                        <div className="p-2">
                            <Image
                                src="/flipkart.png"
                                width={70}
                                height={25}
                                alt="Flipkart Logo"
                            />
                            <div className="flex italic text-[11px]">
                                Explore <span className="text-[#ffe500] ml-1">Plus</span>{" "}
                                <span className="pl-2">
                                    <Image src="/plus.png" width={13} height={20} alt="Plus Icon" />
                                </span>
                            </div>
                        </div>
                    </Link>
                    {router.pathname === "/" && (
                        <div className="relative mx-2">
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Search for products, brands and more"
                                    className="w-full md:w-[350px] pl-10 pr-8 text-sm h-[40px] rounded-[10px]"
                                    name="search"
                                    id="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button type="submit">
                                    <span className="material-symbols-outlined absolute top-1/2 transform -translate-y-1/2 left-2">
                                        search
                                    </span>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
                <ul className="flex flex-col md:flex-row gap-4 items-center text-white">
                    {!session && (
                        <li>
                            <button
                                className="p-2 rounded-[8px] px-6 cursor-pointer bg-white text-[#2874f0] mb-2 md:mb-0"
                                onClick={() => router.push("/signin")}
                            >
                                Login
                            </button>
                        </li>
                    )}
                    {session && (
                        <>
                            <li className="overflow-hidden rounded-full mb-2 md:mb-0">
                                <Image
                                    src={session.user.image}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                ></Image>
                            </li>
                            <li className="overflow-hidden mb-2 md:mb-0">
                                {session.user.name}
                            </li>
                        </>
                    )}
                    {session && (
                        <>
                            <li>
                                <button
                                    className="p-2 rounded-[8px] px-6 cursor-pointer bg-white text-[#2874f0] mb-2 md:mb-0"
                                    onClick={handleSignOut}
                                >
                                    Logout
                                </button>
                            </li>
                            <li className="cursor-pointer">
                                <div className="border border-white rounded-lg p-2" onClick={() => router.push("/purchased")}>
                                    <p className="text-white">Orders</p>
                                </div>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};
