<script lang="ts">
  export let data;
  import { page } from "$app/stores";
  import { icons } from "$lib/icons";
  import { selectGuests } from "$lib/utils";
  import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
  import { compareDesc } from "date-fns";
  import {
    user,
    checkInDate,
    checkOutDate,
    numGuests,
    bookingUrl,
    phoneNum,
    numNights,
    bookingAmount,
  } from "$lib/stores";
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";
  import { Block } from "@uploadcare/blocks";

  let showPhotos = 0;
  // console.log(data);
  // console.log($user);

  let displaydiv: HTMLElement;
  let dateOrder: number;

  let bookingValidity: boolean;
  let bookingValidityWithUser: boolean;
  // console.log($page.url.pathname);
  // $: console.log($bookingUrl);
  $: {
    if ($checkInDate && $checkOutDate) {
      $numNights = differenceInCalendarDays(
        new Date($checkOutDate),
        new Date($checkInDate)
      );

      dateOrder = compareDesc(new Date($checkInDate), new Date($checkOutDate));

      if (dateOrder !== 1) {
        alert("Please enter Check-out Date greater than Check-in Date");
      }
    }
    if ($numNights) {
      $bookingAmount = Number(place.price) * $numNights;
    }
  }

  $: {
    if (
      $checkInDate &&
      $checkOutDate &&
      Number($numGuests) &&
      dateOrder === 1
    ) {
      bookingValidity = true;
    } else {
      bookingValidity = false;
    }
  }

  $: {
    // console.log("This is for displaydiv", bookingValidity);
    if (bookingValidity && $user) {
      displaydiv ? (displaydiv.style.display = "block") : "";
    }
  }

  const handleBookNow = (e: { preventDefault: () => void }) => {
    if (!bookingValidity) {
      e.preventDefault();
      alert(
        "Please fill all the details--  check-in Date, check-out Date , Number of Guests"
      );
    } else if (bookingValidity && !$user) {
      e.preventDefault();

      $bookingUrl = $page.url.pathname;
      goto("/login");
    } else if (bookingValidity && $user && !Number($phoneNum)) {
      e.preventDefault();
      alert("Please fill all the details-- phone number");
    } else if (bookingValidity && $user && Number($phoneNum)) {
      // console.log($phoneNum, typeof $phoneNum);
      // alert("Booking is successful");
      bookingValidity = false;
      $bookingUrl = undefined;
    }
  };

  // @ts-ignore
  const { singlePlace: place } = data.currentPlace;
  // console.log(place);

  const handleShow = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    showPhotos = 1;
  };

  const handleClose = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    showPhotos = 0;
  };

  let guestCount = 0;

  const handleInc = (e: { preventDefault: any }) => {
    e.preventDefault();
    if (guestCount < place.maxGuests) {
      guestCount++;
      // console.log(typeof guestCount);
      $numGuests = guestCount.toString();
    }
  };
  const handleDec = (e: { preventDefault: any }) => {
    e.preventDefault();
    if (guestCount > 0) {
      guestCount--;
      $numGuests = guestCount.toString();
    }
  };
</script>

