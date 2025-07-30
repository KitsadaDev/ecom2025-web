import React from "react";
import useEcomStore from "../../store/ecom-store";
import NoImage from "../../assets/no-img.png";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((s) => s.user);
  const token = useEcomStore((s) => s.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, {cart})
    .then((res) => {
      console.log("Cart saved successfully:", res);
      toast.success("เพิ่มลงตะกร้าสำเร็จ");
      navigate("/checkout");
    })
    .catch((err) => {
      console.log("Error saving cart:", err);
      toast.warning(err.response.data.message || "ไม่สามารถเพิ่มลงตะกร้าได้");
    });
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex items-center gap-4 mb-4 pb-4">
        <i className="fa-solid fa-list-ul text-2xl"></i>
        <p style={{ fontFamily: "Anuphan" }} className="text-xl font-bold text-gray-800">
          รายการสินค้า {cart.length} รายการ
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
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

                  <div className="space-y-1">
                    <p className="font-bold text-gray-800">{item.title}</p>
                    <p style={{ fontFamily: "Anuphan" }} className="text-sm text-gray-600">
                      จำนวน:
                      <i className="fa-solid fa-xmark text-[11px] mx-2 text-gray-400"></i>
                      {item.count}
                      <span className="mx-2 text-gray-700">
                        ฿{Number(item.price).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div style={{ fontFamily: "Anuphan" }} className="font-bold text-lg text-green-600">
                    ฿{Number(item.price * item.count).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <p style={{ fontFamily: "Anuphan" }} className="text-xl font-bold text-gray-800 mb-4">
            ยอดรวมสินค้า
          </p>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <span style={{ fontFamily: "Anuphan" }} className="text-gray-600">รวมทั้งหมด</span>
            <span style={{ fontFamily: "Anuphan" }} className="text-2xl text-green-600 font-bold">
              ฿{Number(getTotalPrice()).toLocaleString()}
            </span>
          </div>

          <div className="space-y-3 mt-6">
            {user ? (
              <button 
                disabled={cart.length === 0}
                style={{ fontFamily: "Anuphan" }} 
                onClick={handleSaveCart} 
                className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md font-medium cursor-pointer"
              >
                สั่งซื้อสินค้า
              </button>
            ) : (
              <Link to="/login" className="block">
                <button className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md font-medium">
                  Sign In
                </button>
              </Link>
            )}

            <Link to="/shop" className="block">
              <button 
                style={{ fontFamily: "Anuphan" }} 
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm hover:shadow-md font-medium cursor-pointer"
              >
                แก้ไขรายการ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
