export default function SkeletonCard() {
  return (
    <div
      className="card shadow-sm rounded-4 border border-light p-3 mb-4"
      style={{ maxWidth: "350px" }}
    >
      <div className="bg-secondary bg-opacity-25 p-2 rounded-3 mb-2">
        <div className="placeholder-wave">
          <div className="placeholder col-8 bg-secondary" style={{ height: "20px" }}></div>
        </div>
      </div>

      <div className="card-body">
        <div className="placeholder-wave mb-3">
          <div
            className="placeholder col-12 bg-secondary"
            style={{ height: "60px", borderRadius: "8px" }}
          ></div>
        </div>

        <div className="placeholder-wave mb-3">
          <div className="placeholder col-6 bg-secondary" style={{ height: "14px" }}></div>
        </div>

        <div className="d-flex gap-2">
          <div
            className="placeholder col-6 bg-secondary"
            style={{ height: "35px", borderRadius: "8px" }}
          ></div>
          <div
            className="placeholder col-6 bg-secondary"
            style={{ height: "35px", borderRadius: "8px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
