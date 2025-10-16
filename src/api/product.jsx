import axios from "axios";

export const createProduct = async (token,form) => {
    return await axios.post('https://ecom2025-api-weld.vercel.app/api/product',form,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const listProduct = async (count = 20) => {
    return await axios.get('https://ecom2025-api-weld.vercel.app/api/products/'+count);
}

export const readProduct = async (token,id) => {
    return await axios.get('https://ecom2025-api-weld.vercel.app/api/product/'+id,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const updateProduct = async (token,id,form) => {
    return await axios.put('https://ecom2025-api-weld.vercel.app/api/product/'+id,form,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const uploadFiles = async (token,form) => {
    return await axios.post('https://ecom2025-api-weld.vercel.app/api/images',{
        image: form
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const removeFiles = async (token,public_id) => {
    return await axios.post('https://ecom2025-api-weld.vercel.app/api/removeimages',{
        public_id
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const dleteProduct = async (token,id) => {
    return await axios.delete('https://ecom2025-api-weld.vercel.app/api/product/'+id,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const searchFilters = async (arg) => {
    return await axios.post('https://ecom2025-api-weld.vercel.app/api/search/filters', arg);
}

export const listProductBy = async (sort,order,limit) => {
    return await axios.post('https://ecom2025-api-weld.vercel.app/api/productby',{
        sort,
        order,
        limit
    });
}