// src/components/Logout.jsx
import React, { useEffect } from "react"; // Mengimpor React dan useEffect untuk menangani efek samping
import { useNavigate } from "react-router-dom"; // Mengimpor useNavigate untuk melakukan redirect ke halaman lain

export default function Logout({ setToken }) {
  const navigate = useNavigate(); // Menginisialisasi fungsi navigate untuk melakukan redirect

  useEffect(() => {
    // Menggunakan useEffect untuk menjalankan efek samping setelah komponen dipasang
    localStorage.removeItem("authToken"); // Menghapus token autentikasi dari localStorage
    setToken(null); // Update state langsung
    navigate("/login"); // Redirect pengguna ke halaman login setelah berhasil logout
  }, [navigate, setToken]); // Dependensi 'navigate' dan 'setToken' untuk menghindari peringatan linting

  return null; // Mengembalikan null karena tidak ada tampilan yang perlu ditampilkan setelah logout
}
