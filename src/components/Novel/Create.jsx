// Import hook React untuk state dan lifecycle
import { useEffect, useState } from "react";
// Import axios untuk request API
import axios from "axios";

const TambahNovel = () => {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    judul: "",
    penulis: "",
    genre: "",
    penerbit: "",
    tahunTerbit: "",
    deskripsi: "",
  });

  // State list penulis
  const [penulisList, setPenulisList] = useState([]);
  // State list penerbit
  const [penerbitList, setPenerbitList] = useState([]);
  // State pesan error
  const [error, setError] = useState("");
  // State loading data awal
  const [loading, setLoading] = useState(true);

  // AMBIL DATA PENULIS & PENERBIT
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil token login
        const token = localStorage.getItem("authToken");

        // Ambil data penulis dan penerbit bersamaan
        const [penulisRes, penerbitRes] = await Promise.all([
          axios.get("https://uaspaw2.vercel.app/api/penulis", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://uaspaw2.vercel.app/api/penerbit", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Simpan data ke state
        setPenulisList(penulisRes.data || []);
        setPenerbitList(penerbitRes.data || []);
      } catch (err) {
        // Jika gagal ambil data
        setError("Gagal memuat data penulis atau penerbit");
      } finally {
        // Matikan loading
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // HANDLE SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload
    setError(""); // Reset error

    try {
      // Ambil token login
      const token = localStorage.getItem("authToken");

      // Kirim data novel ke API
      await axios.post(
        "https://uaspaw2.vercel.app/api/novel",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Notifikasi sukses
      alert("Novel berhasil ditambahkan");

      // Reset form
      setFormData({
        judul: "",
        penulis: "",
        genre: "",
        penerbit: "",
        tahunTerbit: "",
        deskripsi: "",
      });
    } catch (err) {
      // Tangkap error dari API
      setError(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Gagal menambahkan novel"
      );
    }
  };

  // Tampilan loading
  if (loading) {
    return <p className="text-center mt-4">Memuat data...</p>;
  }

  return (
    <div className="container mt-4">
      {/* Card pembungkus form */}
      <div className="card shadow-sm">
        <div className="card-body">

          {/* Judul halaman */}
          <h3 className="mb-4 text-center">Tambah Novel</h3>

          {/* Pesan error */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Form tambah novel */}
          <form onSubmit={handleSubmit}>

            {/* Judul Novel */}
            <div className="mb-3">
              <label className="form-label">Judul Novel</label>
              <input
                type="text"
                className="form-control"
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                required
              />
            </div>

            {/* Penulis */}
            <div className="mb-3">
              <label className="form-label">Penulis</label>
              <select
                className="form-control"
                value={formData.penulis}
                onChange={(e) =>
                  setFormData({ ...formData, penulis: e.target.value })
                }
                required
              >
                <option value="">-- Pilih Penulis --</option>
                {penulisList.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Genre */}
            <div className="mb-3">
              <label className="form-label">Genre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Contoh: Fantasi, Drama"
                value={formData.genre}
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }
                required
              />
            </div>

            {/* Sinopsis */}
            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Masukkan deskripsi novel"
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                required
              />
            </div>

            {/* Penerbit */}
            <div className="mb-3">
              <label className="form-label">Penerbit</label>
              <select
                className="form-control"
                value={formData.penerbit}
                onChange={(e) =>
                  setFormData({ ...formData, penerbit: e.target.value })
                }
                required
              >
                <option value="">-- Pilih Penerbit --</option>
                {penerbitList.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.namaPenerbit}
                  </option>
                ))}
              </select>
            </div>

            {/* Tahun Terbit */}
            <div className="mb-4">
              <label className="form-label">Tahun Terbit</label>
              <input
                type="number"
                className="form-control"
                placeholder="Contoh: 2024"
                value={formData.tahunTerbit}
                onChange={(e) =>
                  setFormData({ ...formData, tahunTerbit: e.target.value })
                }
                required
              />
            </div>

            {/* Tombol simpan */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Simpan Novel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahNovel;
