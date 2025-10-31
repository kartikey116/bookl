export interface Slot {
  _id: string;
  time: string;
  left: number;
  date: string;
}

export interface DateSlots {
  date: string;
  slots: Slot[];
}

export interface Experience {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  short: string;
}

export interface ExperienceDetails extends Experience {
  description: string;
  dates: DateSlots[];
  about: string;
}

export interface BookingResponse {
  success: boolean;
  refId: string;
}
