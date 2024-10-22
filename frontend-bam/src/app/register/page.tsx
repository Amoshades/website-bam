'use client'
import NavBar from "../component/menu/navbar";
import { Icon } from '@iconify/react';

export default function Register() {
  return (
    <div className=" ">
        <NavBar/>
        <div className="w-full h-[799px] bg-white px-[192px] py-[30px] flex flex-col gap-[30px]">
            <p className="text-main_black font-bold text-xl">สมัครสมาชิก</p>
            <div className=" flex flex-row gap-[50px]">
                <div className="flex flex-col gap-[20px]">
                    <div>
                        <p className="text-base text-main_black">ชื่อ</p>
                        <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                            <input className="bg-transparent outline-none after:outline-none text-base text-main_black" type="email" name="" id="" />
                        </div>
                    </div>
                    <div>
                        <p className="text-base text-main_black">เบอร์โทรศัพท์</p>
                            <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                                <input className="bg-transparent outline-none after:outline-none text-base text-main_black" type="email" name="" id="" />
                            </div>
                    </div>
                    <div>
                        <p className="text-base text-main_black">รหัสผ่าน</p>
                        <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                            <input className="bg-transparent outline-none after:outline-none text-base text-main_black" type="email" name="" id="" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                    <div>
                        <p className="text-base text-main_black">นามสกุล</p>
                        <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                            <input className="bg-transparent outline-none after:outline-none text-base text-main_black" type="email" name="" id="" />
                        </div>
                    </div>
                    <div>
                        <p className="text-base text-main_black">อีเมล</p>
                            <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                                <input className="bg-transparent outline-none after:outline-none text-base text-main_black" type="email" name="" id="" />
                            </div>
                    </div>
                    <div>
                        <p className="text-base text-main_black">กรอกรหัสผ่านอีกครั้ง</p>
                        <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex justify-between items-center py-3 mt-[10px]">
                            <input className="bg-transparent outline-none after:outline-none text-base text-main_black" type="email" name="" id="" />
                            <button><Icon icon=":ion:eye-off-outline" style={{ color: '#004C85' }} width={21} height={21} /></button>
                        </div>
                    </div>
                </div>
            </div>
            <button className="text-left py-[10px] px-[25px] bg-button w-fit rounded-3xl text-main_black text-base">สมัครสมาชิก</button>
        </div>
    </div>
    
  );
}