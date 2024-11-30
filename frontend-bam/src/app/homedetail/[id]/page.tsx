'use client';

import { useParams } from 'next/navigation';

export default function HomeDetail() {
  const params = useParams(); // รับค่า id จาก URL
  const houseId = params.id;

  return (
    <div>
      <h1>รายละเอียดบ้าน</h1>
      <p>รหัสทรัพย์สิน: {houseId}</p>
    </div>
  );
}