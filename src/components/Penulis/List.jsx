// Import hooks dari React
import { useState, useEffect } from "react";
// Import axios untuk request API
import axios from "axios";
// Import NavLink untuk navigasi halaman
import { NavLink } from "react-router-dom";
// Import SweetAlert untuk alert konfirmasi
import Swal from "sweetalert2";

export default function PenulisList() {
  // State menyimpan data penulis
  const [penulis, setPenulis] = useState([]);
  // State loading
  const [loading, setLoading] = useState(true);
  // State error
  const [error, setError] = useState(null);

  // Ambil data penulis saat pertama render
  useEffect(() => {
    const fetchPenulis = async () => {
      try {
        setLoading(true);

        // Request GET API penulis
        const response = await axios.get(
          "https://uaspaw2.vercel.app/api/penulis"
        );

        // Simpan data ke state
        setPenulis(response.data);
        setError(null);
      } catch (err) {
        setError("Gagal mengambil data penulis");
      } finally {
        setLoading(false);
      }
    };

    fetchPenulis();
  }, []);

  // Fungsi hapus penulis
  const handleDelete = (id, nama) => {
    Swal.fire({
      title: `Yakin mau hapus penulis "${nama}"?`,
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://uaspaw2.vercel.app/api/penulis/${id}`)
          .then((response) => {
            // Update state setelah hapus
            setPenulis(penulis.filter((p) => p._id !== id));
            Swal.fire("Berhasil", response.data.message, "success");
          })
          .catch(() => {
            Swal.fire("Error", "Gagal menghapus penulis", "error");
          });
      }
    });
  };

  return (
    <div className="container mt-4">
      {/* Header halaman */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Daftar Penulis</h3>

        {/* Tombol tambah penulis */}
        <NavLink to="/penulis/create" className="btn btn-primary">
          + Tambah Penulis
        </NavLink>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border" />
          <p className="mt-2">Memuat data...</p>
        </div>
      )}

      {/* Error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Tabel penulis */}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>Nama</th>
                <th>Negara</th>
                <th>Biografi</th>
                <th width="150">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {penulis.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Data penulis kosong
                  </td>
                </tr>
              ) : (
                penulis.map((p) => (
                  <tr key={p._id}>
                    <td className="fw-semibold">{p.nama}</td>

                    <td className="text-center">{p.negara || "-"}</td>

                    {/* Kolom biografi */}
                    <td style={{ maxWidth: "350px" }}>
                      <small className="text-muted">
                        {p.biografi || "-"}
                      </small>
                    </td>

                    <td className="text-center">
                      {/* Tombol edit */}
                      <NavLink
                        to={`/penulis/edit/${p._id}`}
                        className="btn btn-info btn-sm me-1 text-white"
                      >
                        Ubah
                      </NavLink>

                      {/* Tombol hapus */}
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(p._id, p.nama)}
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
