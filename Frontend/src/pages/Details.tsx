import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchExperienceDetails } from "../api/mockApi";
import type { ExperienceDetails, Slot } from "../types";

const Details: React.FC = () => {
const { id } = useParams<{ id: string }>();
const navigate = useNavigate();
const [experience, setExperience] = useState<ExperienceDetails | null>(null);
const [selectedDate, setSelectedDate] = useState<string>("");
const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
const [quantity, setQuantity] = useState<number>(1);
const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
if (id) {
fetchExperienceDetails(id)
.then((data) => setExperience(data))
.finally(() => setLoading(false));
}
}, [id]);

if (loading) return <div className="text-center py-10">Loading...</div>;
if (!experience) return <div className="text-center py-10">Experience not found</div>;

const handleBooking = () => {
navigate("/checkout", {
state: {
experience,
selectedDate,
selectedSlot,
quantity,
},
});
};

const subtotal = experience.price * quantity;
const taxes = Math.round(subtotal * 0.06);
const total = subtotal + taxes;

return ( <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8">
 <div> <img
       src={experience.image}
       alt={experience.title}
       className="w-full rounded-lg h-[360px] object-cover mb-6"
     />

```
    <h1 className="text-2xl font-semibold">{experience.title}</h1>
    <p className="text-gray-500 mt-2">{experience.description}</p>


    <div className="mt-8">
      <h2 className="font-medium text-gray-700 mb-3">Choose date</h2>
      <div className="flex flex-wrap gap-3">
        {experience.dates.map((d) => (
          <button
            key={d.date}
            onClick={() => {
              setSelectedDate(d.date);
              setSelectedSlot(null);
            }}
            className={`px-4 py-2 rounded-md border ${
              selectedDate === d.date
                ? "bg-yellow-400 text-white border-yellow-400"
                : "border-gray-300 text-gray-700 hover:border-yellow-400"
            }`}
          >
            {new Date(d.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </button>
        ))}
      </div>
    </div>


    {selectedDate && (
      <div className="mt-8">
        <h2 className="font-medium text-gray-700 mb-3">Choose time</h2>
        <div className="flex flex-wrap gap-3">
          {experience.dates
            .find((d) => d.date === selectedDate)
            ?.slots.map((slot) => (
              <button
                key={slot._id}
                disabled={slot.left === 0}
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-2 rounded-md border ${
                  slot.left === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : selectedSlot?._id === slot._id
                    ? "bg-yellow-400 text-white border-yellow-400"
                    : "border-gray-300 text-gray-700 hover:border-yellow-400"
                }`}
              >
                {slot.time}
                {slot.left > 0 && (
                  <span className="text-red-500 text-xs ml-1">
                    {slot.left} left
                  </span>
                )}
                {slot.left === 0 && (
                  <span className="text-xs text-gray-400 ml-1">Sold out</span>
                )}
              </button>
            ))}
        </div>
        <p className="text-sm text-gray-400 mt-2">
          All times are in IST (GMT +5:30)
        </p>
      </div>
    )}


    <div className="mt-10">
      <h2 className="font-medium text-gray-700 mb-3">About</h2>
      <div className="bg-gray-100 rounded-md px-4 py-3 text-gray-600 text-sm">
        {experience.about}
      </div>
    </div>
  </div>

  <div className="border rounded-xl p-6 bg-gray-50 h-fit">
    <div className="space-y-3 text-sm text-gray-600">
      <div className="flex justify-between">
        <span>Starts at</span>
        <span className="font-medium text-gray-800">
          ₹{experience.price}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span>Quantity</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-2 border rounded disabled:opacity-50"
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-2 border rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>
      <div className="flex justify-between">
        <span>Taxes</span>
        <span>₹{taxes}</span>
      </div>

      <hr className="my-3" />
      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>

    <button
      disabled={!selectedDate || !selectedSlot}
      onClick={handleBooking}
      className={`mt-6 w-full py-2 rounded-md font-medium ${
        !selectedDate || !selectedSlot
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-yellow-400 text-white hover:bg-yellow-500"
      }`}
    >
      Confirm
    </button>
  </div>
</div>


);
};

export default Details;
