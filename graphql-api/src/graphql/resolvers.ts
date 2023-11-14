import { Place } from "../models/place.js";
import { User } from "../models/user.js";
import { Booking } from "../models/booking.js";
import bcryptjs from "bcryptjs";

export const resolvers = {
  Query: {
    users: async () => {
      try {
        let users = await User.find({});
        return users;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    user: async (_, args) => {
      try {
        let userFound = await User.findOne({ email: args.email });

        return userFound;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    userPlaces: async (_, args) => {
      try {
        let userFound = await User.findOne({ email: args.email });
        let placesArr = await Place.find({ user_id: userFound.id });
        return placesArr;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    allPlaces: async () => {
      try {
        let allPlaces = await Place.find({});
        return allPlaces;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    singlePlace: async (_, args) => {
      try {
        let singlePlace = await Place.findById(args.placeid);

        return singlePlace;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    singleBooking: async (_, args) => {
      try {
        let singleBooking = await Booking.findById(args.id);
        return singleBooking;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    allBookings: async () => {
      try {
        let allBookings = await Booking.find({});
        return allBookings;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Place: {
    user: async (parent) => {
      // console.log(parent.user_id);
      let userFound = await User.findOne({ _id: parent.user_id });
      return userFound;
    },
    booking: async (parent) => {
      let bookings = await Booking.find({ _id: parent.booking_id });
      return bookings;
    },
  },
  User: {
    place: async (parent) => {
      // console.log(parent.place_id);
      const places = await Place.find({ _id: parent.place_id });
      return places;
    },
    booking: async (parent) => {
      const bookings = await Booking.find({ _id: parent.booking_id });
      return bookings;
    },
  },
  Booking: {
    user: async (parent) => {
      console.log(parent.bookingUser_id);
      const userFound = await User.findById(parent.bookingUser_id);
      console.log(userFound);
      return userFound;
    },
    place: async (parent) => {
      console.log("booking Place id:", parent.place_id);
      const place = await Place.findById(parent.place_id);
      console.log("booking place", place);
      return place;
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      let password = await bcryptjs.hash(args.user.password, 12);
      args.user.password = password;
      return await User.create({ ...args.user });
    },
    addPlace: async (_, args) => {
      const newPlace = await Place.create({ ...args.place });
      const newUser = await User.findOne({ email: args.email });
      console.log(args.place);
      newUser.place_id.push(newPlace.id);
      newPlace.user_id = newUser.id;
      await newUser.save();
      await newPlace.save();
      return newPlace;
    },
    editPlace: async (_, args) => {
      const selectPlace = await Place.findById(args.id);
      console.log("argsEdits=", args.edits);
      console.log("selectPlace", selectPlace);
      Object.assign(selectPlace, args.edits);
      await selectPlace.save();
      return selectPlace;
    },
    addBooking: async (_, args) => {
      const newBooking = await Booking.create({ ...args.bookingData });
      const selectPlace = await Place.findById(args.bookingData.place_id);
      const selectUser = await User.findById(args.bookingData.bookingUser_id);
      selectPlace.booking_id.push(newBooking.id);
      selectUser.booking_id.push(newBooking.id);
      await selectPlace.save();
      await selectUser.save();
      return newBooking;
    },
  },
};
