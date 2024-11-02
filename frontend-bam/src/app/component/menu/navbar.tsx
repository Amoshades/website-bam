'use client'
import Image from "next/image";

export default function NavBar() {
  return (
    <div className="w-full h-[120px] bg-main-color flex flex-row px-[10%] items-center font-line-bold sticky top-0 z-20">
          <div className="basis-1/6 ">
          <Image src="/png/Bam_logo.png" alt="Logo" width={66} height={63} />
          </div>
          <a className="basis-1/6" href="">ช่องทางการติดต่อ</a>
          <a className="basis-1/6" href="">เกี่ยวกับองค์กร</a>
          <a className="basis-1/6" href="">บริการลูกค้า</a>
          <a className="basis-1/6" href="">แบบสอบถาม</a>
          <a className="basis-1/6" href="login">
            <button className=" bg-white py-2 px-6 text-[#1E1E1E] rounded-full font-line-Regular">เข้าสู่ระบบ</button>
          </a>
      </div>
  );
}