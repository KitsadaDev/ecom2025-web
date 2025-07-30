import React, { useState, useEffect } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { dateFormat } from "../../utils/dateformat";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res);
        toast.success("เปลี่ยนสถานะคำสั่งซื้อสำเร็จ!");
        handleGetOrder(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Anuphan" }}>จัดการคำสั่งซื้อ</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr style={{ fontFamily: "Anuphan" }} className="bg-gray-50">
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">ลำดับ</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">ชื่อผู้ใช้งาน</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">เวลาที่สั่งซื้อ</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">สินค้า</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">รวม</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">สถานะ</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders?.map((item, index) => (
              <tr
                key={index}
                style={{ fontFamily: "Anuphan" }}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-center font-medium text-gray-800">{index + 1}</td>
                <td className="px-6 py-4">
                  <p className="text-gray-800 font-medium">{item.orderedBy.email}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.orderedBy.address}</p>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {dateFormat(item.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <ul className="space-y-2">
                    {item.products?.map((product, index) => (
                      <li key={index} className="text-gray-700">
                        {product.product.title}{" "}
                        <span className="text-sm text-gray-600">
                          {product.count}
                          <i className="fa-solid fa-xmark text-[11px] mx-1 text-gray-400"></i>{" "}
                          ฿{Number(product.product.price).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  ฿{Number(item.cartTotal).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {item.orderStatus === "รอดำเนินการ" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      {item.orderStatus}
                    </span>
                  )}
                  {item.orderStatus === "กำลังดำเนินการ" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {item.orderStatus}
                    </span>
                  )}
                  {item.orderStatus === "จัดส่งแล้ว" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {item.orderStatus}
                    </span>
                  )}
                  {item.orderStatus === "ยกเลิก" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      {item.orderStatus}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={item.orderStatus}
                    onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  >
                    <option value="รอดำเนินการ">รอดำเนินการ</option>
                    <option>กำลังดำเนินการ</option>
                    <option>จัดส่งแล้ว</option>
                    <option>ยกเลิก</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
