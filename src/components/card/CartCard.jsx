import React from "react";
import useEcomStore from "../../store/ecom-store";
import NoImage from "../../assets/no-img.png";
import { Link } from "react-router-dom";

const CartCard = () => {

    const carts = useEcomStore((state) => state.carts);
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity);
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct);
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 style={{ fontFamily: "Anuphan" }} className="text-2xl font-bold mb-4 text-gray-800 pb-3">
        ตะกร้าสินค้า
      </h1>

      <div className="space-y-4">
        {carts.map((item,index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all duration-200">
            <div className="flex justify-between">
              <div className="flex gap-3">
                {item.images && item.images.length > 0 ? (
                  <img 
                    className="w-20 h-20 object-cover rounded-lg shadow-sm" 
                    src={item.images[0].url}
                    alt={item.title}
                  />
                ) : (
                  <img 
                    className="w-20 h-20 object-cover rounded-lg shadow-sm bg-gray-100 p-2" 
                    src={NoImage}
                    alt="No Image"
                  />
                )}

                <div>
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                  <p style={{ fontFamily: "Anuphan" }} className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => actionRemoveProduct(item.id)} 
                className="text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-1 border rounded-lg overflow-hidden">
                <button 
                  onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-red-500 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  <i className="fa-solid fa-minus text-xs"></i>
                </button>
                <span className="px-4 py-1 font-medium">{item.count}</span>
                <button 
                  onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-green-500 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>

              <div style={{ fontFamily: "Anuphan" }} className="font-bold text-lg text-green-600">
                ฿{Number(item.price * item.count).toLocaleString()}
              </div>
            </div>
          </div>
        ))}

        <div className="border-t border-t-gray-400 pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <span style={{fontFamily: 'Anuphan'}} className="text-gray-600 font-medium">
              ยอดรวม
            </span>
            <span style={{ fontFamily: "Anuphan" }} className="text-2xl font-bold text-green-600">
              ฿{Number(getTotalPrice()).toLocaleString()}
            </span>
          </div>

          <Link to="/cart">
            <button 
              style={{fontFamily: 'Anuphan'}} 
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md font-medium cursor-pointer"
            >
              ดำเนินการชำระเงิน
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
