import type { Experience, ExperienceDetails, BookingResponse } from "../types";

// Mock experience list
const mockExperiences: Experience[] = [
  {
    id: "1",
    title: "Kayaking Adventure",
    location: "Udupi, Karnataka",
    price: 999,
    image: "/images/kayak.jpg",
    short: "Certified guide. Safety first with gear included.",
  },
  {
    id: "2",
    title: "Nandi Hills Sunrise",
    location: "Bangalore, Karnataka",
    price: 899,
    image: "/images/nandi.jpg",
    short: "Perfect sunrise experience with expert guide.",
  },
  {
    id: "3",
    title: "Coffee Trail",
    location: "Coorg, Karnataka",
    price: 1299,
    image: "/images/coffee.jpg",
    short: "Explore Coorg’s coffee estates and local culture.",
  },
  {
    id: "4",
    title: "Himalayan Trekking Adventure",
    location: "Everest Base Camp, Nepal",
    price: 1200,
    image: "https://placehold.co/600x400/09f/fff?text=Himalayan+Trek",
    short: "A breathtaking 12-day trek to the base of the world's highest peak.",
  },
];

// ✅ Fetch list of all experiences
export const fetchExperiences = async (): Promise<Experience[]> =>
  new Promise((res) => setTimeout(() => res(mockExperiences), 400));

// ✅ Fetch details of one experience dynamically
export const fetchExperienceDetails = async (id: string): Promise<ExperienceDetails> => {
  const experience = mockExperiences.find((e) => e.id === id);
  if (!experience) throw new Error("Experience not found");

  // Add custom data for each experience
  const extraDetails: Record<string, Partial<ExperienceDetails>> = {
    "1": {
      description:
        "Enjoy a thrilling kayaking session in the calm backwaters of Udupi. Certified guides and full safety gear included.",
      dates: [
        {
          date: "2025-11-02",
          slots: [
            { _id: "s1", time: "07:00 am", left: 4, date: "2025-11-02" },
            { _id: "s2", time: "09:00 am", left: 2, date: "2025-11-02" },
          ],
        },
      ],
      about: "Helmet, life jackets, and expert support included.",
    },
    "2": {
      description:
        "Witness the mesmerizing sunrise at Nandi Hills, just an hour away from Bangalore. Guided experience for groups.",
      dates: [
        {
          date: "2025-11-05",
          slots: [
            { _id: "s3", time: "05:30 am", left: 5, date: "2025-11-05" },
            { _id: "s4", time: "06:00 am", left: 0, date: "2025-11-05" },
          ],
        },
      ],
      about: "Includes transport and breakfast.",
    },
    "3": {
      description:
        "Walk through the lush coffee estates of Coorg, learn coffee making, and enjoy local cuisine.",
      dates: [
        {
          date: "2025-11-10",
          slots: [
            { _id: "s5", time: "10:00 am", left: 6, date: "2025-11-10" },
            { _id: "s6", time: "02:00 pm", left: 3, date: "2025-11-10" },
          ],
        },
      ],
      about: "Perfect for nature and coffee lovers.",
    },
    "4": {
      description:
        "A breathtaking 12-day trek to the base of the world's highest peak. Experience the thrill and serenity of the Himalayas.",
      dates: [
        {
          date: "2024-12-01",
          slots: [{ _id: "s7", time: "06:00 am", left: 10, date: "2024-12-01" }],
        },
        {
          date: "2024-12-08",
          slots: [{ _id: "s8", time: "06:00 am", left: 5, date: "2024-12-08" }],
        },
      ],
      about: "Includes certified guides, accommodation, and all permits.",
    },
  };

  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          ...experience,
          ...extraDetails[id],
        } as ExperienceDetails),
      600
    )
  );
};

// ✅ Create a new booking
export const createBooking = async (payload: any): Promise<BookingResponse> =>
  new Promise((res, rej) =>
    setTimeout(() => {
      if (!payload.name || !payload.email) return rej({ message: "Missing fields" });
      res({ success: true, refId: "BK-" + Math.floor(Math.random() * 99999) });
    }, 800)
  );
