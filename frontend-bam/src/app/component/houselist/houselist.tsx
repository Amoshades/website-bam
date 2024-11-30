'use client'

import Image from "next/image";
import { Icon } from '@iconify/react'; 
import { useRouter } from 'next/navigation';

type homelist = {id:string,name:string,price:string,provice:string,area:string,subdistrict:string};

export default function HouseWidget({id,name,price,provice,subdistrict,area} : homelist) {

  const router = useRouter();
  
  return (
    <div className="w-full " >
      <div onClick={() => router.push(`/homedetail/${id}`)}>
        <div className="h-[400px] w-[300px] rounded-3xl ">
          <div className="">
            <Image src="/png/list_photo.png" alt="houselist" width={300} height={194} />
          </div>
          <div className="w-full h-[206px] rounded-b-xl border-x border-b p-5 flex flex-col gap-5 items-center border-stroke">
            <div className="flex flex-col items-center">
              <div className="flex flex-row text-main-color text-base font-line-bold">
                <p>ราคาตั้งขาย &nbsp;  </p>
                <p className=" font-line-bold font-bold ">{price}</p>
                {/* <p>&nbsp; บาท</p> */}
              </div>
              {/* <p className="text-base font-bold text-red-600 font-line-bold ">{price}</p> */}
            </div>
            <p className="text-center text-main_black text-sm font-line-Regular">{name}</p>
            <div className="flex flex-row gap-[15px]">
              <button className="flex flex-row text-white bg-main-color rounded-full py-[10px] px-[12px] ">
                <span></span>
                <p className="font-semibold text-sm font-line-bold line-clamp-1	">{provice} , {subdistrict}</p>
              </button> 
              <button>
                <Icon icon="material-symbols:favorite-outline" style={{ color: '#FF2A2A' }} width={20.83} height={19.11} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
