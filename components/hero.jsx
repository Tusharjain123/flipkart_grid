import React from 'react'

const data = [{
    img: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png",
    name: "Grocery"
},
{
    img: "https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
    name: "Mobiles"
},
{
    img: "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png?q=100",
    name: "Fashion"
},
{
    img: "https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
    name: "Electronics"
}, {
    img: "https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100",
    name: "Home & Furniture"
}, {
    img: "https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100",
    name: "Appliance"
}, {
    img: "https://rukminim2.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100",
    name: "Travel"
}, {
    img: "https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100",
    name: "Beauty,Toys & more"
}, {
    img: "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png?q=100",
    name: "Two Wheelers"
}]

export const Hero = () => {
    return (
        <div className='flex  gap-16 items-center justify-center bg-white p-4 rounded-lg shadow-md shadow-none md:shadow'>
            {data.map((ele, index) => {
                return (
                    <div className='flex flex-col items-center'>
                        <img src={ele.img} alt={`item - ${index}`} width={60} height={50} />
                        <p>{ele.name}</p>
                    </div>
                )
            })}
        </div>
    )
}
