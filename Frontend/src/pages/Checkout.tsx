import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/apiClient";
import { createBooking as mockCreateBooking } from "../api/mockApi";
import type { BookingResponse } from "../types";

interface CheckoutState {
experience: {
id: string;
title: string;
price: number;
};
date: string;
slotId: string;
qty: number;
}

export default function Checkout() {
const { state } = useLocation() as { state: CheckoutState };
const navigate = useNavigate();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [promo, setPromo] = useState("");
const [agree, setAgree] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

if (!state?.experience) {
return ( <div className="py-8 text-center">
No booking selected.{" "}
<button
onClick={() => navigate("/")}
className="underline text-blue-600"
>
Go Home </button> </div>
);
}

const { experience, date, slotId, qty } = state;
const subtotal = experience.price * qty;
const taxes = Math.round(subtotal * 0.06);
const total = subtotal + taxes;

const onPay = async () => {
setError("");
if (!name || !email) {
setError("Please enter name and email.");
return;
}
if (!agree) {
setError("You must agree to terms.");
return;
}

setLoading(true);
const payload = {
  experienceId: experience.id,
  slotId,
  name,
  email,
  promoCode: promo || null,
};

try {
  // Try real API first
  const res = await api.post("/bookings", payload);
  navigate("/result", {
    state: { success: true, refId: res.data.bookingId || res.data.refId },
  });
} catch (err) {
  // Fallback to mock API
  try {
    const r: BookingResponse = await mockCreateBooking(payload);
    navigate("/result", {
      state: { success: true, refId: r.refId },
    });
  } catch (e: any) {
    setError(e?.message || "Booking failed");
    navigate("/result", { state: { success: false } });
  }
} finally {
  setLoading(false);
}

};

return ( <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
{/* Left side - form */} <div className="lg:col-span-2"> <div className="bg-white rounded-xl p-6 shadow"> <h2 className="font-semibold text-lg mb-4">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="p-3 border rounded w-full"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-3 border rounded w-full"
        />
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Promo code"
          className="p-3 border rounded flex-1"
        />
        <button
          onClick={async () => {
            if (!promo) return;
            try {
              const resp = await api.post("/promo", { code: promo });
              alert(resp.data.message);
            } catch {
              alert("Invalid or expired promo code");
            }
          }}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Apply
        </button>
      </div>

      <div className="mt-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>I agree to the terms and safety policy</span>
        </label>
      </div>

      {error && <div className="text-red-500 mt-3">{error}</div>}
    </div>
  </div>

  {/* Right side - summary */}
  <aside>
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between">
        <div>Experience</div>
        <div>{experience.title}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div>Date</div>
        <div>{date}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div>Qty</div>
        <div>{qty}</div>
      </div>

      <div className="mt-4 flex justify-between">
        <div>Subtotal</div>
        <div>₹{subtotal}</div>
      </div>
      <div className="mt-2 flex justify-between">
        <div>Taxes</div>
        <div>₹{taxes}</div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between font-semibold">
        <div>Total</div>
        <div>₹{total}</div>
      </div>

      <button
        disabled={loading}
        onClick={onPay}
        className="mt-6 w-full py-2 bg-yellow-400 rounded font-semibold hover:bg-yellow-500"
      >
        {loading ? "Processing..." : "Pay and Confirm"}
      </button>
    </div>
  </aside>
</div>

);
}
