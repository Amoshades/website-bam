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
  });
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const response = await fetch('https://bam-backend.progressio.tech/users/view-profile', {
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

  // Update user profile
  const updateProfile = async () => {
    try {
      const response = await fetch('https://bam-backend.progressio.tech/users/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Include HTTP-only cookies
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: "Profile updated successfully.",
          icon: "success",
        });
        setIsEditing(false); // Exit edit mode
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error",
          text: errorData.detail ? errorData.detail[0].msg : "Unable to update profile.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
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

  return (
    <div>
      <NavBar />
      <div className="w-full h-[799px] bg-white px-[192px] py-[30px] flex flex-row">
        <div className="w-[258px] h-[305px] px-[20px] flex flex-col gap-[30px] font-line-bold">
          <a href="http://bam.progressio.tech/accounts" className="flex flex-row gap-3 items-center text-main-color">
            <span>
              <Icon icon="material-symbols:account-circle-outline" className="text-main-color" width={27.5} height={27.5} />
            </span>
            <p className="text-main-color text-xl font-normal">บัญชี</p>
          </a>
          <a href="http://bam.progressio.tech/favorite" className="flex flex-row gap-3 items-center">
            <span>
              <Icon icon="mdi:heart-outline" className="text-black" width={27.5} height={27.5} />
            </span>
            <p className="text-black text-xl font-normal">รายการโปรด</p>
          </a>
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
            </div>
          </div>
          {/* <div className="flex justify-center gap-4 mt-5">
            {!isEditing ? (
              <button
                className="font-line-Regular py-[10px] px-[25px] bg-gray-200 w-fit rounded-3xl text-main_black text-base"
                onClick={() => setIsEditing(true)}
              >
                แก้ไขข้อมูลส่วนตัว
              </button>
            ) : (
              <button
                className="font-line-Regular py-[10px] px-[25px] bg-button w-fit rounded-3xl text-main_black text-base"
                onClick={updateProfile}
              >
                บันทึกข้อมูล
              </button>
            )}
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
