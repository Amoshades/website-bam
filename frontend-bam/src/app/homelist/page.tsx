'use client'
import Pagination from '@mui/material/Pagination';
import NavBar from '../component/menu/navbar';
import Search from "../component/menu/search";
import HouseWidget from "../component/houselist/houselist";
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import Footer from '../component/menu/footer';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';



export default function Home() {

    const [homeData, setHomeData] = useState<any[]>([]); // ข้อมูลอสังหาริมทรัพย์
    const [provinces, setProvinces] = useState<string[]>([]);
    const [districts, setDistricts] = useState<string[]>([]);
    const [subDistricts, setSubDistricts] = useState<string[]>([]); // ตำบล
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>(''); // อำเภอที่เลือก
    const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>(''); // ตำบลที่เลือก
    const [assetType, setAssetType] = useState<string>(''); // ประเภทอสังหาริมทรัพย์
    const [assetName, setAssetName] = useState<string>(''); // ชื่อ
    const [minPrice, setMinPrice] = useState<number | '0'>('0'); // ราคาต่ำสุด
    const [maxPrice, setMaxPrice] = useState<number | '5000000'>('5000000'); // ราคาสูงสุด
    const [currentPage, setCurrentPage] = useState<number>(1); // หน้าปัจจุบัน
    const itemsPerPage = 20; // จำนวนรายการต่อหน้า
    const [allProvinces, setAllProvinces] = useState<string[]>([]);
    const [allDistricts, setAllDistricts] = useState<string[]>([]);
    const [allSubDistricts, setAllSubDistricts] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    const fetchData = async () => {
        try {
            // ใช้ searchParams สำหรับรับ Query Parameters จาก URL
            const searchParams = new URLSearchParams(window.location.search);

            // รับค่าพารามิเตอร์จาก URL
            const assetName = searchParams.get("asset_name") || "";
            const assetType = searchParams.get("asset_type") || "";
            const district = searchParams.get("district") || "";
            const province = searchParams.get("provice") || "";

            // สร้าง params สำหรับ API
            const params = new URLSearchParams();
            if (assetName) params.append("asset_project_name", assetName);
            if (assetType) params.append("asset_type", assetType);
            if (district) params.append("district", district);
            if (province) params.append("provice", province);

            let fullURL = "";

            // ตรวจสอบว่ามี params หรือไม่
            if (params.toString()) {
                // ถ้ามี params ใช้ API ค้นหา
                fullURL = `http://localhost:8000/house/search?${params.toString()}`;
            } else {
                // ถ้าไม่มี params ใช้ API หลัก
                fullURL = "http://localhost:8000/house/";
                console.log(homeData);
            }

            console.log("Request URL:", fullURL);

            // ดึงข้อมูลจาก API
            const response = await axios.get(fullURL);
            router.replace('/homelist');
            if (response.data?.results) {
                // กรณี API ค้นหา
                setHomeData(response.data.results);
                setErrorMessage("");
                console.log("Filtered data loaded:", response.data.results);
            } else if (Array.isArray(response.data)) {
                // กรณี API หลัก
                setHomeData(response.data);
                setErrorMessage("");
                console.log("All data loaded:", response.data);
            } else {
                setErrorMessage("ไม่พบผลลัพธ์");
                setHomeData([]);
            }
        } catch (error: any) {
            if (error.response?.status === 404 && error.response?.data?.detail) {
                setErrorMessage(error.response.data.detail); // แสดงข้อความ "ไม่พบผลลัพธ์"
                setHomeData([]); // ล้างข้อมูล
            } else {
                setErrorMessage("เกิดข้อผิดพลาดในการโหลดข้อมูล");
                console.error("Error fetching data:", error);
            }
        }
    };


    // โหลดข้อมูลจังหวัดจากไฟล์ JSON ด้วย axios
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get<{ province: string; amphoe: string; district: string }[]>('/data/raw_database.json');// ดึง JSON จาก public
                const uniqueProvinces = Array.from(new Set(response.data.map((item: any) => item.province)));
                setAllProvinces(uniqueProvinces); // เซ็ตจังหวัดลง state
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);
    // โหลดข้อมูลอำเภอตามจังหวัดที่เลือก
    const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvince = e.target.value;
        console.log("Selected Province:", selectedProvince); // Debugging
        setSelectedProvince(selectedProvince);
        setSelectedSubDistrict('');
        try {
            const response = await axios.get<{ province: string; amphoe: string; district: string }[]>('/data/raw_database.json');

            const filteredDistricts = response.data
                .filter((item) => item.province === selectedProvince)
                .map((item) => item.amphoe);
            const uniqueDistricts = Array.from(new Set(filteredDistricts)) as string[];

            setAllDistricts(uniqueDistricts);
            setAllSubDistricts([]);
            setSelectedDistrict('');
            setSelectedSubDistrict('');
            console.log({
                selectedProvince, // ตรวจสอบจังหวัด
                selectedDistrict: '', // รีเซ็ตค่า
                selectedSubDistrict: '', // รีเซ็ตค่า
            });

        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrict = e.target.value;
        setSelectedDistrict(selectedDistrict);

        try {
            const response = await axios.get<{ province: string; amphoe: string; district: string }[]>('/data/raw_database.json');

            const filteredSubDistricts = response.data
                .filter((item) => item.amphoe === selectedDistrict)
                .map((item) => item.district);
            const uniqueSubDistricts = Array.from(new Set(filteredSubDistricts)) as string[];

            setAllSubDistricts(uniqueSubDistricts);
            setSelectedSubDistrict('');
            console.log({
                selectedProvince, // ตรวจสอบจังหวัดปัจจุบัน
                selectedDistrict, // ตรวจสอบอำเภอที่เลือก
                selectedSubDistrict: '', // รีเซ็ตตำบล
            });
        } catch (error) {
            console.error('Error fetching sub-districts:', error);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = homeData.slice(startIndex, endIndex); // ข้อมูลของหน้าปัจจุบัน




    // ฟังก์ชันเปลี่ยนหน้า Pagination
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    }

  

    const handleSearch = async () => {
        try {
            const params = new URLSearchParams();

            // Add data from state to query parameters
            if (assetName) params.append('asset_name', assetName);
            if (assetType) params.append('asset_type', assetType);
            if (minPrice) params.append('min_price', String(minPrice));
            if (maxPrice) params.append('max_price', String(maxPrice));
            if (provinces) params.append('provice', selectedProvince);
            if (selectedDistrict) params.append('district', selectedDistrict);
            if (selectedSubDistrict) params.append('sub_district', selectedSubDistrict);

            const response = await axios.get(`http://localhost:8000/house/search?${params.toString()}`);

            if (response.data?.results) {
                setHomeData(response.data.results); // Set the data from API
                setErrorMessage(""); // Clear error message
                Swal.fire({
                    icon: 'success',
                    title: 'ค้นหาสำเร็จ',
                    text: `พบ ${response.data.results.length} รายการ`,
                });
            } else {
                setHomeData([]); // If no results, clear the data
                setErrorMessage("ไม่พบผลลัพธ์");
                Swal.fire({
                    icon: 'warning',
                    title: 'ไม่พบผลลัพธ์',
                    text: 'โปรดลองปรับเงื่อนไขการค้นหา',
                });
            }
        } catch (error: any) {
            if (error.response?.status === 404 && error.response?.data?.detail) {
                setErrorMessage(error.response.data.detail); // แสดงข้อความ "ไม่พบผลลัพธ์"
                setHomeData([]); // ล้างข้อมูล
                Swal.fire({
                    icon: 'warning',
                    title: 'ไม่พบผลลัพธ์',
                    text: '',
                });
            } else {
                setErrorMessage("เกิดข้อผิดพลาดในการโหลดข้อมูล");
                console.error("Error fetching data:", error);
            }
            setHomeData([]); // Clear data on error
        }
    };



    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className='w-full'>
            <div className="w-full min-h-[3150px] bg-white ">
                <NavBar />
                <div className="mt-[40px] mx-[10%] flex flex-col gap-10">
                    <div className='mt-[50px] w-full h-[380px] text-main_black text-base grid grid-cols-6 gap-y-[30px] gap-x-[50px] '>
                        <div className='col-span-6 font-line-bold'>ค้นหาสินทรัพย์</div>
                        <div className='col-span-2 font-line-Regular'>
                            <p>ชื่อ</p>
                            <input
                                type="text"
                                value={assetName}
                                name='name'
                                className='w-full h-[50px] mt-[10px] bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[5%]'
                                onChange={(e) => setAssetName(e.target.value)}
                            />
                        </div>
                        <div className='col-span-2 font-line-Regular'>
                            <p>ราคา</p>
                            <input
                                value={minPrice}
                                type="text"
                                className='w-[50%] h-[20px] float-right my-[10px] bg-transparent outline-none text-right text-base te rounded-full text-main_black px-[5%]'
                                onChange={(e) => setMinPrice(Number(e.target.value) || '0')} // แก้ไข onChange
                            />
                            <input
                                type="range"
                                min={0}
                                max="50000"
                                value={minPrice}
                                className="range range-xs range-primary"
                                step="10000"
                                onChange={(e) => setMinPrice(Number(e.target.value))} // onChange สำหรับ range
                            />
                        </div>

                        <div className='col-span-2 font-line-Regular'>
                            <p>ราคา</p>
                            <input
                                value={maxPrice}
                                type="text"
                                className='w-[50%] h-[20px] float-right my-[10px] bg-transparent outline-none text-right text-base te rounded-full text-main_black px-[5%]'
                                onChange={(e) => setMaxPrice(Number(e.target.value) || '5000000')} // แก้ไข onChange
                            />
                            <input
                                type="range"
                                min="50000"
                                max="5000000"
                                value={maxPrice}
                                className="range range-xs range-primary"
                                step="10000"
                                onChange={(e) => setMaxPrice(Number(e.target.value))} // onChange สำหรับ range
                            />
                        </div>

                        <div className='col-span-2 font-line-Regular'>
                            <p>ประเภท</p>
                            <select
                                name='type'
                                className='w-full h-[50px] mt-[10px] select select-bordered bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[5%]'
                                onChange={(e) => setAssetType(e.target.value)}
                            >
                                <option value="">โปรดเลือก</option>
                                <option value="ห้องชุดพักอาศัย">ห้องชุดพักอาศัย</option>
                                <option value="ทาวน์เฮ้าส์">ทาวน์เฮ้าส์</option>
                            </select>
                        </div>

                        <div className='col-span-1 font-line-Regular'>
                            <p>จังหวัด</p>
                            <select
                                value={selectedProvince}
                                onChange={handleProvinceChange} // Ensure this handler updates the state
                                className="w-full h-[50px] mt-[10px] select select-bordered bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[10%]"
                            >
                                <option value="">เลือกจังหวัด</option>
                                {allProvinces.map((province, index) => (
                                    <option key={index} value={province}>
                                        {province}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='col-span-1 font-line-Regular'>
                            <p>อำเภอ</p>
                            <select
                                className="w-full h-[50px] mt-[10px] select select-bordered bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[10%]"
                                value={selectedDistrict}
                                onChange={handleDistrictChange} // Correctly linked to `handleDistrictChange`

                            >
                                <option value="">เลือกอำเภอ</option>
                                {allDistricts.map((district, index) => (
                                    <option key={index} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='col-span-1 font-line-Regular'>
                            <p>ตำบล</p>
                            <select
                                className="w-full h-[50px] mt-[10px] select select-bordered bg-transparent outline-none after:outline-none text-base border rounded-full text-main_black px-[10%]"
                                value={selectedSubDistrict}
                                onChange={(e) => {
                                    setSelectedSubDistrict(e.target.value);
                                    console.log({
                                        selectedProvince, // จังหวัดปัจจุบัน
                                        selectedDistrict, // อำเภอปัจจุบัน
                                        selectedSubDistrict: e.target.value, // ตำบลที่เลือก
                                    });
                                }}
                            >
                                <option value="">เลือกตำบล</option>
                                {allSubDistricts.map((subDistrict, index) => (
                                    <option key={index} value={subDistrict}>
                                        {subDistrict}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='col-span-1 font-line-Regular justify-center'>
                            <button
                                onClick={handleSearch}
                                className="w-full h-[50px] mt-[34px] bg-main-color text-base rounded-full text-white font-line-bold px-[10%]"
                            >
                                ค้นหาสินทรัพย์
                            </button>
                        </div>

                    </div>
                    <div className='border-b-2 w-[120%] ml-[-10%]'></div>
                    <div className='flex justify-between'>
                        <p className='font-line-bold text-main_black my-auto'>ผลลัพท์  {homeData.length} รายการ</p>
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
                        {errorMessage ? (
                            <p className="col-span-4 text-center text-main_black font-line-bold">{errorMessage}</p>
                        ) : currentData.length > 0 ? (
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
            <Footer />
        </div>
    );
}