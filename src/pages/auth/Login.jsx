import React, { useState } from "react";
import { toast } from 'react-toastify';
import useEcomStore from "../../store/ecom-store";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

const navigate = useNavigate();
const actionLogin = useEcomStore((state) => state.actionLogin);
const user = useEcomStore((state) => state.user);
console.log("User from zustand:", user);

const [form, setForm] = useState({
  email: "",
  password: ""
});
const [isValidEmail, setIsValidEmail] = useState(true);

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const handleOnChange = (e) => {
  if (e.target.name === 'email') {
    setIsValidEmail(validateEmail(e.target.value));
  }
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
}

const handleOnSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await actionLogin(form);
    const role = res.data.payload.role;
    roleRedirect(role);
    toast.success("Login successful!");
  } catch (err) {
    console.error("Login failed:", err);
    const errMsg = err.response ? err.response.data.message : "Login failed";
        toast.error(errMsg);
  }
  
}

const roleRedirect = (role) => {
  if (role === "admin") {
    navigate("/admin");
  } else {
    navigate("/shop");
  }
}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 style={{ fontFamily: "Anuphan" }} className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            เข้าสู่ระบบ
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleOnSubmit}>
          <div className="space-y-4">
            <div>
              <label style={{ fontFamily: "Anuphan" }} className="block text-sm font-medium text-gray-700">
                อีเมล
              </label>
              <input 
                className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none ${
                  form.email && !isValidEmail
                    ? "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                }`}
                onChange={handleOnChange} 
                name="email" 
                type="email"
                placeholder="your@email.com" 
                required
              />
            </div>

            <div>
              <label style={{ fontFamily: "Anuphan" }} className="block text-sm font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <input 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                onChange={handleOnChange} 
                name="password" 
                type="password"
                placeholder="••••••••" 
                required
              />
            </div>
          </div>

          <div>
            <button
              style={{ fontFamily: "Anuphan" }} 
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <span style={{ fontFamily: "Anuphan" }} className="text-gray-500">ยังไม่มีบัญชี? </span>
          <Link to="/register" style={{ fontFamily: "Anuphan" }} className="font-medium text-blue-600 hover:text-blue-500">
            สมัครสมาชิก
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
