<script>
  import { user, bookingUrl } from "$lib/stores";
  const nullifyBookingUrl = () => {
    $bookingUrl = undefined;
  };
</script>

<div class="flex flex-col items-center justify-center h-[300px]">
  <p class="m-2 text-center text-2xl">
    Logged in as {$user?.name} ({$user?.email})
  </p>
  <a data-sveltekit-preload-data="off" href="/logout">
    <button
      on:click={nullifyBookingUrl}
      class="bg-[#F53850] p-2 w-32 text-lg rounded-full hover:underline hover:rounded-none text-white"
      >Logout</button
    ></a
  >
</div>
