import React from 'react'
import ContentCarousel from '../components/home/ContentCarousel'
import BestSeller from '../components/home/BestSeller'
import NewProduct from '../components/home/NewProduct'

const Home = () => {
  return (
   <div>
      <ContentCarousel />

      <p style={{ fontFamily: 'Anuphan' }} className='text-2xl text-center mt-4 mb-4 font-bold'>สินค้าขายดี</p>
      <BestSeller />

      <p style={{ fontFamily: 'Anuphan' }} className='text-2xl text-center mt-4 mb-4 font-bold'>สินค้าใหม่</p>
      <NewProduct />
    </div>
  )
}

export default Home
