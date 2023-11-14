<script lang="ts">
  export let trip: bookingData;
  import { icons } from "$lib/icons";
  console.log(trip.place.photos[0]);
</script>

<div
  class="lg:grid lg:grid-cols-[auto_3fr] lg:h-[150px] rounded-xl my-5 bg-slate-300"
>
  <a href="/place/{trip.place_id}"
    ><img
      src={trip.place.photos[0]}
      alt="Explore more on rocketbnb"
      class=" aspect-auto mx-auto rounded-xl object-contain h-[150px]"
    /></a
  >

  <div class="flex flex-col justify-evenly p-4">
    <p class="font-bold">{trip.place.title}</p>
    <hr class="h-1 bg-slate-600" />
    <span class="inline-flex xs:gap-4 max-xs:gap-1 max-xs:text-[14px]">
      <p class="max-xs:hidden">{@html icons.calender}</p>
      <p>{trip.checkInDate}</p>
      <p>{@html icons.arrowRight}</p>
      <p class="max-xs:hidden">{@html icons.calender}</p>
      <p>{trip.checkOutDate}</p>
    </span>
    <p class="font-bold">
      {trip.numNights} nights | Total price : Rs. {new Intl.NumberFormat(
        "en-IN",
        {
          maximumSignificantDigits: 3,
        }
      ).format(trip.bookingAmount)}
    </p>
    <a href="/place/{trip.place_id}"
      ><p class="underline text-red-700 font-bold">Click for More Details</p></a
    >
  </div>
</div>
