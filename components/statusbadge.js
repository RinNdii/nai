// components/statusbadge.js
export default function StatusBadge({ status }) {
  const colors = {
    "Menunggu": "bg-yellow-100 text-yellow-700",
    "Diproses": "bg-blue-100 text-blue-700",
    "Selesai": "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}