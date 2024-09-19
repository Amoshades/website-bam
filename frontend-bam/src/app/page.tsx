'use client'
import Pagination from '@mui/material/Pagination';
import NavBar from "./component/menu/navbar";
import Search from "./component/menu/search";
import HouseWidget from "./component/houselist/houselist";
import { useState } from 'react';

export default function Home() {
  
  return (
    <div className="w-full min-h-[1080px] bg-white">
      <NavBar/>
      <Search/>
      <div className="mt-[87px] mx-[10%]">
        <HouseWidget/>
        <div>
          <Pagination
            count={Math.ceil(20 / 5)}  // จำนวนหน้าทั้งหมด
            page={1}  // หน้าปัจจุบัน
            // ฟังก์ชันสำหรับเปลี่ยนหน้า
            shape="rounded"  // ปรับรูปทรงของปุ่มเป็นมุมโค้งมน
            siblingCount={1}  // แสดงเลขหน้าถัดจากปุ่มปัจจุบัน
            boundaryCount={1} // แสดงเลขหน้าที่ต้นและท้าย
          />
        </div>
      </div>
    </div>
  );
}
