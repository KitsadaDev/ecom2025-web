import React, { useState, useEffect } from "react";
import { getListAllUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";
import { changeUserStatus, changeUserRole } from "../../api/admin";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("เปลี่ยนสถานะผู้ใช้งานสำเร็จ!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("เปลี่ยนสิทธิ์ผู้ใช้งานสำเร็จ!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{ fontFamily: "Anuphan" }}
      className="container mx-auto p-8 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-xl"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">จัดการผู้ใช้งาน</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 border-b border-b-gray-200 tracking-wider">ลำดับ</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 border-b border-b-gray-200 tracking-wider">อีเมลล์</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 border-b border-b-gray-200 tracking-wider">แก้ไขล่าสุด</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 border-b border-b-gray-200 tracking-wider">สิทธิ์</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 border-b border-b-gray-200 tracking-wider">สถานะ</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 border-b border-b-gray-200 tracking-wider">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 text-sm text-gray-600 text-center">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{dateFormat(item.updatedAt)}</td>
                <td className="px-6 py-4">
                  <select
                    onChange={(e) => handleChangeUserRole(item.id, e.target.value)}
                    value={item.role}
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             cursor-pointer transition-all duration-200 hover:border-blue-400"
                  >
                    <option value="user">ผู้ใช้งาน</option>
                    <option value="admin">ผู้ดูแลระบบ</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium
                    ${
                      item.enabled
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      item.enabled ? "bg-green-500" : "bg-red-500"
                    }`}></span>
                    {item.enabled ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleChangeUserStatus(item.id, item.enabled)}
                    className={`
                      flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium
                      transform hover:scale-102 active:scale-98
                      transition-all duration-200 ease-out
                      shadow-sm hover:shadow-md cursor-pointer
                      ${
                        item.enabled
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }
                    `}
                  >
                    <i
                      className={`fas fa-${
                        item.enabled ? "ban" : "check-circle"
                      } text-sm`}
                    ></i>
                    {item.enabled ? "ปิดใช้งาน" : "เปิดใช้งาน"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableUsers;
