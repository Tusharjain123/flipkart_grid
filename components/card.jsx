import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '@/redux/addcart';
import { useRouter } from 'next/router';

export const Card = ({ name, brand, image, price, rating, review,index,breadcrumbs }) => {
  // const count = useSelector((state) => state.cart.value)
  // console.log(count)
  const router = useRouter()
  const handleClick = async () =>{
    await fetch("http://localhost:5000/api/flipkart/addproduct",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, brand, image, price, rating, review ,index, breadcrumbs
      })
    })
    router.push({pathname:"/product", query: {id: index}})
  }
  return (
    <div className="bg-white w-72 m-5 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
      <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
        <img src={image} alt="product photo" layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <div className="text-lg font-semibold mb-2">{name}</div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="mr-1">{brand}</span>

          <span className="mr-1">•</span>
          <span className="mr-1">{rating}</span>

        </div>
        <div className="text-lg font-semibold text-orange-500 mb-2">Rs. {price}</div>
        <div className="mt-auto">
          <button className="bg-[#2874f0] text-white py-2 px-4 rounded-md w-full" onClick={handleClick}>
            Info
          </button>
        </div>
      </div>
    </div>
  );
};
