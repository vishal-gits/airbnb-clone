import { writable, derived } from "svelte/store";
import type { Writable } from "svelte/store";

export const authToken: Writable<string | undefined> = writable(undefined);

export const user: Writable<UserWithoutPassword | undefined> =
  writable(undefined);

export let mainPhoto: Writable<string | undefined> = writable(undefined);

export const checkInDate: Writable<string | undefined> = writable(undefined);
export const checkOutDate: Writable<string | undefined> = writable(undefined);
export const numGuests: Writable<string | undefined> = writable(undefined);
export const bookingUrl: Writable<string | undefined> = writable(undefined);
export const phoneNum: Writable<string | undefined> = writable(undefined);
export const numNights: Writable<number | undefined> = writable(undefined);
export const bookingAmount: Writable<number | undefined> = writable(undefined);
export const destination: Writable<string | undefined> = writable(undefined);
