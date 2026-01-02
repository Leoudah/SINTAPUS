export default function AdminFilter({ status, setStatus }) {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition border";
  const active = "bg-blue-600 text-white border-blue-600";
  const inactive =
    "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setStatus()}
        className={`${base} ${!status ? active : inactive}`}
      >
        All
      </button>

      <button
        onClick={() => setStatus("submitted")}
        className={`${base} ${
          status === "submitted" ? active : inactive
        }`}
      >
        Submitted
      </button>

      <button
        onClick={() => setStatus("verified")}
        className={`${base} ${
          status === "verified" ? active : inactive
        }`}
      >
        Verified
      </button>

      <button
        onClick={() => setStatus("rejected")}
        className={`${base} ${
          status === "rejected" ? active : inactive
        }`}
      >
        Rejected
      </button>
    </div>
  );
}
