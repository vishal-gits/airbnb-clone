import { model, Schema } from "mongoose";

const bookingSchema = new Schema({
  checkInDate: String,
  checkOutDate: String,
  numGuests: Number,
  phoneNum: String,
  bookingAmount: Number,
  numNights: Number,
  place_id: { type: Schema.Types.ObjectId, ref: "Place" },
  bookingUser_id: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Booking = model("Booking", bookingSchema);
