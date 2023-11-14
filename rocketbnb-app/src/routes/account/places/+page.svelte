<script lang="ts">
  export let data;
  import { format } from "date-fns";
  let placeData = data.placeAndBookingDetails?.userPlaces;

  import { icons } from "$lib/icons";

  const formatDate = function (date: string | number | Date) {
    const newdate = new Date(date);
    return format(newdate, "MMMM dd, yyyy");
  };
</script>

<div class="flex flex-col mt-10 max-sm:mt-5">
  <a data-sveltekit-preload-data="off" href="/account/places/new">
    <button
      class="bg-[#F53850] p-2 w-64 max-sm:w-44 max-sm:text-sm max-sm:font-bold text-lg rounded-full hover:underline hover:rounded-none text-white flex justify-center items-center mx-auto"
    >
      <span class="inline-flex gap-2 items-center"
        >{@html icons.plus} Add new place</span
      ></button
    ></a
  >
</div>

{#if placeData.length > 0}
  <div class="w-3/5 max-lg:w-4/5 max-xs:w-10/12 max-vs:w-11/12 mx-auto">
    <p
      class="text-center mt-6 text-2xl max-sm:text-lg max-sm:mt-3 max-vs:text-sm"
    >
      List of accomodations posted for bookings on portal
    </p>
    <div class="grid mt-6 p-2 rounded-xl gap-3">
      {#each placeData as list}
        <div
          class="grid-cols-[2fr_3fr] grid gap-2 my-3 bg-slate-200 rounded-xl max-md:flex max-md:flex-col max-md:gap-y-2"
        >
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img
            src={list.photos[0]}
            alt="Please Upload Image"
            class={!list.photos[0]
              ? "aspect-auto mx-auto rounded-xl object-contain h-[150px]"
              : "rounded-xl"}
          />
          <div class="flex flex-col justify-evenly items-center max-md:pb-5">
            <p
              class="text-center font-bold text-blue-700 line-clamp-1 text-xl max-md:my-2"
            >
              {list.title}
            </p>
            <p class="justify-self-start line-clamp-3 max-md:my-2">
              <span class="font-semibold">Details</span> : {list.description}
            </p>
            <a href="/account/places/details/{list.id}"
              ><button
                class=" bg-[#F53850] p-1 rounded-full text-white hover:bg-gray-500 text-sm"
                >View More Details</button
              ></a
            >
          </div>
        </div>
        {#if list.booking}
          {#each list.booking as booking, index}
            <div class="border-2 border-slate-400 rounded-lg py-2">
              <p class="px-2">Booking {index + 1} - Booking ID: {booking.id}</p>

              <div class="grid grid-cols-4 max-md:grid-cols-2">
                <p class="py-1 px-2 bg-slate-200">Name</p>
                <p class="py-1 px-2 bg-slate-200">{booking.user.name}</p>
                <p class="py-1 px-2 md:bg-slate-200">Email</p>
                <p class="py-1 px-2 md:bg-slate-200">
                  {booking.user.email}
                </p>
                <p class="py-1 px-2 max-md:bg-slate-200">Phone Number</p>
                <p class="py-1 px-2 max-md:bg-slate-200">{booking.phoneNum}</p>
                <p class="py-1 px-2">Number of Guests</p>

                <p class="py-1 px-2">{booking.numGuests}</p>

                <p class="py-1 px-2 bg-slate-200">Check-in-Date</p>
                <p class="py-1 px-2 bg-slate-200">
                  {formatDate(booking.checkInDate)}
                </p>
                <p class="py-1 px-2 md:bg-slate-200">Check-out-Date</p>
                <p class="py-1 px-2 md:bg-slate-200">
                  {formatDate(booking.checkOutDate)}
                </p>
                <p class="py-1 px-2 max-md:bg-slate-200">Number of Nights</p>
                <p class="py-1 px-2 max-md:bg-slate-200">{booking.numNights}</p>
                <p class="py-1 px-2">Booking Amount</p>

                <p class="py-1 px-2">{booking.bookingAmount}</p>
              </div>
            </div>
          {/each}
        {/if}
      {/each}
    </div>
  </div>
{:else}
  <div class="w-4/5 mx-auto">
    <p class="text-center mt-6 text-2xl">
      You have not posted any accomodation for booking
    </p>
    <p class="text-center mt-6 text-2xl">
      You can add new accomodation for other users to book you place, using the
      above"Add new Place" button
    </p>
  </div>
{/if}
