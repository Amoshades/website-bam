'use client'
import NavBar from "../component/menu/navbar";
import { Icon } from '@iconify/react';

export default function Login() {
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
            <input className="bg-transparent outline-none after:outline-none text-xl text-main_black font-line-Regular" type="email" name="" id="" placeholder="ชื่อผู้ใช้"/>
          </div>
          <div className="w-[400px] h-[64px] border border-black rounded-2xl px-5 py-3 flex justify-between items-center">
            <input className="bg-transparent outline-none after:outline-none text-xl text-main_black font-line-Regular" type="email" name="" id="" placeholder="รหัสผ่าน"/>
            <button><Icon icon="ion:eye-off-outline" style={{ color: '#004C85' }} width={21} height={21} /></button>
          </div>
          <div className="text-xl font-black text-main-color font-line-bold">ลืมรหัสผ่าน?</div>
          <button className="w-[400px] h-[64px] bg-main-color rounded-2xl">
            <p className=" text-xl font-black text-btn-bg font-line-bold">ลงชื่อเข้าใช้</p>
          </button>
          <div className="text-xl font-black text-main-color text-center font-line-bold">สมัครสมาชิก</div>
          
        </div>
      </div>
    </div>
  );
}