"use server";

import Booking from "@/database/booking.model";
import connectDB from "../mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();

    const booking = (
      await Booking.create({
        email,
        slug,
        eventId,
      })
    ).lean();

    return { success: true, booking };
  } catch (error) {
    console.error("Create Booking Failed", error);
    return { success: false, error: error };
  }
};
