import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"
import { signOut, useSession } from 'next-auth/react';

export const Navbar = () => {
    const [search, setSearch] = useState()
    const router = useRouter()
    const { data: session } = useSession();
    const handleSignOut = () => {
        signOut().then(()=>{
            router.push("/signin");
        })
    };

    return (
        <div className="bg-[#2874f0] p-4">
            <div className="flex justify-center gap-16 items-center">
                <div className="flex items-center">
                    <div className="p-2">
                        <Image src="/flipkart.png" width={70} height={25} alt="Flipkart Logo" />
                        <div className="flex italic text-[11px]">
                            Explore <span className="text-[#ffe500] ml-1">Plus</span>{" "}
                            <span className="pl-2">
                                <Image src="/plus.png" width={13} height={20} alt="Plus Icon" />
                            </span>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for products, brands and more"
                            className="w-full md:w-[350px] pl-10 pr-8 text-sm h-[40px]"
                            name="search"
                            id="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="material-symbols-outlined absolute top-1/2 transform -translate-y-1/2 left-2">
                            search
                        </span>
                    </div>
                </div>
                <ul className="flex gap-4 items-center text-white">
                    {!session && (
                        <li>
                            <button
                                className="p-2 rounded-[8px] px-6 cursor-pointer bg-white text-[#2874f0]"
                                onClick={() => router.push("/signin")}
                            >
                                Login
                            </button>
                        </li>
                    )}
                    {session && (
                        <>
                        <li className="overflow-hidden rounded-3xl">
                            <img
                                src={session.user.image}
                                alt="Profile"
                                width={40}
                                height={40}
                            ></img>
                        </li>
                        <li className="overflow-hidden rounded-3xl">
                            {session.user.name}
                        </li>
                        </>
                    )}
                    {session && (
                        <li>
                            <button
                                className="p-2 rounded-[8px] px-6 cursor-pointer bg-white text-[#2874f0]"
                                onClick={handleSignOut}
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
            {/* Additional responsive adjustment */}
            <div className="md:hidden text-white mt-4">
                <p>Become a Seller</p>
            </div>
        </div>
    );
};
