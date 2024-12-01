'use client'
import Pagination from '@mui/material/Pagination';
import NavBar from '../component/menu/navbar';
import Search from "../component/menu/search";
import HouseWidget from "../component/houselist/houselist";
import { useState,useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import Footer from '../component/menu/footer';



export default function Home() {
    const [homeData, setHomeData] = useState<any[]>([]); // ข้อมูลทั้งหมด
    const [currentPage, setCurrentPage] = useState<number>(1); // หน้าปัจจุบัน
    const itemsPerPage = 20; // จำนวนรายการต่อหน้า

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
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = homeData.slice(startIndex, endIndex); // ข้อมูลของหน้าปัจจุบัน

    // ฟังก์ชันเปลี่ยนหน้า Pagination
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        fetchData();
    }, []); 

  
  return (
    <div className='w-full'>
        <div className="w-full min-h-[3150px] bg-white ">
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
            <div className="grid grid-cols-4 gap-[30px]">
            {currentData.length > 0 ? (
                currentData.map((e, index) => (
                <HouseWidget
                    key={index}
                    id={e.asset_id}
                    name={e.asset_project_name}
                    price={e.price}
                    provice={e.provice}
                    subdistrict={e.sub_district}
                    area={e.area}
                />
                ))
            ) : (
                <p className="col-span-4 text-center">ไม่มีข้อมูล</p>
            )}
            </div>
            


        
            <div className="w-full mt-[30px] flex justify-center">
            <Pagination
                count={Math.ceil(homeData.length / itemsPerPage)} // จำนวนหน้าทั้งหมด
                page={currentPage} // หน้าปัจจุบัน
                onChange={handlePageChange} // ฟังก์ชันเปลี่ยนหน้า
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
            />
            </div>
        </div>
        </div>
        <Footer/>
    </div>
  );
}