import Image from "next/image";
import { Icon } from '@iconify/react';
import locationIcon from '@iconify-icons/carbon/location-filled';
import searchIcon from '@iconify-icons/ic/round-search';


export default function Home() {
  return (
    <div className="w-full min-h-[1080px] bg-white">
      <div className="w-full h-[120px] bg-main-color flex flex-row px-[10%] items-center font-semibold sticky top-0 z-10">
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
      <div className="w-full h-[366px] bg-living-bg z-0">
        <div className="w-full h-full px-[10%] py-[3%] bg-gradient-to-r from-slate-200 to-transparent flex flex-col gap-3">
          <div className="text-2xl text-main-color">
            <p>คัดสรร คุ้มค่า เพื่อคุณ</p>
            <p className=" font-bold">บ้าน ที่ดิน คอนโด จาก BAM เท่านั้น</p>
          </div>
          <div className="flex flex-row w-[685px] h-[69px] bg-white rounded-full drop-shadow-lg pb-2 px-8 gap-8 pt-3">
            <div className="basis-3/12">
              <p className="text-main-color">คำค้นหา</p>
              <input className="bg-transparent w-full text-xs " type="text" placeholder="รหัสทรัพย์/เลขที่เอกสาร...." />
            </div>
            <div className="basis-3/12">
              <p className="text-main-color">ทำเลที่ตั้ง</p>
              <input className="bg-transparent w-full text-xs" type="text" placeholder="กรุณาเลือก" />
            </div>
            <div className="basis-3/12">
              <p className="text-main-color">ประเภททรัพย์</p>
              <input className="bg-transparent w-full text-xs" type="text" placeholder="กรุณาเลิอก" />
            </div>
            <div className="basis-2/12">
              <p className="text-main-color">ราคา</p>
              <input className="bg-transparent w-full text-xs" type="text" placeholder="กรุณาเลิอก" />
            </div>
            <div className="basis-1/12 ">
              <button className="bg-main-color w-[56px] h-full rounded-full float-end p-1"> 
                <Icon icon={searchIcon} className="text-yellow-200 w-full h-full" />  
              </button> 
            </div>
          </div>
          <div className=" flex flex-row text-main-color text-2xl">
            <p className="font-bold">คำค้นหา</p>&nbsp;
            <p className="">ยอดนิยม</p>
          </div>
          <div className="w-[590px] h-[31px] flex flex-row text-main-color text-xs gap-2">
            <button className="bg-white rounded-full basis-1/4 border-main-color border">ทรัพย์ปรับปรุงใหม่</button>
            <button className="bg-white rounded-full basis-[20%] border-main-color border ">รวมเฟอร์นิเจอร์</button>
            <button className="bg-white rounded-full basis-1/4 border-main-color border ">บ้านเดี่ยว 1-3 ล้าน</button>
            <button className="bg-white rounded-full basis-[30%] border-main-color border ">ที่ดินเปล่า กทม.ปริมณฑล</button>
          </div>
        </div>
      </div>
      <div className="mt-[87px]">

      </div>
    </div>
  );
}
