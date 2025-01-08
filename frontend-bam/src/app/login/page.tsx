'use client';

import React, { useState } from 'react';
import NavBar from "../component/menu/navbar";
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Footer from '../component/menu/footer';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  // ตรวจสอบรูปแบบอีเมล
  const validateEmail = (email: string) => {
    const validDomains = ['@gmail.com', '@hotmail.com', '@outlook.com', '@outlook.co.th'];
    return validDomains.some(domain => email.endsWith(domain));
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire({
        title: 'กรุณากรอกอีเมลและรหัสผ่าน',
        text: '',
        icon: 'error',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'bg-red-500 text-white px-6 py-2 rounded-full',
        },
      });
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire({
        title: 'รูปแบบอีเมลไม่ถูกต้อง',
        text: 'กรุณากรอกอีเมล',
        icon: 'error',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'bg-red-500 text-white px-6 py-2 rounded-full',
        },
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        await Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ!',
          text: '',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'bg-blue-500 text-white px-6 py-2 rounded-full',
          },
        });
        router.push('/homelist');
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: errorData.message || 'ไม่สามารถเข้าสู่ระบบได้',
          icon: 'error',
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'bg-red-500 text-white px-6 py-2 rounded-full',
          },
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="w-full h-[799px] bg-white flex flex-row items-center">
        <div className="w-[460px] h-[478px] border m-auto flex flex-col gap-5 border-black rounded-3xl p-[30px]">
          <div className="flex flex-col items-center">
            <p className="text-[32px] text-main_black font-line-bold">ยินดีต้อนรับ</p>
            <p className="text-[24px] text-main-color font-line-bold">เข้าสู่ระบบสมาชิก</p>
          </div>
          <div className="w-[400px] h-[64px] border border-black rounded-2xl px-5 flex items-center py-3">
            <input
              className="bg-transparent outline-none after:outline-none text-xl text-main_black font-line-Regular"
              type="email"
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-[400px] h-[64px] border border-black rounded-2xl px-5 py-3 flex justify-between items-center">
            <input
              className="bg-transparent outline-none after:outline-none text-xl text-main_black font-line-Regular"
              type={showPassword ? "text" : "password"}
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon
                icon={showPassword ? "ion:eye-outline" : "ion:eye-off-outline"}
                style={{ color: '#004C85' }}
                width={21}
                height={21}
              />
            </button>
          </div>
          <div className="text-xl font-black text-main-color font-line-bold">ลืมรหัสผ่าน?</div>
          <button
            className="w-[400px] h-[64px] bg-main-color rounded-2xl text-xl font-black text-btn-bg font-line-bold"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "กำลังโหลด..." : "ลงชื่อเข้าใช้"}
          </button>
          <a href='http://localhost:3000/register' className="text-xl font-black text-main-color text-center font-line-bold">สมัครสมาชิก</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
