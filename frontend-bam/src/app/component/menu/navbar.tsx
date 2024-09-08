'use client'
import Image from "next/image";

export default function NavBar() {
  return (
    <div className="w-full h-[120px] bg-main-color flex flex-row px-[10%] items-center font-semibold sticky top-0 z-20">
          <div className="basis-1/6 ">
          <Image src="/png/Bam_logo.png" alt="Logo" width={66} height={63} />
          </div>
          <div className="basis-1/6">ช่องทางการติดต่อ</div>
          <div className="basis-1/6">เกี่ยวกับองค์กร</div>
          <div className="basis-1/6">บริการลูกค้า</div>
          <div className="basis-1/6">แบบสอบถาม</div>
          <div className="basis-1/6">
            <button className=" bg-white py-2 px-6 text-[#1E1E1E] rounded-full font-normal">เข้าสู่ระบบ</button>
          </div>
      </div>
  );
}