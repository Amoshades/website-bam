'use client';

import Image from "next/image";
import { useParams } from 'next/navigation';
import NavBar from "@/app/component/menu/navbar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import HouseWidget from "@/app/component/houselist/houselist";
import Pagination from '@mui/material/Pagination';
import Footer from "@/app/component/menu/footer";

export default function HomeDetail() {
  const params = useParams();
  const houseId = params?.id;
  const [houseData, setHouseData] = useState<any | null>(null);

  // State สำหรับแต่ละ predict_method
  const [recommendationsCF, setRecommendationsCF] = useState<any[]>([]);
  const [recommendationsAR, setRecommendationsAR] = useState<any[]>([]);
  const [recommendationsHybrid, setRecommendationsHybrid] = useState<any[]>([]);

  const [currentPageCF, setCurrentPageCF] = useState<number>(1);
  const [currentPageAR, setCurrentPageAR] = useState<number>(1);
  const [currentPageHybrid, setCurrentPageHybrid] = useState<number>(1);

  const itemsPerPage = 4;

  const fetchHouseDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/house/getdetail?asset_id=${houseId}`);
      setHouseData(response.data);
    } catch (error) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถโหลดข้อมูลทรัพย์สินได้ กรุณาลองใหม่อีกครั้ง',
        icon: 'error',
        confirmButtonText: 'ตกลง',
      });
      console.error("Error fetching house detail:", error);
    }
  };

  const fetchRecommendations = async (method: string, setter: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/recommendation/`,
        {},
        {
          params: {
            predict_method: method,
            asset_id: houseId,
          },
        }
      );
      if (Array.isArray(response.data.recommendedItems)) {
        setter(response.data.recommendedItems.slice(0, 12));
      } else {
        throw new Error("Invalid recommendation data format");
      }
    } catch (error) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: `ไม่สามารถโหลดข้อมูลรายการแนะนำ (${method}) ได้ กรุณาลองใหม่อีกครั้ง`,
        icon: 'error',
        confirmButtonText: 'ตกลง',
      });
      console.error(`Error fetching recommendations (${method}):`, error);
    }
  };

  const handlePageChange = (setter: any) => (event: React.ChangeEvent<unknown>, page: number) => {
    setter(page);
  };

  useEffect(() => {
    if (houseId) {
      fetchHouseDetail();
      fetchRecommendations('collaborative_filtering', setRecommendationsCF);
      fetchRecommendations('assoc_rules', setRecommendationsAR);
      fetchRecommendations('hybrid', setRecommendationsHybrid);
    }
  }, [houseId]);

  if (!houseData) {
    Swal.fire({
      title: 'กำลังโหลดข้อมูล...',
      text: 'โปรดรอสักครู่',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2000,
    });
    return <div></div>;
  }

  // Helper สำหรับ pagination
  const getPaginatedData = (data: any[], currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div>
      <NavBar />
      <div className="w-full min-h-[3200px] bg-white">
        {/* แสดงข้อมูลทรัพย์สิน */}
        <div className="mx-[10%] w-[80%] h-[614px] flex flex-row gap-[3%] py-[50px]">
          <div className="basis-[44%] flex flex-col px-[10px] gap-y-[30px] text-black">
            <div className="w-[125px] h-[44px] mx-auto font-line-Regular rounded-full text-main_black bg-button border text-center py-[10px]">
              {houseData.asset_type}
            </div>
            <div>
              <Image className="rounded-3xl" src="/png/list_photo.png" alt="houselist" width={670} height={439} />
            </div>
          </div>
          <div className="basis-[56%] flex flex-col gap-[40px] pt-[90px]">
            <div className="text-main_black text-3xl font-line-bold">{houseData.asset_project_name}</div>
            <div className="text-main_black text-2xl font-line-Regular">{houseData.desc}</div>
            <div className="text-main_black text-xl font-line-Regular">{houseData.address}</div>
            <div className="text-main-color">
              <p className="text-xl font-line-Regular">ราคาตั้งขาย</p>
              <p className="float-left text-3xl font-line-bold mr-1">{houseData.price}</p>
              <p className="text-xl font-line-Regular mt-2"></p>
            </div>
          </div>
        </div>

        {/* รายละเอียดทรัพย์สิน */}
        <div className="w-[80%] mx-auto bg-white shadow-md rounded-3xl border-2 p-6">
          <h1 className="text-2xl font-line-bold text-main-color pb-4 mb-4 border-b-2">รายละเอียดทรัพย์สิน</h1>
          <p className="text-main_black mb-6 font-line-Regular text-lg">{houseData.desc}</p>
          <div className="flex flex-row gap-[100px] place-content-start font-line-Regular">
            <div className="flex flex-col w-fit gap-4 place-content-start text-xl">
              <p className="text-gray-600">รหัสทรัพย์</p>
              <p className="text-gray-600">โครงการ</p>
              <p className="text-gray-600">ประเภท</p>
              <p className="text-gray-600">สถานที่</p>
              <p className="text-gray-600">จังหวัด</p>
              <p className="text-gray-600">อำเภอ/เขต</p>
              <p className="text-gray-600">ตำบล/แขวง</p>
            </div>
            <div className="flex flex-col gap-4 place-content-start text-main-color font-line-bold text-xl">
              <p className="text-main_blue font-semibold">{houseData.asset_id}</p>
              <p className="text-main_blue font-semibold">{houseData.asset_project_name}</p>
              <p className="text-main_blue font-semibold">{houseData.asset_type}</p>
              <p className="text-main_blue font-semibold">{houseData.address}</p>
              <p className="text-main_blue font-semibold">{houseData.provice}</p>
              <p className="text-main_blue font-semibold">{houseData.district}</p>
              <p className="text-main_blue font-semibold">{houseData.sub_district}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[156px] bg-main-color my-[50px] grid grid-cols-1 gap-4 place-content-center">
          <p className="text-center text-3xl font-line-bold">สนใจทรัพย์รายการนี้ อยากสอบถามเพิ่มเติม ? </p>
          <div className=" w-[125px] h-[44px] mx-auto font-line-bold rounded-full text-main-color bg-button border text-center py-[10px]">ติดต่อเจ้าหน้าที่</div>
        </div>
        {/* รายการแนะนำ Collaborative Filtering */}
        <div>
          <h1 className="w-[80%] mx-auto text-2xl font-line-bold text-main-color pb-4 mb-4 mt-10 border-b-2">
            รายการแนะนำ (Collaborative Filtering)
          </h1>
          <div className="w-[80%] mx-auto mt-10 grid grid-rows-1 grid-flow-col place-content-start overflow-x-auto gap-[100px] pb-4">
            {getPaginatedData(recommendationsCF, currentPageCF).map((rec, index) => (
              <HouseWidget
              key={index}
              id={rec.asset_id}
              name={rec.asset_project_name}
              price={rec.price}
              provice={rec.provice}
              subdistrict={rec.sub_district}
              area={rec.area}
            />
            ))}
          </div>
          <div className="w-[80%] mx-auto mt-6 flex justify-center">
            <Pagination
              count={Math.ceil(recommendationsCF.length / itemsPerPage)}
              page={currentPageCF}
              onChange={handlePageChange(setCurrentPageCF)}
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </div>
        </div>

        {/* รายการแนะนำ Assoc Rules */}
        <div>
          <h1 className="w-[80%] mx-auto text-2xl font-line-bold text-main-color pb-4 mb-4 mt-10 border-b-2">
            รายการแนะนำ (Assoc Rules)
          </h1>
          <div className="w-[80%] mx-auto mt-10 grid grid-rows-1 grid-flow-col place-content-start overflow-x-auto gap-[100px] pb-4">
            {getPaginatedData(recommendationsAR, currentPageAR).map((rec, index) => (
              <HouseWidget
              key={index}
              id={rec.asset_id}
              name={rec.asset_project_name}
              price={rec.price}
              provice={rec.provice}
              subdistrict={rec.sub_district}
              area={rec.area}
            />
            ))}
          </div>
          <div className="w-[80%] mx-auto mt-6 flex justify-center">
            <Pagination
              count={Math.ceil(recommendationsAR.length / itemsPerPage)}
              page={currentPageAR}
              onChange={handlePageChange(setCurrentPageAR)}
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </div>
        </div>

        {/* รายการแนะนำ Hybrid */}
        <div>
          <h1 className="w-[80%] mx-auto text-2xl font-line-bold text-main-color pb-4 mb-4 mt-10 border-b-2">
            รายการแนะนำ (Hybrid)
          </h1>
          <div className="w-[80%] mx-auto mt-10 grid grid-rows-1 grid-flow-col place-content-start overflow-x-auto gap-[100px] pb-4">
            {getPaginatedData(recommendationsHybrid, currentPageHybrid).map((rec, index) => (
              <HouseWidget
              key={index}
              id={rec.asset_id}
              name={rec.asset_project_name}
              price={rec.price}
              provice={rec.provice}
              subdistrict={rec.sub_district}
              area={rec.area}
            />
            ))}
          </div>
          <div className="w-[80%] mx-auto mt-6 flex justify-center">
            <Pagination
              count={Math.ceil(recommendationsHybrid.length / itemsPerPage)}
              page={currentPageHybrid}
              onChange={handlePageChange(setCurrentPageHybrid)}
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </div>
        </div>
        cd
      </div>
      <Footer/>
    </div>
  );
}