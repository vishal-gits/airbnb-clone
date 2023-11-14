<script>
  import { user } from "$lib/stores";
  export let data;
  import { invalidate, invalidateAll } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    invalidate("http://localhost:5173/logout");
  });

  $: User = data?.authedUser;

  $: {
    const newUser = data?.authedUser;
    user.set(newUser);
    // console.log("this is from page.svelte", $user);
  }

  const { allPlaces } = data.allPlacesData;
  // console.log(allPlaces);
</script>

{#if $user}
  <h1 class="text-center text-2xl">
    welcome to rocketbnb <span class="capitalize underline"
      ><a href="/account">{$user?.name ?? ""}</a></span
    >
  </h1>
{/if}

<div
  class="grid sm:grid-cols-2 md:grid-cols-3 w-5/6 mx-auto mt-4 gap-4 gap-y-8"
>
  {#each allPlaces as place}
    <div class="group">
      <a href="/place/{place.id}"
        ><img
          src={place.photos[0]}
          alt={place.title}
          class="mx-auto h-[200px] rounded-2xl w-11/12 group-hover:w-full"
        /></a
      >

      <div class="w-11/12 mx-auto group-hover:w-full">
        <p class="line-clamp-1 font-bold">{place.title}</p>
        <p class="italic">{place.address}</p>
        <p class="italic">
          Rs.{new Intl.NumberFormat("en-IN", {
            maximumSignificantDigits: 3,
          }).format(place.price)} per night
        </p>
      </div>
    </div>
  {/each}
</div>
