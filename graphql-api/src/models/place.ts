import { model, Schema } from "mongoose";

const placeSchema = new Schema({
  title: String,
  address: String,
  photos: [String],
  description: String,
  wifi: Boolean,
  privateParking: Boolean,
  tv: Boolean,
  pets: Boolean,
  privateEntrance: Boolean,
  foodBeverage: Boolean,
  extraInfo: String,
  checkInTime: Number,
  checkOutTime: Number,
  maxGuests: Number,
  price: Number,
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  booking_id: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

export const Place = model("Place", placeSchema);
