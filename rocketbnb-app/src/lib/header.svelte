<script lang="ts">
  import { user, bookingUrl } from "$lib/stores";
  import { format } from "date-fns";
  import { icons } from "$lib/icons";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {
    checkInDate,
    checkOutDate,
    numGuests,
    destination,
  } from "$lib/stores";

  $: thisUser = $user;
  // console.log($user?.name);

  let expandbtn: HTMLElement;

  let bookingbtn: HTMLElement;
  let expand: boolean = false;
  const handleExpand = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    expand = !expand;
    if (!expand) {
      expandbtn.style.border = "5px solid red";
      goto("/");
    } else {
      expandbtn.style.border = "1px solid red";
    }
  };
  let guestCount = 0;
  const handleInc = (e: { preventDefault: any }) => {
    e.preventDefault();
    guestCount++;
    console.log(typeof guestCount);
    $numGuests = guestCount.toString();
  };
  const handleDec = (e: { preventDefault: any }) => {
    e.preventDefault();
    if (guestCount > 0) {
      guestCount--;
      $numGuests = guestCount.toString();
    }
  };

  const formatDate = function (date: string | number | Date) {
    const newdate = new Date(date);
    return format(newdate, "dd MMM");
  };
</script>

<header class="p-4 flex justify-between relative h-auto">
  <a href="/" class="flex items-center gap-1">
    {@html icons.rocket}
    <span class="font-bold text-xl max-sm:hidden">rocketbnb</span>
  </a>

  {#if $bookingUrl && !$user}
    <a href="/login"
      ><button class="rounded-xl px-2 bg-yellow-300 h-10 mt-1"
        >Please Complete your Login</button
      ></a
    >
  {:else if $bookingUrl && $user}
    <a href={$bookingUrl}
      ><button class="rounded-xl px-2 bg-yellow-300 h-10 mt-1"
        >Please complete your booking</button
      ></a
    >
  {/if}

  <button
    on:click={handleExpand}
    bind:this={expandbtn}
    class="flex gap-3 p-2 rounded-full max-[475px]:border-[2px] border-[5px] border-[#ff0000] shadow-md shadow-gray-300 max-xs:gap-1 max-xs:p-1"
  >
    <p class="max-xs:text-[12px] max-xs:font-medium">
      {$destination ? $destination : "Anywhere"}
    </p>
    <p>|</p>
    <p class="max-xs:text-[12px] max-xs:font-medium">
      {$checkInDate && $checkOutDate
        ? `${formatDate($checkInDate)} - ${formatDate($checkOutDate)}`
        : "AnyWeek"}
    </p>
    <p>|</p>
    <p class="max-xs:text-[12px] max-xs:font-medium">
      {$numGuests ? $numGuests : "Add Guests"}
    </p>
    <p>{@html icons.search}</p>
  </button>

  <div
    class="flex justify-evenly items-center rounded-full min-xs:shadow-md min-xs:shadow-red-400 min-xs:px-3 bg-[#f53850] text-white"
  >
    {#if thisUser}
      <a href="/account">{@html icons.userCircle}</a>
    {:else}
      <a href="/login">{@html icons.userCircle}</a>
    {/if}

    <p class="mx-2 p-1 underline font-bold max-sm:hidden">
      {#if thisUser}
        <a href="/account">{thisUser.name}</a>
      {:else}
        <a href="/login">Login</a>
      {/if}
    </p>
  </div>
</header>

{#if expand}
  <div
    class="md:flex md:justify-evenly vs:grid vs:grid-cols-[1fr_1fr] vs:place-items-center vs:gap-y-2 grid grid-col-[1fr] justify-center"
  >
    <input
      type="text"
      bind:value={$destination}
      placeholder="Enter destination"
      class="rounded-full w-48 border-2 p-2 self-center border-[#f53850]"
    />

    <span
      class="inline-flex items-center border-2 p-2 rounded-full w-48 border-[#f53850]"
    >
      <span class="font-bold">From:</span>
      <input id="checkin" type="date" bind:value={$checkInDate} /></span
    >
    <span
      class="inline-flex items-center border-2 p-2 rounded-full w-48 border-[#f53850]"
    >
      <span class="font-bold">To:</span>
      <input type="date" bind:value={$checkOutDate} /></span
    >

    <div
      class="w-48 flex items-center justify-evenly border-2 rounded-full p-2 border-[#f53850]"
    >
      Guests
      <button on:click={handleInc}>{@html icons.plusCircle}</button>
      <input
        class="w-2/12"
        type="text"
        bind:value={$numGuests}
        placeholder="Add Guests"
      />
      <button on:click={handleDec}>{@html icons.minusCircle}</button>
    </div>
  </div>
{/if}
