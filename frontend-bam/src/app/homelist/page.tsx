'use client'
import Pagination from '@mui/material/Pagination';
import NavBar from '../component/menu/navbar';
import Search from "../component/menu/search";
import HouseWidget from "../component/houselist/houselist";
import { useState,useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';



export default function Home() {
    const [homeData, setHomeData] = useState<any[]>([]); // Initialize as an empty array

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/house/');
            // If response.data is an array, use it directly
            if (Array.isArray(response.data)) {
                setHomeData(response.data);  // Set the array directly to homeData
                console.log("done", response.data);
            } else {
                console.error("Unexpected data format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array to fetch data only once when component mounts

  
  return (
    <div className="w-full min-h-[1130px] bg-white ">
      <NavBar/>
      <div className="mt-[40px] mx-[10%] flex flex-col gap-10">
        <div className='mt-[50px] w-full h-[380px] text-main_black text-base grid grid-cols-6 gap-y-[30px] gap-x-[50px] '>
            <div className='col-span-6 font-line-bold'>ค้นหาสินทรัพย์</div>
            <div className='col-span-2 font-line-Regular'>
                <p>เลขไปรษณีย์</p>
                <input type="text" className='w-full h-[50px] mt-[10px] bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[5%]' />
            </div>
            <div className='col-span-2 font-line-Regular'>
                <p>ที่อยู่</p>
                <input type="text" className='w-full h-[50px] mt-[10px] bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[5%]' />
            </div>
            <div className='col-span-2 font-line-Regular'>
                <p>จังหวัด</p>
                <select className='w-full h-[50px] mt-[10px] select select-bordered bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[5%]'  name="cars" id="cars">
                    <option value="">โปรดเลือก</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <div className='col-span-2 font-line-Regular'>
                <p>ราคา</p>
                <input type="text" className='w-full h-[50px] mt-[10px] bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[5%]' />
            </div>
            <div className='col-span-1 font-line-Regular'>
                <p>ขนาดพื้นที่ (ตารางเมตร)</p>
                <select className='w-full h-[50px] mt-[10px] select select-bordered bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[10%]' name="cars" id="cars">
                <option value="">เลือก</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <div className='col-span-1 font-line-Regular'>
                <p>ขนาดพื้นที่ใช้สอย (ตารางเมตร)</p>
                <select className='w-full h-[50px] mt-[10px] select select-bordered bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[10%]' name="cars" id="cars">
                    <option value="">เลือก</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <div className='col-span-1 font-line-Regular'>
                <p>จำนวนห้องนอน</p>
                <select className='w-full h-[50px] mt-[10px] select select-bordered bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[10%]' name="cars" id="cars">
                    <option value="">เลือก</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <div className='col-span-1 font-line-Regular'>
                <p>จำนวนห้องน้ำ</p>
                <select className='w-full h-[50px] mt-[10px] select select-bordered bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[10%]' name="cars" id="cars">
                    <option value="">เลือก</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
        </div>
        <div className='border-b-2 w-[120%] ml-[-10%]'></div>
        <div className='flex justify-between'>
            <p className='font-line-bold text-main_black my-auto'>ผลลัพท์  6,634 รายการ</p>
            <select className='w-[200px] h-[50px] select select-bordered font-line-Regular bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[2%]' name="cars" id="cars">
                    <option value="">ราคาต่ำ - สูง</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
            </select>
        </div>
        <div className='flex gap-[30px] font-line-Regular'>
            <button className="bg-white  rounded-full text-main_black border-main-color border px-[30px] py-[10px]">ทั้งหมด</button>
            <button className="bg-white  rounded-full text-main_black border-main-color border px-[30px] py-[10px]">สินทรัพย์ราคาพิเศษ</button>
            <button className="bg-white  rounded-full text-main_black border-main-color border px-[30px] py-[10px]">สินทรัพย์สำหรับสมาชิกออนไลน์</button>
        </div>
        <div className='grid grid-cols-4 gap-4'>
            {homeData.length > 0 && homeData.map((e) => {
                return (
                    <HouseWidget key={e.id} id={e.id} name={e.name} price={e.price} address={e.address} area={e.area} />
                );
            })}
        </div>
        


       
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