export default function Home() {
  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #2e316a, #1e226d)",
      }}
    >
      <div className="card shadow-lg p-4 text-center">
        <h1 className="fw-bold mb-3">Novel App</h1>

        <p className="text-muted mb-4">
          Jelajahi dunia cerita dan simpan novel favoritmu.
        </p>
      </div>
    </div>
  );
}
