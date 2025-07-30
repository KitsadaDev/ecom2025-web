import React, { useState, useEffect } from 'react'
import { listProductBy } from '../../api/product'
import ProductCard from '../card/ProductCard'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'

const NewProduct = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        listProductBy('updatedAt', 'desc', 8)
        .then((res) => {
            setData(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

  return (
    <SwiperShowProduct>
      {
        data?.map((item, index) =>
            <SwiperSlide>
                <ProductCard key={index} item={item} />
            </SwiperSlide> 
        )
      }    
    </SwiperShowProduct>
  )
}

export default NewProduct;
