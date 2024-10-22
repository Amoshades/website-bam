'use client'
import Pagination from '@mui/material/Pagination';
import NavBar from "./component/menu/navbar";
import Search from "./component/menu/search";
import HouseWidget from "./component/houselist/houselist";
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function Home() {
  
  return (
    <div className="w-full min-h-[1130px] bg-white">
      <NavBar/>
      <Search/>
      <div className="mt-[40px] mx-[10%] flex flex-col gap-10">
        <HouseWidget/>
        <div className='w-full flex flex-col items-center '>
          <Pagination
            className=''
            count={Math.ceil(20 / 5)}  // จำนวนหน้าทั้งหมด
            page={1}  // หน้าปัจจุบัน
             // ฟังก์ชันสำหรับเปลี่ยนหน้า
            shape="rounded"  // ปรับรูปทรงของปุ่มเป็นมุมโค้งมน
            siblingCount={1}  // แสดงเลขหน้าถัดจากปุ่มปัจจุบัน
            boundaryCount={1} // แสดงเลขหน้าที่ต้นและท้าย
          />
        </div>
        <button className=' mx-auto bg-main-color rounded-full px-[35px] py-[10px] flex flex-row gap-3 items-center'>
          <span><Icon icon="material-symbols:home" style={{ color: '#FFFFFF' }} width={21} height={21} /></span>
          <p className=' text-white text-xl'>ดูทรัพย์ทั้งหมด</p>
        </button>
      </div>
    </div>
  );
}