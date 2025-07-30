import React, { useState , useEffect,} from 'react'
import { createCategory, removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';


const FormCategory = () => {

    const token = useEcomStore(state => state.token);
    const [name, setName] = useState('');
    // const [categories, setCategories] = useState([]);
    const categories = useEcomStore((state) => state.categories);
    const getCategory = useEcomStore((state) => state.getCategory);

    useEffect(() => {
        getCategory(token);
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name) return toast.warning('Please Enter Category Name');
        try {
            const res = await createCategory(token,{name});
            console.log(res.data.name);
            toast.success(`Add Category ${res.data.name} Successfully`);
            getCategory(token);
        } catch (err) {
            console.log(err);
        }
    }

    const handleRemove = async (id) => {
        try {
            const res = await removeCategory(token,id);
            console.log(res.data.name);
            toast.success(`Delete ${res.data.name} Successfully`);
            getCategory(token);
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-2xl'>
      <h1 
        style={{ fontFamily: 'Anuphan' }}
        className='text-2xl font-bold mb-4 pb-2 text-gray-800'
      >
        จัดการหมวดหมู่สินค้า
      </h1>

      <form className='mb-8 flex gap-4' onSubmit={handleSubmit}>
        <input 
          className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
          onChange={(e) => setName(e.target.value)} 
          type="text"
          placeholder="ชื่อหมวดหมู่"
        />
        <button 
          style={{ fontFamily: 'Anuphan' }}
          className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md cursor-pointer'
        >
          เพิ่มหมวดหมู่
        </button>
      </form>

      <div className='bg-gray-50 rounded-lg p-4'>
        <ul className='divide-y divide-gray-200'>
          {categories.map((item,index) => (
            <li 
              className='flex items-center justify-between py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-200' 
              key={index}
            >
              <span className='text-gray-700 font-medium'>
                {item.name}
              </span>
              <button 
                className='p-2 hover:bg-red-100 rounded-full text-red-500 transition-colors duration-200 cursor-pointer' 
                onClick={() => handleRemove(item.id)}
              >
                <Trash2 className='w-5 h-5' />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FormCategory;