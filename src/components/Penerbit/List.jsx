// Import hook React untuk state & lifecycle
import { useState, useEffect } from "react";
// Import axios untuk request API
import axios from "axios";
// Import NavLink untuk navigasi halaman
import { NavLink } from "react-router-dom";
// Import SweetAlert untuk alert konfirmasi
import Swal from "sweetalert2";

export default function PenerbitList() {
  // State menyimpan data penerbit
  const [penerbit, setPenerbit] = useState([]);
  // State loading
  const [loading, setLoading] = useState(true);
  // State error
  const [error, setError] = useState(null);

  // useEffect dijalankan saat komponen pertama kali dirender
  useEffect(() => {
    // Fungsi ambil data penerbit dari API
    const fetchPenerbit = async () => {
      try {
        setLoading(true);

        // Request GET ke API penerbit
        const response = await axios.get(
          "https://uaspaw2.vercel.app/api/penerbit"
        );

        // Simpan data ke state
        setPenerbit(response.data);
        setError(null);
      } catch (err) {
        // Jika gagal ambil data
        setError("Gagal mengambil data penerbit");
      } finally {
        // Matikan loading
        setLoading(false);
      }
    };

    // Panggil fungsi fetch data
    fetchPenerbit();
  }, []);

  // Fungsi hapus penerbit
  const handleDelete = (id, namaPenerbit) => {
    // Alert konfirmasi hapus
    Swal.fire({
      title: `Hapus penerbit "${namaPenerbit}"?`,
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      // Jika user konfirmasi
      if (result.isConfirmed) {
        axios
          // Request DELETE ke API
          .delete(`https://uaspaw2.vercel.app/api/penerbit/${id}`)
          .then((res) => {
            // Update state setelah data dihapus
            setPenerbit(penerbit.filter((p) => p._id !== id));

            // Alert sukses
            Swal.fire("Berhasil", res.data.message, "success");
          })
          .catch(() => {
            // Alert error
            Swal.fire("Error", "Gagal menghapus penerbit", "error");
          });
      }
    });
  };

  // Render komponen
  return (
    <div className="container mt-4">
      {/* Header halaman */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Daftar Penerbit</h3>

        {/* Tombol tambah penerbit */}
        <NavLink to="/penerbit/create" className="btn btn-primary">
          + Tambah Penerbit
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

      {/* Tabel data penerbit */}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            {/* Header tabel */}
            <thead className="table-dark text-center">
              <tr>
                <th>Nama Penerbit</th>
                <th>Alamat</th>
                <th>Tahun Berdiri</th>
                <th width="150">Aksi</th>
              </tr>
            </thead>

            {/* Body tabel */}
            <tbody>
              {/* Jika data kosong */}
              {penerbit.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Data penerbit kosong
                  </td>
                </tr>
              ) : (
                // Mapping data penerbit
                penerbit.map((p) => (
                  <tr key={p._id}>
                    <td className="fw-semibold">{p.namaPenerbit}</td>
                    <td>{p.alamat || "-"}</td>
                    <td className="text-center">
                      {p.tahunBerdiri || "-"}
                    </td>
                    <td className="text-center">
                      {/* Tombol edit */}
                      <NavLink
                        to={`/penerbit/edit/${p._id}`}
                        className="btn btn-info btn-sm me-1 text-white"
                      >
                        Ubah
                      </NavLink>

                      {/* Tombol hapus */}
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          handleDelete(p._id, p.namaPenerbit)
                        }
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
