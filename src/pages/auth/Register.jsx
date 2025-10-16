import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";

const registerSchema = z
  .object({
    email: z.string().email({ message: "ที่อยู่อีเมลไม่ถูกต้อง!" }),
    password: z
      .string()
      .min(8, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน!",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score;
    // if (passwordScore < 2) {
    //   toast.warning("รหัสผ่านไม่ปลอดภัย! กรุณาใช้รหัสผ่านที่มีความซับซ้อนมากขึ้น");
    //   return;
    // }
    try {
      const res = await axios.post("https://ecom2025-api-weld.vercel.app/api/register", data);
      console.log(res.data);
      toast.success("Register successful!");
    } catch (err) {
      const errMsg = err.response
        ? err.response.data.message
        : "Registration failed";
      toast.error(errMsg);
      console.err("Registration failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2
            style={{ fontFamily: "Anuphan" }}
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          >
            สมัครสมาชิก
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                style={{ fontFamily: "Anuphan" }}
                className="block text-sm font-medium text-gray-700"
              >
                อีเมล
              </label>

              <input
                {...register("email")}
                className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                 focus:outline-none ${
                   errors.email
                     ? "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                     : "focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                 }`}
                placeholder="your@email.com"
                type="email"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                style={{ fontFamily: "Anuphan" }}
                className="block text-sm font-medium text-gray-700"
              >
                รหัสผ่าน
              </label>

              <input
                {...register("password")}
                className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                 focus:outline-none ${
                   watch().password?.length > 0
                     ? passwordScore <= 2
                       ? "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                       : passwordScore < 4
                       ? "focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                       : "focus:border-green-500 focus:ring-1 focus:ring-green-500"
                     : "focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                 }`}
                placeholder="••••••••"
                type="password"
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                style={{ fontFamily: "Anuphan" }}
                className="block text-sm font-medium text-gray-700"
              >
                ยืนยันรหัสผ่าน
              </label>

              <input
                {...register("confirmPassword")}
                className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                 focus:outline-none ${
                   watch().confirmPassword?.length > 0
                     ? watch().password === watch().confirmPassword
                       ? "focus:border-green-500 focus:ring-1 focus:ring-green-500"
                       : "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                     : "focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                 }`}
                placeholder="••••••••"
                type="password"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              style={{ fontFamily: "Anuphan" }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out cursor-pointer"
            >
              สมัครสมาชิก
            </button>
          </div>
        </form>

        <div className="text-sm text-center mt-4">
          <span style={{ fontFamily: "Anuphan" }} className="text-gray-500">
            มีบัญชีอยู่แล้ว?{" "}
          </span>
          <Link
            to="/login"
            style={{ fontFamily: "Anuphan" }}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
