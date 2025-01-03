'use client';
import { useState, useEffect } from "react";
import NavBar from "../component/menu/navbar";
import { Icon } from '@iconify/react';
import Swal from "sweetalert2";
import Footer from "../component/menu/footer";
import HouseWidget from "../component/houselist/houselist";
import Pagination from '@mui/material/Pagination';

export default function Favorite() {
    const [homeData, setHomeData] = useState<any[]>([]); // ข้อมูลทั้งหมด
    const [currentPage, setCurrentPage] = useState<number>(1); // หน้าปัจจุบัน
    const itemsPerPage = 4; // จำนวนรายการต่อหน้า
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = homeData.slice(startIndex, endIndex);

    const [profile, setProfile] = useState({
        name: "",
        surname: "",
        number: "",
        email: "",
    });
    
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    }


    const fetchFavorites = async () => {
        try {
            const response = await fetch('http://localhost:8000/users/show-favorites', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                credentials: 'include', // Include cookies
            });

            if (response.ok) {
                const data = await response.json();
                setHomeData(data.favorites); // Update home data
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Unable to fetch favorite houses.",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Error fetching favorites:", error);
            Swal.fire({
                title: "Error",
                text: "Unable to connect to the server.",
                icon: "error",
            });
        }
    };

    useEffect(() => {
        fetchFavorites(); // Load favorites on component mount
    }, []);

    // Handle edit button
    

    return (
        <div>
            <NavBar />
            <div className="w-full h-[799px] bg-white px-[192px] py-[30px] flex flex-row">
                <div className="w-[258px] h-[305px] px-[20px] flex flex-col gap-[30px] font-line-bold">
                    <a href="http://localhost:3000/accounts" className="flex flex-row gap-3 items-center text-main-color">
                        <span>
                            <Icon icon="material-symbols:account-circle-outline" className="text-black" width={27.5} height={27.5} />
                        </span>
                        <p className="text-black text-xl font-normal">บัญชี</p>
                    </a>
                    <a href="http://localhost:3000/favorite" className="flex flex-row gap-3 items-center">
                        <span>
                            <Icon icon="mdi:heart-outline" className="text-main-color " width={27.5} height={27.5} />
                        </span>
                        <p className="text-main-color  text-xl font-normal">รายการโปรด</p>
                    </a>

                    <button className="flex flex-row gap-3 items-center pl-[20px]">
                        <p className="text-red-600 text-xl font-bold">ลบบัญชี</p>
                    </button>
                </div>
                <div className="w-[1278px] h-[406px] px-[129px] py-[30px] flex flex-col gap-[30px]">
                    <div className='grid grid-cols-3'>
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
                            <p className="col-span-4 text-main_black font-line-Regular text-center">ไม่มีข้อมูล</p>
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
                </div>
            </div>
            <Footer />
        </div>
    );
}