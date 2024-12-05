'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
          console.log(data)
        } else {
          setIsLoggedIn(false);
          console.log(data)
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
        router.push('/login'); // กลับไปหน้าล็อกอิน
      } else {
        console.error("Error during logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkLoginStatus();
    }
    // ตรวจสอบสถานะเมื่อโหลดหน้า
  }, []);

  return (
    <div className="w-full h-[120px] bg-main-color flex flex-row px-[10%] items-center font-line-bold sticky top-0 z-50">
      <a href="http://localhost:3000" className="basis-1/6 ">
        <Image src="/png/Bam_logo.png" alt="Logo" width={66} height={63} />
      </a>
      <a className="basis-1/6" href=""></a>
      <a className="basis-1/6" href=""></a>
      <a className="basis-1/6 " href="http://localhost:3000/homelist">ข้อมูลรายการอสังหาริมทรัพย์</a>
      <a className="basis-1/6 text-center" href="http://localhost:3000/accounts">ข้อมูลผู้ใช้</a>
      <div className="basis-1/6">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-white py-2 px-6 text-[#1E1E1E] rounded-full font-line-Regular"
          >
            ออกจากระบบ ({username})
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