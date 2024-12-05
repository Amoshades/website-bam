'use client';
import { useState, useEffect } from "react";
import NavBar from "../component/menu/navbar";
import { Icon } from '@iconify/react';
import Swal from "sweetalert2";
import Footer from "../component/menu/footer";

export default function Accounts() {
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    number: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/view-profile', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include', // Use cookies
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data); // Update profile state
      } else {
        Swal.fire({
          title: "Error",
          text: "Unable to fetch profile information.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      Swal.fire({
        title: "Error",
        text: "Unable to connect to the server.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle edit button
  const handleEdit = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  return (
    <div>
      <NavBar />
      <div className="w-full h-[799px] bg-white px-[192px] py-[30px] flex flex-row">
        <div className="w-[258px] h-[305px] px-[20px] flex flex-col gap-[30px] font-line-bold">
          <a className="flex flex-row gap-3 items-center text-main-color">
            <span>
              <Icon icon="material-symbols:account-circle-outline" className="text-main-color" width={27.5} height={27.5} />
            </span>
            <p className="text-main-color text-xl font-normal">บัญชี</p>
          </a>
          <button className="flex flex-row gap-3 items-center">
            <span>
              <Icon icon="mdi:heart-outline" className="text-black" width={27.5} height={27.5} />
            </span>
            <p className="text-black text-xl font-normal">รายการโปรด</p>
          </button>
          
          <button className="flex flex-row gap-3 items-center pl-[20px]">
            <p className="text-red-600 text-xl font-bold">ลบบัญชี</p>
          </button>
        </div>
        <div className="w-[1278px] h-[406px] px-[129px] py-[30px] flex flex-col gap-[30px]">
          <p className="text-main_black font-bold text-xl font-line-bold">ข้อมูลผู้ใช้</p>
          <div className="flex flex-row gap-[50px] font-line-Regular">
            <div className="flex flex-col gap-[20px]">
              <div>
                <p className="text-base text-main_black">ชื่อ</p>
                <div className="w-[485px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                  <input
                    className="w-full bg-transparent outline-none text-base text-main_black"
                    type="text"
                    value={profile.name}
                    readOnly={!isEditing} // Lock input
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <p className="text-base text-main_black">เบอร์โทรศัพท์</p>
                <div className="w-[485px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                  <input
                    className="w-full bg-transparent outline-none text-base text-main_black"
                    type="text"
                    value={profile.number}
                    readOnly={!isEditing} // Lock input
                    onChange={(e) => setProfile({ ...profile, number: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div>
                <p className="text-base text-main_black">นามสกุล</p>
                <div className="w-[485px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                  <input
                    className="w-full bg-transparent outline-none text-base text-main_black"
                    type="text"
                    value={profile.surname}
                    readOnly={!isEditing} // Lock input
                    onChange={(e) => setProfile({ ...profile, surname: e.target.value })}
                  />
                </div>
              </div>
              {/* <div>
                <p className="text-base text-main_black">อีเมล</p>
                <div className="w-[485px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                  <input
                    className="bg-transparent outline-none text-base text-main_black"
                    type="text"
                    value={profile.email}
                    readOnly={true} // Always locked
                  />
                </div>
              </div> */}
            </div>
          </div>
          <button
            className="font-line-Regular py-[10px] px-[25px] bg-button w-fit rounded-3xl text-main_black text-base mx-auto"
            onClick={handleEdit}
          >
            {isEditing ? "บันทึกข้อมูล" : "แก้ไขข้อมูลส่วนตัว"}
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}