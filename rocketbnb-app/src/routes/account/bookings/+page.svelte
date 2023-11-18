<script lang="ts">
  export let data;
  import { compareDesc } from "date-fns";
  import Displayinfo from "./displayinfo.svelte";

  const {
    allBookings: {
      user: { booking },
    },
  } = data;

  let checkUpcoming = booking.some(
    (trip: { checkInDate: string | number | Date }) =>
      compareDesc(new Date(), new Date(trip.checkInDate)) === 1
  );
  // console.log(checkUpcoming);

  let checkPrevious = booking.some(
    (trip: { checkInDate: string | number | Date }) =>
      compareDesc(new Date(), new Date(trip.checkInDate)) !== 1
  );
  // console.log(checkPrevious);
</script>

<div class="sm:w-3/5 mx-auto p-5 max-sm:w-10/12">
  {#if checkUpcoming}
    <div class="w-full rounded-xl my-4">
      <p class="text-center text-xl font-bold">Upcoming Bookings</p>
      {#each booking as trip}
        {#if compareDesc(new Date(), new Date(trip.checkInDate)) === 1}
          <Displayinfo {trip} />
        {/if}
      {/each}
    </div>
  {:else}
    <div class="flex flex-col items-center">
      <p class="text-2xl font-bold max-sm:text-xl max-xs:text-sm text-center">
        You dont have any Upcoming Bookings
      </p>
      <a href="/">
        <p
          class="text-3xl font-bold text-red-500 underline max-sm:text-2xl max-xs:text-lg"
        >
          BOOK NOW
        </p></a
      >
    </div>
  {/if}

  {#if checkPrevious}
    <div class="w-full rounded-xl my-4">
      <p class="text-center text-xl font-bold max-sm:text-lg">
        Previous Bookings
      </p>
      {#each booking as trip}
        {#if compareDesc(new Date(), new Date(trip.checkInDate)) !== 1}
          <Displayinfo {trip} />
        {/if}
      {/each}
    </div>
  {/if}
</div>
