import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const { state } = useLocation() as any;
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="py-8">
        No result available. <button onClick={() => navigate("/")}>Back home</button>
      </div>
    );
  }

  const { success, refId } = state;

  return (
    <div className="text-center py-20">
      {success ? (
        <>
          <div className="mx-auto w-20 h-20 rounded-full bg-green-500 text-white flex items-center justify-center text-3xl">✓</div>
          <h2 className="text-2xl font-semibold mt-6">Booking Confirmed</h2>
          <p className="text-gray-600 mt-2">Ref ID: {refId}</p>
        </>
      ) : (
        <>
          <div className="mx-auto w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center text-3xl">✕</div>
          <h2 className="text-2xl font-semibold mt-6">Booking Failed</h2>
          <p className="text-gray-600 mt-2">There was a problem completing your booking.</p>
        </>
      )}

      <button onClick={() => navigate("/")} className="mt-6 px-4 py-2 bg-gray-200 rounded">
        Back to Home
      </button>
    </div>
  );
}
