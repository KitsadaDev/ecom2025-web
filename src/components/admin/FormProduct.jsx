import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct } from "../../api/product";
import { toast } from "react-toastify";
import { SquarePen } from "lucide-react";
import Uploadfile from "./Uploadfile";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { dleteProduct } from "../../api/product";
import NoImage from '../../assets/no-img.png';
import { dateFormat } from "../../utils/dateformat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      getProduct();
      console.log(res);
      setForm(initialState);
      toast.success(`เพิ่มสินค้า ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const productToDelete = products.find((product) => product.id === id);
    const productName = productToDelete?.title || "สินค้า";
    if (window.confirm(`คุณต้องการลบ ${productName} ใช่หรือไม่`)) {
      try {
        const res = await dleteProduct(token, id);
        getProduct();
        console.log(res);
        toast.success(`ลบ ${productName} สำเร็จ`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 style={{fontFamily: 'Anuphan'}} className="text-2xl font-bold mb-6 pb-1">เพิ่มข้อมูลสินค้า</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleOnChange}
            placeholder="ชื่อสินค้า"
            name="title"
            value={form.title}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleOnChange}
            placeholder="รายละเอียดสินค้า"
            name="description"
            value={form.description}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleOnChange}
            placeholder="ราคา"
            name="price"
            type="number"
            value={form.price}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleOnChange}
            placeholder="จำนวน"
            name="quantity"
            type="number"
            value={form.quantity}
          />
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="categoryId"
            onChange={handleOnChange}
            value={form.categoryId}
            required
          >
            <option value="" disabled>เลือกหมวดหมู่</option>
            {categories.map((item, index) => (
              <option key={index} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="my-6">
          <Uploadfile form={form} setForm={setForm} />
        </div>

        <button 
          style={{fontFamily: 'Anuphan'}} 
          className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md cursor-pointer"
        >
          เพิ่มสินค้า
        </button>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr style={{fontFamily: 'Anuphan'}} className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ลำดับ</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">รูปภาพ</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ชื่อสินค้า</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">รายละเอียด</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">ราคา</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">จำนวน</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">จำนวนที่ขาย</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">แก้ไขล่าสุด</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4">
                    {item.images.length > 0 ? (
                      <img
                        className="w-20 h-20 rounded-lg shadow-sm object-cover"
                        src={item.images[0].url}
                        alt={item.title}
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg shadow-sm bg-gray-100 flex items-center justify-center">
                        <img src={NoImage} className="w-12 h-12 opacity-50" alt="No Image" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium">฿{(item.price).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right">{(item.quantity).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right">{item.soId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{dateFormat(item.updatedAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Link to={"/admin/product/" + item.id}>
                        <SquarePen className="w-8 h-8 p-1.5 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md transition-colors duration-200" />
                      </Link>
                      <button onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-8 h-8 p-1.5 text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-colors duration-200" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
