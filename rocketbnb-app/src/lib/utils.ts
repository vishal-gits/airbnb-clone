import { icons } from "./icons";

export let perksItems = [
  { item: "wifi", icon: icons.wifi, name: "wifi" },
  { item: "private parking", icon: icons.parking, name: "privateParking" },
  { item: "tv", icon: icons.tv, name: "tv" },
  { item: "pets", icon: icons.animal, name: "pets" },
  { item: "private entrance", icon: icons.entrance, name: "privateEntrance" },
  { item: "food & beverage", icon: icons.food, name: "foodBeverage" },
];

export function selectGuests(maxGuests: number) {
  let arr: (string | number)[] = ["select number of guests"];
  for (let j = 1; j <= maxGuests; j++) {
    arr.push(j);
  }
  return arr;
}
