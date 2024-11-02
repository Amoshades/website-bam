'use client'
import NavBar from "../component/menu/navbar";
import { Icon } from '@iconify/react';

export default function Accounts() {
  return (
    <div>
      <NavBar/>
      <div className="w-full h-[799px] bg-white px-[192px] py-[30px] flex flex-row ">
        <div className="w-[258px] h-[305px] px-[20px] flex flex-col gap-[30px] font-line-bold">
            <button className="flex flex-row gap-3 items-center">
                <span><Icon icon="material-symbols:account-circle-outline" className="text-black" width={27.5} height={27.5} /></span>
                <p className=' text-black text-xl font-normal'>บัญชี</p>
            </button>
            <button className="flex flex-row gap-3 items-center">
                <span><Icon icon="mdi:heart-outline" className="text-black" width={27.5} height={27.5} /></span>
                <p className=' text-black text-xl font-normal'>รายการโปรด</p>
            </button>
            <button className="flex flex-row gap-3 items-center">
                <span><Icon icon="material-symbols:history" className="text-black" width={27.5} height={27.5} /></span>
                <p className=' text-black text-xl font-normal'>ประวัติการซื้อขาย</p>
            </button>
            <button className="flex flex-row gap-3 items-center pl-[20px]">
                <p className=' text-red-600 text-xl font-bold '>ลบบัญชี</p>
            </button>
        </div>
        <div className="w-[1278px] h-[406px] px-[129px] py-[30px] flex flex-col gap-[30px]">
            <p className="text-main_black font-bold text-xl font-line-bold">ข้อมูลผู้ใช้</p>
            <div className=" flex flex-row gap-[50px] font-line-Regular">
                <div className="flex flex-col gap-[20px]">
                    <div>
                        <p className="text-base text-main_black">ชื่อ</p>
                        <div className="w-[485px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                            <input className="bg-transparent outline-none after:outline-none text-base text-main_black" type="email" name="" id="" />
                        </div>
                    </div>
                    <div>
                        <p className="text-base text-main_black">เบอร์โทรศัพท์</p>
                            <div className="w-[485px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                                <input className="bg-transparent outline-none after:outline-none text-base text-main_black" type="email" name="" id="" />
                            </div>
                    </div>
                    
                </div>
                <div className="flex flex-col gap-[20px]">
                    <div>
                        <p className="text-base text-main_black">นามสกุล</p>
                        <div className="w-[485px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                            <input className="bg-transparent outline-none after:outline-none text-base text-main_black" type="email" name="" id="" />
                        </div>
                    </div>
                    <div>
                        <p className="text-base text-main_black">อีเมล</p>
                            <div className="w-[485px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                                <input className="bg-transparent outline-none after:outline-none text-base text-main_black" type="email" name="" id="" />
                            </div>
                    </div>
                    
                </div>

            </div>
            <button className="font-line-Regular py-[10px] px-[25px] bg-button w-fit rounded-3xl text-main_black text-base mx-auto">แก้ไขข้อมูลส่วนตัว</button>
        </div>
      </div>
    </div>
  );
}