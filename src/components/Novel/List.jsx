// Import hook React untuk state & lifecycle
import { useState, useEffect } from "react";
// Import axios untuk request API
import axios from "axios";
// Import NavLink untuk navigasi halaman
import { NavLink } from "react-router-dom";
// Import SweetAlert untuk alert konfirmasi
import Swal from "sweetalert2";

export default function NovelList() {
  // State menyimpan data novel
  const [novel, setNovel] = useState([]);
  // State loading
  const [loading, setLoading] = useState(true);
  // State error
  const [error, setError] = useState(null);

  // useEffect dijalankan saat komponen pertama kali dirender
  useEffect(() => {
    // Fungsi ambil data novel dari API
    const fetchNovel = async () => {
      try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");

        // Request GET ke API novel
        const response = await axios.get(
          "https://uaspaw2.vercel.app/api/novel",
          {
            // Header Authorization
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Simpan data ke state
        setNovel(response.data);
      } catch (err) {
        // Jika gagal ambil data
        setError("Gagal mengambil data novel");
      } finally {
        // Matikan loading
        setLoading(false);
      }
    };

    // Panggil fungsi fetch data
    fetchNovel();
  }, []);

  // Fungsi hapus novel
  const handleDelete = (id, judul) => {
    // Alert konfirmasi hapus
    Swal.fire({
      title: `Yakin mau hapus "${judul}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      // Jika user konfirmasi
      if (result.isConfirmed) {
        try {
          // Ambil token
          const token = localStorage.getItem("authToken");

          // Request DELETE ke API
          await axios.delete(
            `https://uaspaw2.vercel.app/api/novel/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Update state setelah data dihapus
          setNovel(novel.filter((n) => n._id !== id));

          // Alert sukses
          Swal.fire("Berhasil", "Novel berhasil dihapus", "success");
        } catch {
          // Alert error
          Swal.fire("Error", "Gagal menghapus novel", "error");
        }
      }
    });
  };

  // Render komponen
  return (
    <div className="container mt-4">
      {/* Header halaman */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Daftar Novel</h3>

        {/* Tombol tambah novel */}
        <NavLink to="/novel/create" className="btn btn-primary">
          + Tambah Novel
        </NavLink>
      </div>

      {/* Tampilan loading */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border" />
          <p className="mt-2">Memuat data...</p>
        </div>
      )}

      {/* Tampilan error */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Tabel data novel */}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            {/* Header tabel */}
            <thead className="table-dark text-center">
              <tr>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Penerbit</th>
                <th>Genre</th>
                <th>Tahun</th>
                <th>Deskripsi</th>
                <th width="130">Aksi</th>
              </tr>
            </thead>

            {/* Body tabel */}
            <tbody>
              {/* Jika data kosong */}
              {novel.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    Data novel kosong
                  </td>
                </tr>
              ) : (
                // Mapping data novel
                novel.map((n) => (
                  <tr key={n._id}>
                    <td className="fw-semibold">{n.judul}</td>
                    <td>{n.penulis?.nama || "-"}</td>
                    <td>{n.penerbit?.namaPenerbit || "-"}</td>
                    <td className="text-center">{n.genre || "-"}</td>
                    <td className="text-center">{n.tahunTerbit || "-"}</td>
                    <td style={{ maxWidth: "260px" }}>
                      {n.deskripsi || "-"}
                    </td>
                    <td className="text-center">
                      {/* Tombol edit */}
                      <NavLink
                        to={`/novel/edit/${n._id}`}
                        className="btn btn-info btn-sm me-1 text-white"
                      >
                        Ubah
                      </NavLink>

                      {/* Tombol hapus */}
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(n._id, n.judul)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
