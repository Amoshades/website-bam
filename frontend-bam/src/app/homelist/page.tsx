'use client'
import Pagination from '@mui/material/Pagination';
import NavBar from '../component/menu/navbar';
import Search from "../component/menu/search";
import HouseWidget from "../component/houselist/houselist";
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function Home() {
  
  return (
    <div className="w-full min-h-[1130px] bg-white">
      <NavBar/>
      
      <div className="mt-[40px] mx-[10%] flex flex-col gap-10">
        <div className='pt-[50px] grid w-full h-[380px] text-main_black text-xl '>
            <div>ค้นหาสินทรัพย์</div>
            <div>
                <p>เลขไปรษณีย์</p>
                <input type="text" className='bg-transparent outline-none after:outline-none text-base border rounded-xl text-main_black' />
            </div>
            <div>
                <p>เลขไปรษณีย์</p>
                <input type="text" className='bg-transparent outline-none after:outline-none text-base border rounded-xl text-main_black' />
            </div>
            <div>
                <p>เลขไปรษณีย์</p>
                <input type="text" className='bg-transparent outline-none after:outline-none text-base border rounded-xl text-main_black' />
            </div>
            <div>
                <p>เลขไปรษณีย์</p>
                <input type="text" className='bg-transparent outline-none after:outline-none text-base border rounded-xl text-main_black' />
            </div>
            <div>
                <p>เลขไปรษณีย์</p>
                <input type="text" className='bg-transparent outline-none after:outline-none text-base border rounded-xl text-main_black' />
            </div>
            <div>
                <p>เลขไปรษณีย์</p>
                <input type="text" className='bg-transparent outline-none after:outline-none text-base border rounded-xl text-main_black' />
            </div>
            <div>
                <p>เลขไปรษณีย์</p>
                <input type="text" className='bg-transparent outline-none after:outline-none text-base border rounded-xl text-main_black' />
            </div>
            <div>
                <p>เลขไปรษณีย์</p>
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
        </div>
        <div>

        </div>
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
      </div>
    </div>
  );
}