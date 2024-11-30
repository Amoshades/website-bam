'use client';

import React, { useState } from 'react';
import NavBar from "../component/menu/navbar";
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://0.0.0.0:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: new URLSearchParams({ email, password }).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        alert("เข้าสู่ระบบสำเร็จ");
        console.log("Token:", data.token); // เก็บ Token ไว้ใช้งาน
        router.push('/homelist');
      } else {
        const errorData = await response.json();
        alert(errorData.message || "เกิดข้อผิดพลาด");
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
      <NavBar/>
      <div className=" w-full h-[799px] bg-white flex flex-row items-center">
        <div className="w-[460px] h-[478px] border m-auto flex flex-col gap-5 border-black rounded-3xl p-[30px] ">
          <div className="flex flex-col items-center">
            <p className=" text-[32px] text-main_black font-line-bold">ยินดีต้อนรับ</p>
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
            type="email"  
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button><Icon icon="ion:eye-off-outline" style={{ color: '#004C85' }} width={21} height={21} /></button>
          </div>
          <div className="text-xl font-black text-main-color font-line-bold">ลืมรหัสผ่าน?</div>
          <button 
          className="w-[400px] h-[64px] bg-main-color rounded-2xl text-xl font-black text-btn-bg font-line-bold"
          onClick={handleLogin}
          disabled={isLoading}
          >
          {isLoading ? "กำลังโหลด..." : "ลงชื่อเข้าใช้"}
          </button>
          <div className="text-xl font-black text-main-color text-center font-line-bold">สมัครสมาชิก</div>
          
        </div>
      </div>
    </div>
  );
}