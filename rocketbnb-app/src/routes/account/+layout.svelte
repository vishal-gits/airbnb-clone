<script>
  import { page } from "$app/stores";
  import { icons } from "$lib/icons";

  $: urlpath = $page.url.pathname;

  // console.log(urlpath);

  let activeStyle =
    "bg-red-500  text-white rounded-full px-3 py-2 inline-flex gap-x-1  max-xs:w-120 max-vs:text-[12px] max-vs:px-1";
  let inertStyle =
    "hover:underline bg-gray-300 rounded-full px-3 py-2 inline-flex gap-x-1  max-xs:w-120 max-vs:text-[14px] max-vs:px-1";
</script>

<div class="h-auto flex justify-evenly mt-5">
  <a href="/account/profile"
    ><button
      title="Check your Profile Details"
      class={urlpath.includes("/account/profile")
        ? `${activeStyle} `
        : `${inertStyle}`}
      >{@html icons.user}<span class="max-xs:hidden">My</span> profile</button
    ></a
  >
  <a href="/account/bookings"
    ><button
      title="List of all your Bookings"
      class={urlpath.includes("/account/bookings")
        ? `${activeStyle} `
        : `${inertStyle}`}
      >{@html icons.list}<span class="max-xs:hidden">My</span> bookings</button
    ></a
  >
  <a href="/account/places"
    ><button
      title="List of places you posted for booking"
      class={urlpath.includes("/account/places")
        ? `${activeStyle} `
        : `${inertStyle}`}
      >{@html icons.building}<span class="max-xs:hidden">My</span> Places</button
    ></a
  >
</div>

<slot />
