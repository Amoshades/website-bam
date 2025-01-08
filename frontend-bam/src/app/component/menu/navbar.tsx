'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // สถานะเข้าสู่ระบบ
  const [username, setUsername] = useState<string>(""); // ชื่อผู้ใช้ถ้ามี
  const router = useRouter();

  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/status', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include', // ส่ง cookie ไปกับ request
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === "logged_in") {
          setIsLoggedIn(true);
          setUsername(data.user); // เก็บชื่อผู้ใช้
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include', // ส่ง cookie เพื่อยกเลิก session
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setUsername("");

        // SweetAlert แจ้งเตือนเมื่อออกจากระบบสำเร็จ
        await Swal.fire({
          title: "ออกจากระบบสำเร็จ!",
          text: "คุณได้ออกจากระบบเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "bg-blue-500 text-white px-6 py-2 rounded-full",
          },
        });

        router.push('/login'); // กลับไปหน้าล็อกอิน
      } else {
        throw new Error("Error during logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);

      // SweetAlert แจ้งข้อผิดพลาด
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถออกจากระบบได้",
        icon: "error",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "bg-red-500 text-white px-6 py-2 rounded-full",
        },
      });
    }
  };

  const handleAccountClick = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "กรุณาเข้าสู่ระบบ",
        text: "คุณต้องเข้าสู่ระบบก่อนเพื่อดูข้อมูลผู้ใช้",
        icon: "warning",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "bg-blue-500 text-white px-6 py-2 rounded-full",
        },
      });
    } else {
      router.push("/accounts"); // ไปยังหน้าข้อมูลผู้ใช้
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkLoginStatus();
    }
  }, []);

  return (
    <div className="w-full h-[120px] bg-main-color flex flex-row px-[10%] items-center font-line-bold sticky top-0 z-50">
      <a href="http://localhost:3000" className="basis-1/6 ">
        <Image src="/png/Bam_logo.png" alt="Logo" width={66} height={63} />
      </a>
      <a className="basis-1/6" href=""></a>
      <a className="basis-1/6" href=""></a>
      <a className="basis-1/6 font-line-bold" href="http://localhost:3000/homelist">ข้อมูลรายการอสังหาริมทรัพย์</a>
      <div className="basis-1/6 text-center">
        <button
          onClick={handleAccountClick}
          className="text-white "
        >
          ข้อมูลผู้ใช้
        </button>
      </div>
      <div className="basis-1/6">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-white py-2 px-6 text-[#1E1E1E] rounded-full font-line-Regular"
          >
            ออกจากระบบ 
          </button>
        ) : (
          <a href="http://localhost:3000/login">
            <button className="bg-white py-2 px-6 text-[#1E1E1E] rounded-full font-line-Regular">
              เข้าสู่ระบบ
            </button>
          </a>
        )}
      </div>
    </div>
  );
}
