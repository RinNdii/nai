"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses = ["Menunggu", "Diproses", "Selesai"];

export default function OrderStatusActions({ orderId, currentStatus }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateStatus = async (status) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/pesanan/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        router.refresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          disabled={isSubmitting || status === currentStatus}
          onClick={() => updateStatus(status)}
          className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all ${
            status === currentStatus
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
