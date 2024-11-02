'use client'

import Image from "next/image";
import { Icon } from '@iconify/react'; 

type homelist = {id:string,name:string,price:string,address:string,area:string};
export default function HouseWidget({id,name,price,address,area} : homelist) {
  return (
    <div className="w-full">
      <a href="http://">
        <div className="h-[400px] w-[300px] rounded-3xl ">
          <div className="">
            <Image src="/png/list_photo.png" alt="houselist" width={300} height={194} />
          </div>
          <div className="w-full h-[206px] rounded-b-xl border-x border-b p-5 flex flex-col gap-5 items-center border-stroke">
            <div className="flex flex-col items-center">
              <div className="flex flex-row text-main-color text-base font-line-Regular">
                <p>ราคาตั้งขาย &nbsp;</p>
                <p className="line-through font-line-Regular">{price}</p>
                <p>&nbsp; บาท</p>
              </div>
              <p className="text-base font-bold text-red-600 font-line-bold ">{price}</p>
            </div>
            <p className="text-center text-main_black text-sm font-line-Regular">โครงการเซอราโน่ พระราม 2 เฟส 1 ห้องชุดเลขที่ 45/222 ชั้น 8 อาคาร เอ</p>
            <div className="flex flex-row gap-[15px]">
              <button className="flex flex-row text-white bg-main-color rounded-full py-[10px] px-[12px] ">
                <span></span>
                <p className="font-semibold text-sm font-line-bold">{address}</p>
              </button>
              <button>
                <Icon icon="material-symbols:favorite-outline" style={{ color: '#FF2A2A' }} width={20.83} height={19.11} />
              </button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
