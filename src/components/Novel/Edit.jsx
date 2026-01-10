// Import hook React
import { useState, useEffect } from "react";
// Import axios
import axios from "axios";
// Import navigasi & parameter URL
import { useNavigate, useParams } from "react-router-dom";

export default function EditNovel() {
  const navigate = useNavigate();
  const { id } = useParams();

  // state
  const [formData, setFormData] = useState({
    judul: "",
    penulis: "",
    genre: "",
    penerbit: "",
    tahunTerbit: "",
    deskripsi: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // ambil token
  const token = localStorage.getItem("authToken");

  // ambil data
  useEffect(() => {
    const fetchNovel = async () => {
      try {
        setIsLoadingData(true);

        if (!token) {
          setError("Token tidak ditemukan, silakan login ulang");
          setIsLoadingData(false);
          return;
        }

        const response = await axios.get(
          `https://uaspaw2.vercel.app/api/novel/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData({
          judul: response.data.judul,
          penulis: response.data.penulis,
          genre: response.data.genre,
          penerbit: response.data.penerbit,
          tahunTerbit: response.data.tahunTerbit,
          deskripsi: response.data.deskripsi,
        });

        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Gagal mengambil data novel"
        );
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchNovel();
  }, [id, token]);

  // input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.judul ||
      !formData.penulis ||
      !formData.genre ||
      !formData.penerbit ||
      !formData.tahunTerbit ||
      !formData.deskripsi
    ) {
      setError("Semua field wajib diisi!");
      return;
    }

    if (!token) {
      setError("Token tidak ditemukan, silakan login ulang");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.put(
        `https://uaspaw2.vercel.app/api/novel/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/novel");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengupdate novel"
      );
    } finally {
      setLoading(false);
    }
  };

  // loading
  if (isLoadingData) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border"></div>
        <p className="mt-2">Memuat data novel...</p>
      </div>
    );
  }

  // Render
  return (
    <div className="container mt-5">
      <h3 className="fw-bold mb-4">Edit Novel</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="col-md-8">
        <div className="mb-3">
          <label className="form-label">Judul Novel</label>
          <input
            type="text"
            className="form-control"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Penulis</label>
          <input
            type="text"
            className="form-control"
            name="penulis"
            value={formData.penulis}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input
            type="text"
            className="form-control"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Penerbit</label>
          <input
            type="text"
            className="form-control"
            name="penerbit"
            value={formData.penerbit}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea
            className="form-control"
            rows="4"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Tahun Terbit</label>
          <input
            type="number"
            className="form-control"
            name="tahunTerbit"
            value={formData.tahunTerbit}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={loading}
        >
          {loading ? "Mengupdate..." : "Simpan Perubahan"}
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/novel")}
        >
          Batal
        </button>
      </form>
    </div>
  );
}