<!-- SHOW PHOTOS -->
{#if showPhotos === 1}
  <div class="w-full h-screen flex flex-col">
    <button
      class="md:text-2xl sm:text-xl max-sm:font-bold p-2 bg-red-500 text-white rounded-lg mx-auto my-4"
      on:click={handleClose}
    >
      Close Photos</button
    >
    <div class="grid grid-cols-1 w-4/5 mx-auto gap-10 mb-10">
      {#each place.photos as photos}
        <div>
          <img
            src={photos}
            alt="Explore more on rocketbnb"
            class="object-cover mx-auto rounded-2xl w-4/6 h-auto aspect-square"
          />
        </div>
      {/each}
    </div>
  </div>
{/if}
<!-- NORMAL PHOTO DISPLAY -->
{#if showPhotos === 0}
  <div class="w-5/6 bg-slate-200 mx-auto border-4 mt-4 rounded-2xl p-5">
    <div class="bg-white p-2 rounded-xl">
      <p class="text-2xl max-md:text-xl italic ps-9 mt-2">{place.title}</p>
      <p class="text-xl max-md:text-lg ps-9 mt-2 underline">
        <span class="inline-block">{@html icons.location}</span>{place.address}
      </p>
    </div>

    <div
      class="grid lg:grid-cols-3 sm:grid-cols-2 h-auto gap-2 relative bg-white items-center my-5 rounded-xl px-3 py-3"
    >
      {#each place.photos as photos, index}
        <button on:click={handleShow}>
          {#if index <= 2}
            <img
              src={photos}
              alt="Explore more on rocketbnb"
              class="object-cover aspect-square h-[300px] mx-auto rounded-2xl hover:w-[315px] max-xs:h-[200px] max-xs:hover:w-[215px] max-[800px]:h-[250px] max-[800px]:hover:w-[265px]"
            />
          {/if}
        </button>
      {/each}
      <button
        class="absolute bottom-4 right-4 p-2 bg-red-500 text-white rounded-lg border-4 border-white"
        on:click={handleShow}>Show All Photos</button
      >
    </div>
    <!-- DESCRIPTION PART -->
    <div class="grid grid-cols-[2fr_1fr] max-lg:grid-cols-1">
      <div class="flex gap-2 flex-col bg-white me-3 p-2 rounded-xl">
        <h1 class="text-2xl font-bold">Description</h1>
        <p>{place.description}</p>

        <p class="font-medium">Check-in time: {place.checkInTime}:00 hrs</p>
        <p class="font-medium">Check-out time: {place.checkOutTime}:00 hrs</p>
        <p class="font-medium">Max Number of Guests: {place.maxGuests}</p>
      </div>
      <!-- BOOKING FORM -->
      <form method="post" use:enhance>
        <div
          class="bg-white flex flex-col gap-4 max-lg:w-3/5 max-lg:mt-4 mx-auto rounded-xl justify-center p-4 max-sm:w-4/5 max-xs:w-full"
        >
          <div class="text-xl m-4 mx-auto">
            <p class="font-medium">
              Price: Rs. {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(place.price)} per night
            </p>
          </div>

          <div class="flex max-md:flex-col mx-auto border-2 rounded-xl">
            <label class="md:border-e-2 p-2"
              >Check- in : <input
                type="date"
                name="checkInDate"
                bind:value={$checkInDate}
                required
              />
            </label>
            <label class=" p-2"
              >Check- out : <input
                type="date"
                name="checkOutDate"
                bind:value={$checkOutDate}
                required
              />
            </label>
          </div>

          <div
            class=" flex items-center border-2 rounded-xl p-1 justify-center"
          >
            <p class="mx-3">Guests</p>
            <div class="flex w-48 p-1 rounded-xl items-center">
              <button on:click={handleInc}>{@html icons.plusCircle}</button>
              <input
                class="w-10/12 text-center mx-2 border border-[#f53850] rounded-full"
                type="text"
                bind:value={$numGuests}
                placeholder="Add"
              />
              <button on:click={handleDec}>{@html icons.minusCircle}</button>
            </div>
          </div>

          <!-- {#if bookingValidity && $user} -->
          <div class="hidden" bind:this={displaydiv}>
            <div class="flex flex-col gap-2 border-2 rounded-xl p-3">
              <label for="username">Name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={$user?.name}
                required
                disabled
                class="border-2 rounded-xl h-8 p-2"
              />
              <label for="phoneNum">Phone Number</label>
              <input
                type="text"
                id="phoneNum"
                name="phoneNum"
                class="border-2 rounded-xl h-8 p-2"
                bind:value={$phoneNum}
                required
              />
            </div>
          </div>
          <!-- {/if} -->

          {#if $checkInDate && $checkOutDate && $bookingAmount && Number($numGuests)}
            <p class="font-medium">
              Total Booking Amount for {$numNights} nights is Rs. {new Intl.NumberFormat(
                "en-IN",
                {
                  maximumSignificantDigits: 3,
                }
              ).format($bookingAmount)}
            </p>
            <input
              type="text"
              hidden
              name="bookingAmount"
              value={$bookingAmount}
            />
            <input type="text" hidden name="numNights" value={$numNights} />
          {/if}

          <div class="mx-auto">
            <button
              class="w-fit bg-red-500 text-white p-2 rounded-xl"
              on:click={handleBookNow}
              >{!bookingValidity
                ? "Book Now"
                : bookingValidity && !$user
                ? "Please Login to Book"
                : "Book Now"}</button
            >
          </div>
        </div>
      </form>
    </div>

    <div class="mt-4 bg-white p-2 rounded-xl">
      <h2 class="text-xl font-bold">Extra-Info:</h2>
      <p class="w-3/4 mx-auto">{place.extraInfo}</p>
    </div>
  </div>
{/if}
