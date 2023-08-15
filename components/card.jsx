import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '@/redux/addcart';

export const Card = () => {
  const count = useSelector((state) => state.cart.value)
  console.log(count)
  return (
    <div className="bg-white w-72 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
      <div className="relative w-full h-48">
        <Image src="/1.jpeg" alt="product photo" layout="fill" objectFit="cover" className="rounded-t-lg" />
      </div>
      <div className="p-4">
        <div className="text-lg font-semibold mb-2">Product Name</div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="mr-1">Rating</span>
          <span className="mr-1">•</span>
          <span>Users</span>
        </div>
        <div className="text-lg font-semibold text-orange-500 mb-2">Price</div>
        <button className="bg-[#2874f0] text-white py-2 px-4 rounded-md w-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
