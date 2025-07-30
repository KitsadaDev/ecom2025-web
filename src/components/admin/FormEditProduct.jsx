import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "Computer9",
  description: "des",
  price: 1254,
  quantity: 10,
  categoryId: "",
  images: []
};

const FormEditProduct = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [form, setForm] = useState(initialState);
  // console.log(products);

  useEffect(() => {
    getCategory();
    fetchProduct(token,id,form)
  }, []);

  const fetchProduct = async (token,id,form) => {
    try {
        const res = await readProduct(token,id,form);
        console.log(res);
        setForm(res.data);
    } catch (err) {
      console.log('Fetch Product Error',err);
    }
  }

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
      const res = await updateProduct(token, id, form);
      console.log(res);
      toast.success(`เพิ่มสินค้า ${res.data.title} สำเร็จ`)
      navigate('/admin/product');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          className="border"
          onChange={handleOnChange}
          placeholder="Title"
          name="title"
          value={form.title}
        ></input>
        <input
          className="border"
          onChange={handleOnChange}
          placeholder="Description"
          name="description"
          value={form.description}
        ></input>
        <input
          className="border"
          onChange={handleOnChange}
          placeholder="Price"
          name="price"
          type="number"
          value={form.price}
        ></input>
        <input
          className="border"
          onChange={handleOnChange}
          placeholder="Quantity"
          name="quantity"
          type="number"
          value={form.quantity}
        ></input>
        <select
          className="border"
          name="categoryId"
          onChange={handleOnChange}
          value={form.categoryId}
          required
        >
          <option value="" disabled>
            เลือกหมวดหมู่
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <Uploadfile form={form} setForm={setForm} />

        <button className="bg-blue-500 rounded-md">แก้ไขสินค้า</button> <br />{" "}
        <br />
        
      </form>
    </div>
  );
};

export default FormEditProduct;