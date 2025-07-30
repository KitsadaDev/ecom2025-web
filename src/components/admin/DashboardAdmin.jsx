import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getListAllUsers, getOrdersAdmin } from '../../api/admin'
import { listProduct } from '../../api/product'
import useEcomStore from '../../store/ecom-store'

const DashboardAdmin = () => {
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [orderStats, setOrderStats] = useState({
    pending: 0,
    processing: 0,
    shipped: 0,
    cancelled: 0
  })
  const [totalRevenue, setTotalRevenue] = useState(0)
  const { token } = useEcomStore()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Load users
      const resUsers = await getListAllUsers(token)
      setUsers(resUsers.data)

      // Load orders and calculate revenue
      const resOrders = await getOrdersAdmin(token)
      setOrders(resOrders.data)
      
      // Calculate total revenue from completed orders (จัดส่งแล้ว)
      const revenue = resOrders.data.reduce((total, order) => {
        if (order.orderStatus === 'จัดส่งแล้ว') {
          return total + order.cartTotal
        }
        return total
      }, 0)
      setTotalRevenue(revenue)

      // Calculate order statistics
      const stats = resOrders.data.reduce((acc, order) => {
        switch (order.orderStatus) {
          case 'รอดำเนินการ':
            acc.pending++
            break
          case 'กำลังดำเนินการ':
            acc.processing++
            break
          case 'จัดส่งแล้ว':
            acc.shipped++
            break
          case 'ยกเลิก':
            acc.cancelled++
            break
          default:
            break
        }
        return acc
      }, { pending: 0, processing: 0, shipped: 0, cancelled: 0 })
      
      setOrderStats(stats)

      // Load products
      const resProducts = await listProduct(100)
      setProducts(resProducts.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-6" style={{ fontFamily: "Anuphan" }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">แผงควบคุม-สรุปผล</h1>
        <Link 
          to="/" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          หน้าหลัก
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">รายได้ทั้งหมด</p>
              <h2 className="text-3xl font-bold">฿{totalRevenue.toLocaleString()}</h2>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">จำนวนผู้ใช้ทั้งหมด</p>
              <h2 className="text-3xl font-bold">{users.length}</h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500">จำนวนคำสั่งซื้อทั้งหมด</p>
              <h2 className="text-3xl font-bold">{orders.length}</h2>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-yellow-600">รอดำเนินการ:</span>
              <span className="font-semibold">{orderStats.pending}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">กำลังดำเนินการ:</span>
              <span className="font-semibold">{orderStats.processing}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">จัดส่งแล้ว:</span>
              <span className="font-semibold">{orderStats.shipped}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-600">ยกเลิก:</span>
              <span className="font-semibold">{orderStats.cancelled}</span>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">จำนวนสินค้าทั้งหมด</p>
              <h2 className="text-3xl font-bold">{products.length}</h2>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin
