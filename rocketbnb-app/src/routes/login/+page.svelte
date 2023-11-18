<script lang="ts">
  export let form;
  import { enhance } from "$app/forms";
  import { user, bookingUrl } from "$lib/stores.js";
  import { goto } from "$app/navigation";
  export let data;

  $: clearUser = data?.clearUser;

  $: {
    if (clearUser) user.set(undefined);
  }

  function routetobooking(url: string | URL) {
    goto(url);
  }

  const handleBooking = () => {
    if ($bookingUrl) {
      // console.log($bookingUrl);
      routetobooking($bookingUrl);
    } else {
      goto("/");
    }
  };
</script>

<form method="post" use:enhance>
  <div
    class="w-2/5 max-sm:w-4/5 max-md:w-3/5 mx-auto flex flex-col items-center justify-center h-[25rem] gap-3"
  >
    <h1 class="text-3xl">Login</h1>
    <input
      class="border-2 border-gray-400 p-2 rounded-full w-full"
      type="email"
      name="email"
      placeholder="your@email.com"
      value={form?.email ?? ""}
      required
    />
    <input
      class="border-2 border-gray-400 p-2 rounded-full w-full"
      type="password"
      name="password"
      placeholder="password"
      required
    />

    <div>
      {#if form?.error}
        <p><small>{form?.message}</small></p>
      {/if}
    </div>

    <button
      type="submit"
      on:click={handleBooking}
      class="bg-[#F53850] w-full p-2 text-lg rounded-full text-white hover:bg-gray-500"
      >Login</button
    >
    <p class="text-center">
      Don't have an account yet ? <a
        href="/register"
        class="underline text-red-700 hover:bg-[#F53850] hover:text-white p-2 rounded-full"
        >Register</a
      >
    </p>
  </div>
</form>
