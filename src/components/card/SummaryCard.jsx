import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SummaryCard = () => {

  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotle, setCartTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    hdlGetUserCart(token);
  },[])

  const hdlGetUserCart = (token) => {
    listUserCart(token)
    .then((res) => {
      setProducts(res.data.products);
      setCartTotal(res.data.cartTotal);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const hdlSaveAddress = () => {
  if (!address) {
      return toast.warning("กรุณากรอกที่อยู่จัดส่ง");
    }
    saveAddress(token, address)
    .then((res) => {
      toast.success("เพิ่มที่อยู่เรียบร้อยแล้ว");
      setAddressSaved(true);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่จัดส่ง");
    }
    navigate("/user/payment");
  }

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap">
        <div className="w-2/4 p-4">
          <div className="bg-white p-4 rounded-md shadow-md border border-gray-200">
            <h1 style={{ fontFamily: "Anuphan" }} className="text-xl font-bold">
              ที่อยู่ในการจัดส่ง
            </h1>
            <textarea
              required
              onChange={(e) => setAddress(e.target.value)}
              style={{ fontFamily: "Anuphan" }}
              className="w-full rounded-md shadow-md border border-gray-200 p-2 mt-3"
              placeholder="ป้อนที่อยู่จัดส่ง..."
            ></textarea>
            <button
              onClick={hdlSaveAddress}
              style={{ fontFamily: "Anuphan" }}
              className="bg-blue-500 rounded-md py-2 px-3 shadow-md cursor-pointer hover:bg-blue-700 text-white transition-all duration-300 mt-3"
            >
              เพิ่มที่อยู่
            </button>
          </div>
        </div>

        <div className="w-2/4 p-4">
          <div className="bg-white p-4 rounded-md shadow-md border border-gray-200">
            <h1 style={{ fontFamily: "Anuphan" }} className="text-xl font-bold">
              คำสั่งซื้อสินค้า
            </h1>
            {
              products?.map((item, index) => 
              <div key={index}>
              <div className="flex justify-between items-end bg-gray-100 p-3 rounded-md mt-3   ">
                <div>
                  <p style={{ fontFamily: "Anuphan" }} className="font-bold">{item.product.title}</p>
                  <p style={{ fontFamily: "Anuphan" }} className="text-sm">
                    จำนวน: {item.count}
                    <i className="fa-solid fa-xmark text-[11px] mx-1"></i>฿{Number(item.product.price).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p
                    style={{ fontFamily: "Anuphan" }}
                    className="text-green-600 font-bold"
                  >
                    ฿{Number(item.product.price * item.count).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
              )
            }
            
            <div className="p-3">
              <div
                style={{ fontFamily: "Anuphan" }}
                className="flex justify-between"
              >
                <p>ค่าจัดส่ง:</p>
                <p className="font-bold text-green-600">฿0</p>
              </div>
              <div
                style={{ fontFamily: "Anuphan" }}
                className="flex justify-between"
              >
                <p>ส่วนลด:</p>
                <p className="font-bold text-green-600">฿0</p>
              </div>
            </div>{" "}
            <hr className="border border-gray-200" />
            <div className="p-3">
              <div
                style={{ fontFamily: "Anuphan" }}
                className="flex justify-between"
              >
                <p className="font-bold">ยอดรวม:</p>
                <p className="font-bold text-green-600 text-lg">฿{cartTotle.toLocaleString()}</p>
              </div>
            </div>
            <div>
              <button
                onClick={hdlGoToPayment}
                style={{ fontFamily: "Anuphan" }}
                className="bg-blue-500 rounded-md w-full py-2 px-2 shadow-md cursor-pointer hover:bg-blue-700 text-white transition-all duration-300 mt-4"
              >
                ดำเนินการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
