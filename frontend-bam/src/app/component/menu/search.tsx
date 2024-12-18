'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify-icons/ic/round-search';
import { useRouter } from 'next/navigation';

interface DataItem {
  province: string;
  amphoe: string;
}

export default function Search() {
  const [provinces, setProvinces] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    province: '',
    district: '',
    type: '',
  });

  // โหลดข้อมูลจังหวัดจากไฟล์ JSON
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get<DataItem[]>('/data/raw_database.json');
        const uniqueProvinces = [...new Set(response.data.map((item) => item.province))];
        setProvinces(uniqueProvinces);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  // โหลดข้อมูลอำเภอเมื่อเลือกจังหวัด
  const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setFormData({ ...formData, province });

    try {
      const response = await axios.get<DataItem[]>('/data/raw_database.json');
      const filteredDistricts = response.data
        .filter((item) => item.province === province)
        .map((item) => item.amphoe);

      const uniqueDistricts = [...new Set(filteredDistricts)];
      setDistricts(uniqueDistricts);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  // จัดการการเปลี่ยนแปลง input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ฟังก์ชันส่งไปยังหน้า homelist พร้อม param
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (formData.name) params.append('asset_name', formData.name);
    if (formData.province) params.append('provice', formData.province);
    if (formData.district) params.append('district', formData.district);
    if (formData.type) params.append('asset_type', formData.type);

    const queryString = params.toString();
    router.push(`/homelist?${queryString}`);
  };

  
  return (
    <div className="w-full h-[366px] bg-living-bg z-0 font-line-Regular">
      <div className="w-full h-full px-[10%] py-[3%] bg-gradient-to-r from-slate-200 to-transparent flex flex-col gap-3">
        <div className="text-2xl text-main-color">
          <p>คัดสรร คุ้มค่า เพื่อคุณ</p>
          <p className="font-bold">บ้าน ที่ดิน คอนโด จาก BAM เท่านั้น</p>
        </div>
        <div className="flex flex-row w-[685px] h-[69px] bg-white rounded-full drop-shadow-lg pb-2 px-8 gap-8 pt-3">
          <div className="basis-3/12">
            <p className="text-main-color">ชื่อ</p>
            <input
              className="bg-transparent w-full text-xs text-gray-500"
              type="text"
              name="name"
              placeholder="ชื่อของอสังหาริมทรัพย์"
              onChange={handleChange}
            />
          </div>
          {/* จังหวัด */}
          <div className="basis-3/12">
            <p className="text-main-color">จังหวัด</p>
            <select
              className="w-full h-[30px] bg-transparent text-xs text-gray-500"
              name="province"
              onChange={handleProvinceChange}
            >
              <option value="">โปรดเลือก</option>
              {provinces.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          {/* อำเภอ */}
          <div className="basis-3/12">
            <p className="text-main-color">อำเภอ</p>
            <select 
              className="w-full h-[30px] bg-transparent text-xs text-gray-500"
              name="district"
              onChange={handleChange}
            >
              <option value="">โปรดเลือก</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div className="basis-3/12">
            <p className="text-main-color">ประเภท</p>
            <select
              className="w-full bg-transparent text-xs text-gray-500"
              name="type"
              onChange={handleChange}
            >
              <option value="">โปรดเลือก</option>
              <option value="ห้องชุดพักอาศัย">ห้องชุดพักอาศัย</option>
              <option value="ทาวน์เฮ้าส์">ทาวน์เฮ้าส์</option>
            </select>
          </div>
          {/* ปุ่มค้นหา */}
          <div className="basis-1/12">
            <button
              className="bg-main-color w-[56px] h-full rounded-full"
              onClick={handleSearch}
            >
              <Icon icon={searchIcon} className="text-yellow-200 w-full h-full" />
            </button>
          </div>
        </div>
        <div className="flex flex-row text-main-color text-2xl">
          <p className="font-bold">คำค้นหา</p>&nbsp;
          {/* ///////////////////////////////////////// */}
          <p>ยอดนิยม</p>
        </div>
        <div className="w-[590px] h-[31px] flex flex-row text-main-color text-xs gap-2">
          <button className="bg-white rounded-full basis-1/4 border-main-color border">
            ทรัพย์ปรับปรุงใหม่
          </button>
          <button className="bg-white rounded-full basis-[20%] border-main-color border">
            รวมเฟอร์นิเจอร์
          </button>
          <button className="bg-white rounded-full basis-1/4 border-main-color border">
            บ้านเดี่ยว 1-3 ล้าน
          </button>
          <button className="bg-white rounded-full basis-[30%] border-main-color border">
            ที่ดินเปล่า กทม.ปริมณฑล
          </button>
        </div>
      </div>
    </div>
  );
}
