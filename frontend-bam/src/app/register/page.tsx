'use client';
import { useState } from "react";
import NavBar from "../component/menu/navbar";
import Footer from "../component/menu/footer";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react";

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false); // สถานะแสดง/ซ่อนรหัสผ่าน
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false); // สถานะแสดง/ซ่อนรหัสผ่านยืนยัน
    const router = useRouter();

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword || !name || !surname || !number) {
            Swal.fire({
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                icon: 'error',
                confirmButtonText: 'ตกลง',
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                title: 'รหัสผ่านไม่ตรงกัน',
                text: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
                icon: 'error',
                confirmButtonText: 'ตกลง',
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:8000/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name, surname, number }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "สมัครสมาชิกสำเร็จ!",
                    text: "กรุณาเข้าสู่ระบบ",
                    confirmButtonText: "ไปที่หน้าเข้าสู่ระบบ",
                }).then(() => {
                    router.push('/login'); // เปลี่ยนหน้าไปยังหน้าล็อกอิน
                });

                // รีเซ็ตค่าฟอร์ม
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setName("");
                setSurname("");
                setNumber("");
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: errorData.detail || "เกิดข้อผิดพลาดในการสมัครสมาชิก",
                });
            }
        } catch (error) {
            console.error("Error during registration:", error);
            Swal.fire({
                icon: "error",
                title: "ข้อผิดพลาดในการเชื่อมต่อ",
                text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="w-full h-[799px] bg-white px-[192px] py-[30px] flex flex-col gap-[30px] font-line-Regular">
                <p className="text-main_black font-bold text-xl font-line-bold">สมัครสมาชิก</p>
                <div className="flex flex-row gap-[50px]">
                    <div className="flex flex-col gap-[20px]">
                        <div>
                            <p className="text-base text-main_black">ชื่อ</p>
                            <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                                <input
                                    className="w-full bg-transparent outline-none text-base text-main_black"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-base text-main_black">เบอร์โทรศัพท์</p>
                            <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                                <input
                                    className="w-full bg-transparent outline-none text-base text-main_black"
                                    type="tel"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-base text-main_black">รหัสผ่าน</p>
                            <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                                <input
                                    className="w-full bg-transparent outline-none text-base text-main_black"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button onClick={() => setShowPassword(!showPassword)}>
                                    <Icon
                                        icon={showPassword ? "ion:eye-outline" : "ion:eye-off-outline"}
                                        style={{ color: '#004C85' }}
                                        width={21}
                                        height={21}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[20px]">
                        <div>
                            <p className="text-base text-main_black">นามสกุล</p>
                            <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                                <input
                                    className="w-full bg-transparent outline-none text-base text-main_black"
                                    type="text"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-base text-main_black">อีเมล</p>
                            <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                                <input
                                    className="w-full bg-transparent outline-none text-base text-main_black"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-base text-main_black">กรอกรหัสผ่านอีกครั้ง</p>
                            <div className="w-[743px] h-[40px] border border-stroke rounded-3xl px-5 flex items-center py-3 mt-[10px]">
                                <input
                                    className="w-full bg-transparent outline-none text-base text-main_black"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <Icon
                                        icon={showConfirmPassword ? "ion:eye-outline" : "ion:eye-off-outline"}
                                        style={{ color: '#004C85' }}
                                        width={21}
                                        height={21}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="text-left py-[10px] px-[25px] bg-button w-fit rounded-3xl text-main_black text-base"
                >
                    {isLoading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
                </button>
            </div>
            <Footer />
        </div>
    );
}
