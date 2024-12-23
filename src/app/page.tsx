
'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      router.replace("/home"); // Sử dụng replace để không lưu lại trong lịch sử trình duyệt
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null; // Trả về null vì đây chỉ là trang chuyển hướng
}
