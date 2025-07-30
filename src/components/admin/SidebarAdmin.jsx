import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ShieldUser } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { ChartBarStacked } from 'lucide-react';
import { Package } from 'lucide-react';
import { UserCog } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { CalendarArrowDown } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';

const SidebarAdmin = () => {
  const logout = useEcomStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='bg-gray-800 text-white w-64 h-screen flex flex-col'>

      <div className='h-24 bg-gray-900 flex items-center justify-center mb-4 text-2xl font-bold'>
        Admin Panel
        <ShieldUser className='w-10 h-10 ml-2' />
      </div>

      <nav style={{ fontFamily: "Anuphan" }} className='flex-1 px-4 py-2 space-y-2'>
        <NavLink to={'/admin'} end className={({isActive}) => 
          isActive
          ? 'bg-gray-900 text-white flex items-center px-4 py-2 rounded-md'
          : 'text-gray-300 hover:bg-gray-700 transition-colors duration-300 hover:text-white flex items-center px-4 py-2 rounded-md'
         }>
          <LayoutDashboard className='mr-2' />
          แผงควบคุม
        </NavLink>

        <NavLink to={'manage'} className={({isActive}) => 
          isActive
          ? 'bg-gray-900 text-white flex items-center px-4 py-2 rounded-md'
          : 'text-gray-300 hover:bg-gray-700 transition-colors duration-300 hover:text-white flex items-center px-4 py-2 rounded-md'
         }>
          <UserCog className='mr-2' />
          จัดการสิทธิ์ผู้ใช้งาน
        </NavLink>

        <NavLink to={'category'} className={({isActive}) => 
          isActive
          ? 'bg-gray-900 text-white flex items-center px-4 py-2 rounded-md'
          : 'text-gray-300 hover:bg-gray-700 transition-colors duration-300 hover:text-white flex items-center px-4 py-2 rounded-md'
         }>
          <ChartBarStacked className='mr-2' />
          จัดการหมวดหมู่สินค้า
        </NavLink>

        <NavLink to={'product'} className={({isActive}) => 
          isActive
          ? 'bg-gray-900 text-white flex items-center px-4 py-2 rounded-md'
          : 'text-gray-300 hover:bg-gray-700 transition-colors duration-300 hover:text-white flex items-center px-4 py-2 rounded-md'
         }>
          <Package className='mr-2' />
          จัดการสินค้า
        </NavLink>

        <NavLink to={'orders'} className={({isActive}) => 
          isActive
          ? 'bg-gray-900 text-white flex items-center px-4 py-2 rounded-md'
          : 'text-gray-300 hover:bg-gray-700 transition-colors duration-300 hover:text-white flex items-center px-4 py-2 rounded-md'
         }>
          <CalendarArrowDown className='mr-2' />
          จัดการคำสั่งซื้อ
        </NavLink>

      </nav>

      <footer style={{ fontFamily: "Anuphan" }}>
        <button 
          onClick={handleLogout} 
          className='bg-gray-900 hover:bg-red-500 transition-colors duration-300 text-white flex items-center py-4 justify-center w-full cursor-pointer'
        >
          ออกจากระบบ
          <LogOut className='ml-2 '/>
        </button>
      </footer>

    </div>
  )
}

export default SidebarAdmin
