'use client'
import Pagination from '@mui/material/Pagination';
import NavBar from './component/menu/navbar';
import Search from './component/menu/search';
import HouseWidget from './component/houselist/houselist';
import { useState,useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';



export default function Home() {
  const [homeData, setHomeData] = useState<any[]>([]); // ข้อมูลทั้งหมด
  const [currentPage, setCurrentPage] = useState<number>(1); // หน้าปัจจุบัน
  const itemsPerPage = 4; // จำนวนรายการต่อหน้า

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
    <div className="w-full min-h-[1130px] bg-white">
      <NavBar/>
      <Search/>
      <div className="mt-[40px] mx-[10%] flex flex-col gap-10">
        <div className='grid grid-cols-4'>
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
        
        <div className='w-full flex flex-col items-center '>
          <Pagination
              count={Math.ceil(homeData.length / itemsPerPage)} // จำนวนหน้าทั้งหมด
              page={currentPage} // หน้าปัจจุบัน
              onChange={handlePageChange} // ฟังก์ชันเปลี่ยนหน้า
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
        </div>
        <button className=' mx-auto bg-main-color rounded-full px-[35px] py-[10px] flex flex-row gap-3 items-center'>
          <span><Icon icon="material-symbols:home" style={{ color: '#FFFFFF' }} width={21} height={21} /></span>
          <a href='http://localhost:3000/homelist' className=' text-white text-xl font-line-Regular'>ดูทรัพย์ทั้งหมด</a>
        </button>
      </div>
    </div>
  );
}