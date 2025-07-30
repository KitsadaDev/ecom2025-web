import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  console.log(products);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([100, 30000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
        setOk(!ok);
    }, 300);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 style={{ fontFamily: "Anuphan" }} className="text-2xl font-bold mb-4 text-gray-800 pb-3">
        ค้าหาสินค้า
      </h1>

      <input
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 mb-6"
        placeholder="ค้นหาสินค้า..."
        type="text"
      />

      <div className="space-y-4">
        <h2 style={{ fontFamily: "Anuphan" }} className="text-xl font-semibold text-gray-700 mb-3">
          หมวดหมู่สินค้า
        </h2>
        <div className="space-y-2">
          {categories.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={item.id}
                onChange={handleCheck}
                className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <label className="text-gray-700">
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-t-gray-400">
        <h2 style={{ fontFamily: "Anuphan" }} className="text-xl font-semibold text-gray-700 mb-4">
          ค้าหาราคาสินค้า
        </h2>
        <div>
          <div className="flex justify-between mb-3 text-sm text-gray-600">
            <span style={{fontFamily: 'Anuphan'}}>
              ต่ำสุด: ฿{price[0].toLocaleString()}
            </span>
            <span style={{fontFamily: 'Anuphan'}}>
              สูงสุด: ฿{price[1].toLocaleString()}
            </span>
          </div>
          <Slider 
            onChange={handlePrice} 
            range 
            min={0} 
            max={100000} 
            defaultValue={[100, 30000]}
            className="my-4" 
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
