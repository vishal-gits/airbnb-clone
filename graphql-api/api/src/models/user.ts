import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  place_id: [{ type: Schema.Types.ObjectId, ref: "Place" }],
  booking_id: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

export const User = model("User", userSchema);
