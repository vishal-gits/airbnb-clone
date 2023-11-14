<script lang="ts">
  import Photoupload from "$lib/photoupload.svelte";
  import { icons } from "$lib/icons";
  import { mainPhoto } from "$lib/stores";

  export let oldArr: string[];
  let urlArr: string[];

  const handleRemove = (singleimg: string) => {
    let newArr = oldArr.filter((img) => img !== singleimg);

    oldArr = [...newArr];
  };

  const handleSave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (urlArr) {
      oldArr = [...oldArr, ...urlArr];
      urlArr = [];
    } else {
      oldArr = [...oldArr];
    }
  };

  $: {
    if (mainPhoto) {
    }
  }
  // console.log($mainPhoto);
</script>

<div
  class="grid gap-2 grid-cols-4 ms-3 max-lg:grid-cols-2 max-sm:grid-cols-1 justify-items-center"
>
  <!-- {console.log("oldArr.length=", typeof oldArr, oldArr.length)} -->
  {#if oldArr.length > 0}
    {#each oldArr as singleimg}
      <div class="flex flex-col items-center relative">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
          src={singleimg}
          alt="uploaded image"
          class="object-cover w-[200px] h-[200px] rounded-2xl"
        />
        <button
          type="button"
          title="press only if you want to delete"
          class="bg-gray-200 text-gray-500 w-fit p-1 rounded-xl m-2 absolute right-0 bottom-0"
          on:click={(e) => {
            e.preventDefault();
            handleRemove(singleimg);
          }}>{@html icons.remove}</button
        >
        <input
          type="radio"
          name="selectMain"
          class="absolute left-4 scale-150 bottom-4"
          title="Select as Main/Display Photo"
          on:change={() => ($mainPhoto = singleimg)}
        />
      </div>
    {/each}
  {/if}
</div>

<h2 class="text-center">
  {oldArr.length > 0
    ? "Upload more photos to add more photos"
    : "Upload photos to add photos"}
</h2>

<div class="mx-auto">
  <Photoupload bind:urlArr />
</div>

{#if urlArr}
  <div
    class="grid gap-2 grid-cols-4 ms-3 max-lg:grid-cols-2 max-sm:grid-cols-1 justify-items-center"
  >
    {#if urlArr}
      {#each urlArr as singleimg}
        <div class="flex flex-col">
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img
            src={singleimg}
            alt="uploaded image"
            class="object-cover w-[200px] h-[200px] rounded-2xl"
          />
        </div>
      {/each}
    {/if}
  </div>
{/if}

<button
  class="bg-gray-400 text-white hover:bg-gray-300 hover:text-black w-fit p-2 mx-auto"
  title="Press to save your photos"
  on:click={handleSave}>Save Photos</button
>
