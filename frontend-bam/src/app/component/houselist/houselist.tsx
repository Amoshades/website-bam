'use client';

import Image from "next/image";
import { Icon } from '@iconify/react'; 
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Swal from 'sweetalert2';

type homelist = {id:string,name:string,price:string,provice:string,area:string,subdistrict:string};

export default function HouseWidget({id,name,price,provice,subdistrict,area} : homelist) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/status', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include', // ส่ง Cookie ไปกับคำขอ
      });

      if (response.ok) {
        const data = await response.json();
        return data.status === "logged_in"; // คืนค่า true ถ้าเข้าสู่ระบบ
      } else {
        return false; // คืนค่า false ถ้าไม่ได้เข้าสู่ระบบ
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  };

  const toggleFavorite = async () => {
    const isLoggedIn = await checkLoginStatus(); // ตรวจสอบสถานะการเข้าสู่ระบบ

    if (!isLoggedIn) {
      // ถ้าไม่ได้เข้าสู่ระบบ แสดง SweetAlert แจ้งเตือน
      await Swal.fire({
        title: "กรุณาเข้าสู่ระบบ",
        text: "คุณต้องเข้าสู่ระบบก่อนเพื่อเพิ่มรายการโปรด",
        icon: "warning",
        confirmButtonText: "เข้าสู่ระบบ",
        customClass: {
          confirmButton: "bg-blue-500 text-white px-6 py-2 rounded-full",
        },
      });
      return;
    }

    // ดำเนินการเพิ่มหรือลบรายการโปรด
    try {
      const response = await fetch(`http://localhost:8000/users/add-favorite?asset_id=${id}`, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const message = isFavorite
          ? "ลบรายการโปรดสำเร็จ"
          : "เพิ่มในรายการโปรดสำเร็จ";
        setIsFavorite(!isFavorite); // อัปเดตสถานะใน UI

        // SweetAlert แจ้งสถานะสำเร็จ
        await Swal.fire({
          title: message,
          icon: "success",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "bg-blue-500 text-white px-6 py-2 rounded-full",
          },
        });
      } else {
        throw new Error("API ไม่ตอบกลับสถานะสำเร็จ");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตสถานะ Favorite:", error);

      // SweetAlert แจ้งข้อผิดพลาด
      await Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถอัปเดตรายการโปรดได้",
        icon: "error",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "bg-red-500 text-white px-6 py-2 rounded-full",
        },
      });
    }
  };

  return (
    <div className="w-full">
      <div className=" hover:cursor-pointer" onClick={() => router.push(`/homedetail/${id}`)}>
        <div className="h-[400px] w-[300px] rounded-3xl"> 
          <div className="">
            <Image src="/png/list_photo.png" alt="houselist" width={300} height={194} />
          </div>
          <div className="w-full h-[206px] rounded-b-xl border-x border-b p-5 flex flex-col gap-5 items-center border-stroke">
            <div className="flex flex-col items-center">
              <div className="flex flex-row text-main-color text-base font-line-bold">
                <p>ราคาตั้งขาย &nbsp;  </p>
                <p className="font-line-bold font-bold">{price}</p>
              </div>
            </div>
            <p className="text-center text-main_black text-sm font-line-Regular">{name}</p>
            <div className="flex flex-row gap-[15px]">
              <button className="flex flex-row text-white bg-main-color rounded-full py-[10px] px-[12px]">
                <span></span>
                <p className="font-semibold text-sm font-line-bold line-clamp-1">{provice} , {subdistrict}</p>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // หยุดการทำงานของ onClick ที่การ์ด
                  toggleFavorite(); // เรียกใช้ฟังก์ชัน Favorite
                }}
              >
                <Icon
                  icon={isFavorite ? "ic:outline-favorite" : "material-symbols:favorite-outline"}
                  style={{ color: '#FF2A2A' }}
                  width={20.83}
                  height={19.11}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
