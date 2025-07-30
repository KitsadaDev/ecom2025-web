import React, { useEffect, useState } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 
        style={{ fontFamily: "Anuphan" }} 
        className="text-3xl font-bold mb-6 text-gray-800 pb-3"
      >
        ประวัติการสั่งซื้อ
      </h1>
      <div className="space-y-6">
        {orders?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600"></p>
                  <p style={{ fontFamily: "Anuphan" }} className="font-bold text-lg">
                    {dateFormat(item.updatedAt)}
                  </p>
                </div>
                <div>
                  {item.orderStatus === "รอดำเนินการ" && (
                    <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                      {item.orderStatus}
                    </span>
                  )}
                  {item.orderStatus === "กำลังดำเนินการ" && (
                    <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
                      {item.orderStatus}
                    </span>
                  )}
                  {item.orderStatus === "จัดส่งแล้ว" && (
                    <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
                      {item.orderStatus}
                    </span>
                  )}
                  {item.orderStatus === "ยกเลิก" && (
                    <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-medium">
                      {item.orderStatus}
                    </span>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr
                      style={{ fontFamily: "Anuphan" }}
                      className="bg-gray-50"
                    >
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">สินค้า</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">ราคา</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">จำนวน</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">รวม</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {item.products.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-800">{product.product.title}</td>
                        <td className="px-6 py-4 text-right text-sm text-gray-600">
                          ฿{(product.product.price).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-600">
                          {product.count}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-gray-800">
                          ฿{(product.product.price * product.count).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 border-t border-t-gray-300 pt-4">
                <div 
                  style={{ fontFamily: "Anuphan" }} 
                  className="text-right"
                >
                  <p className="text-sm text-gray-600">ราคารวมทั้งหมด</p>
                  <p className="text-2xl font-bold text-green-600">
                    ฿{(item.cartTotal).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;