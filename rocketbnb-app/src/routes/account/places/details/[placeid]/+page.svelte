<script lang="ts">
  export let data;

  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { perksItems } from "$lib/utils";
  import { mainPhoto } from "$lib/stores";

  import Managephoto from "./managephoto.svelte";

  let thisForm: HTMLFormElement;

  const { placeid } = $page.params;

  const { userPlaces } = data;

  const placeInfo = userPlaces.find(
    (/** @type {{ id: string; }} */ placeObj: { id: string }) =>
      placeObj.id === placeid
  );

  // console.log("This is placeInfo from page.svelte", placeInfo);
  // console.log(placeInfo.wifi);

  let oldArr: string[];
  $: {
    if (mainPhoto) {
      console.log("This is from page.svelte", $mainPhoto);
    }
  }
</script>

<div class="border w-4/5 mx-auto mt-8 mb-10 border-[#f53850] rounded-2xl p-2">
  <form
    method="post"
    use:enhance
    bind:this={thisForm}
    class="flex flex-col gap-y-2"
  >
    <!-- title -->
    <label for="title"
      >Title<span class="block text-gray-400"
        >Title for place- should be short catchy as in advertisement</span
      ></label
    ><input
      type="text"
      id="title"
      placeholder="title, for example, A Cozy lovely sea-view Villa"
      class="w-full border p-2 border-[#f53850] rounded-full"
      name="title"
      value={placeInfo.title ?? ""}
    /><!-- address -->
    <label for="address"
      >Address<span class="block text-gray-400">Address to this place</span
      ></label
    >
    <input
      type="text"
      id="address"
      placeholder="address"
      class="w-full border p-2 rounded-full border-[#f53850]"
      name="address"
      value={placeInfo.address ?? ""}
    />

    <!-- photos -->
    <div class="mx-auto border-2 rounded-xl w-11/12">
      <label for="photos"
        >Photos<span class="block text-gray-400">More is better</span></label
      >
      <div class="flex flex-col gap-4 mb-4">
        <Managephoto bind:oldArr={placeInfo.photos} />
      </div>
      <input
        type="hidden"
        name="mainPhoto"
        value={$mainPhoto ? $mainPhoto : placeInfo.photos[0]}
      />
      <input type="hidden" name="photos" value={placeInfo.photos} />
    </div>

    <!-- description -->

    <label for="description"
      >Description<span class="block text-gray-400"
        >description of the place</span
      ></label
    >
    <textarea
      name="description"
      id="description"
      rows="5"
      class="w-full border rounded-2xl p-2 border-[#f53850]"
      value={placeInfo.description}
    />

    <!-- Perks -->

    <h2>
      Perks<span class="block text-gray-400"
        >select all the perks of your place</span
      >
    </h2>
    <!-- value={form?.perk.item ?? ""}  -->
    <div class="grid grid-cols-3 max-md:grid-cols-2 max-xs:grid-cols-1 gap-5">
      {#each perksItems as perk}
        <div
          class="inline-flex gap-1 p-4 border border-[#f53850] rounded-xl items-center"
        >
          <input
            type="checkbox"
            id={perk.item}
            name={perk.name}
            checked={placeInfo[perk.name] ? true : false}
          />
          {@html perk.icon}
          <label for={perk.item}>{perk.item}</label>
        </div>
      {/each}
    </div>

    <label for="extraInfo"
      >Extra-info<span class="block text-gray-400">house rules, etc.</span
      ></label
    >
    <textarea
      name="extraInfo"
      id="extraInfo"
      rows="3"
      class="w-full rounded-xl border border-[#f53850] p-2"
      value={placeInfo.extraInfo}
    />

    <!-- checkIn-out & guests -->

    <fieldset>
      <legend
        >Check-in & Check-out times<span class="block text-gray-400"
          >add check-in and check-out times, remember to have some time window
          for clearing the room between guests</span
        ></legend
      >
      <div
        class="grid grid-cols-4 max-lg:grid-cols-2 max-xs:grid-cols-1 place-items-center gap-5"
      >
        <div class="text-center">
          <label for="checkInTime">Check-in time</label>
          <section class=" w-40 border rounded-xl border-[#f53850]">
            <input
              class="rounded-2xl p-1 w-1/3"
              type="number"
              min="1"
              max="24"
              placeholder="11"
              id="checkInTime"
              name="checkInTime"
              value={placeInfo.checkInTime}
            />
            <span>:</span>
            <input
              class="rounded-2xl p-1 w-1/3"
              disabled
              type="text"
              placeholder="00"
            />
            <span>hrs</span>
          </section>
        </div>
        <div class="text-center">
          <label for="checkOutTime">Check-out time </label>
          <section class="w-40 border rounded-xl border-[#f53850]">
            <input
              class="rounded-2xl p-1 w-1/3"
              type="number"
              min="1"
              max="24"
              id="checkOutTime"
              name="checkOutTime"
              value={placeInfo.checkOutTime}
              placeholder="11"
            />
            <span>:</span>
            <input
              class="rounded-2xl p-1 w-1/3"
              disabled
              type="text"
              placeholder="00"
            />
            <span>hrs</span>
          </section>
        </div>
        <div class="text-center flex flex-col">
          <label for="maxGuests">Max Number of guests </label>
          <input
            class="p-1 w-40 border rounded-xl border-[#f53850] text-center"
            type="text"
            id="maxGuests"
            name="maxGuests"
            value={placeInfo.maxGuests}
          />
        </div>
        <div class="text-center flex flex-col">
          <label for="price">Price per night </label>
          <input
            class="p-1 w-40 border rounded-xl border-[#f53850] text-center"
            type="text"
            id="price"
            name="price"
            value={placeInfo.price}
          />
        </div>
      </div>
    </fieldset>

    <!-- passing the id -->

    <input type="hidden" name="id" value={placeInfo.id} />
    <!-- submit button -->

    <button
      type="submit"
      class="bg-[#F53850] w-4/5 max-w-[400px] mx-auto p-2 text-lg rounded-full text-white hover:bg-gray-500 my-3"
      >Save</button
    >
  </form>
</div>

<!-- value={form?.perk?.name ?? ""} -->
