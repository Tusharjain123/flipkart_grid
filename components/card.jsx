import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '@/redux/addcart';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { recommendData } from '@/redux/RecommendData';
import Image from 'next/image';

export const Card = ({ name, brand, image, price, rating, review, index, breadcrumbs }) => {
  const { data: session } = useSession();
  const router = useRouter()
  const dispatch = useDispatch();
  const handleClick = async () => {
    if (!session) {
      router.push("/signin")
    }
    else {
      try {
        await fetch("http://localhost:5001/api/flipkart/addproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name, brand, image, price, rating, review, index, breadcrumbs
          })
        })
        router.push({ pathname: "/product", query: { id: index } })

        dispatch(recommendData.actions.click({name, brand, image, price, rating, review, index, breadcrumbs}))
      }
      catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <div className="bg-white w-72 min-w-[195px] m-5 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col items-between">
      <div>
        <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
          <Image src={image} alt="product photo" layout="fill" />
        </div>
        <div className="p-4 h-[120px]">
          <div className="text-lg font-semibold mb-2">{name.length>50 ? name.slice(0,50)+ "...": name}</div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="mr-1">{brand}</span>
            <span className="mr-1">•</span>
            <span className="mr-1">{rating}</span>
          </div>
        </div>
      </div>
      <div className="mt-auto pb-8 px-4">
        <div className="text-lg font-semibold text-orange-500 mb-2">Rs.{price}</div>
        <button className="bg-[#2874f0] text-white py-2 px-4 rounded-md w-full" onClick={handleClick}>
          Info
        </button>
      </div>
    </div>

  );
};
