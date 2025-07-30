import React from 'react'
import { ShoppingCart } from 'lucide-react';
import NoImage from '../../assets/no-img.png';
import useEcomStore from '../../store/ecom-store';
import { motion } from "motion/react"

const ProductCard = ({item}) => {

  const ball = {
    borderRadius: "50%",
    background: "var(--accent)",
}

  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  return (
    <motion.div
            style={ball}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
    <div className='border border-gray-300 bg-white p-2 w-50 rounded-md shadow-md'>

      <div>
        {
            item.images && item.images.length > 0 
            ? <img className='w-full h-30 rounded-md shadow-md object-cover hover:scale-110 transition-all duration-300' src={item.images[0].url} />
            : <div className='w-full h-30 bg-gray-200 rounded-md flex items-center justify-center shadow'>
                <img className='w-full h-30 bg-gray-200 rounded-md flex items-center justify-center shadow' src={NoImage} />
              </div>
        }

      </div>

      <div className='py-2'>
        <p className='text-xl truncate font-bold'>{item.title}</p>
        <p style={{ fontFamily: "Anuphan" }} className='text-sm truncate text-gray-600'>{item.description}</p>
      </div>

      <div className='flex justify-between items-center'>
        <span style={{ fontFamily: "Anuphan" }} className='text-md text-green-600 font-bold'>฿{Number(item.price).toLocaleString()}</span>
        <button onClick={() => actionAddtoCart(item)} className='bg-blue-500 rounded-md p-1 px-2 shadow-md cursor-pointer hover:bg-blue-700 hover:text-white transition-all duration-300'><i className="fa-solid fa-cart-arrow-down"></i></button>
      </div>

    </div>
    </motion.div>
  )
}

export default ProductCard