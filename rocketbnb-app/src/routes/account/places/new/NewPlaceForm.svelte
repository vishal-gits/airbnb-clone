<script lang="ts">
  import { perksItems } from "$lib/utils";
  export let form: placeFormData;
  import { enhance } from "$app/forms";
  import Photoupload from "$lib/photoupload.svelte";

  let thisForm: HTMLFormElement;
  let urlArr: string[];
</script>

<!-- form element -->
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
      value={form?.title ?? ""}
    />
    <!-- address -->
    <label for="address"
      >Address<span class="block text-gray-400">Address to this place</span
      ></label
    >
    <input
      type="text"
      id="address"
      placeholder="address"
      class="w-full border p-2 border-[#f53850] rounded-full"
      name="address"
      value={form?.address ?? ""}
    />

    <!-- photos -->

    <label for="photos"
      >Photos<span class="block text-gray-400">More is better</span></label
    >

    <div
      class="grid gap-2 grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 justify-items-center ms-3"
    >
      {#if urlArr}
        {#each urlArr as singleimg}
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img
            src={singleimg}
            alt="uploaded image"
            class="object-cover w-[200px] h-[200px] rounded-2xl"
          />
        {/each}
      {/if}
    </div>

    <div class="mx-auto">
      <Photoupload bind:urlArr />
    </div>

    <input type="hidden" name="photos" value={urlArr} />

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
      value={form?.description ?? ""}
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
            name={perk.item}
            value={form?.perk.item}
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
      value={form?.extraInfo ?? ""}
    />

    <!-- checkIn-Out & guests -->

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
              value={form?.checkInTime ?? ""}
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
              value={form?.checkOutTime ?? ""}
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
          <label for="maxGuests">Max Number of guests </label><input
            class="p-1 w-40 border rounded-xl border-[#f53850] text-center"
            type="text"
            id="maxGuests"
            name="maxGuests"
            value={form?.maxGuests ?? ""}
          />
        </div>
        <div class="text-center flex flex-col">
          <label for="price">Price per night </label>
          <input
            class="p-1 w-40 border rounded-xl border-[#f53850] text-center"
            type="text"
            id="price"
            name="price"
            value={form?.price ?? ""}
          />
        </div>
      </div>
    </fieldset>

    <!-- submit button -->

    <button
      type="submit"
      class="bg-[#F53850] w-4/5 max-w-[400px] mx-auto p-2 text-lg rounded-full text-white hover:bg-gray-500 my-3"
      >Save</button
    >
  </form>
</div>
