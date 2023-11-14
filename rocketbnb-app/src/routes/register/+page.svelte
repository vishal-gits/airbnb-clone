<script lang="ts">
  export let form;
  import { enhance } from "$app/forms";
  let thisForm: HTMLFormElement;
</script>

<form method="post" use:enhance bind:this={thisForm}>
  <div
    class=" w-2/5 mx-auto flex flex-col items-center justify-center h-[25rem] gap-3"
  >
    <h1 class="text-3xl">Register</h1>
    <input
      class="border-2 border-gray-400 p-2 rounded-full w-full"
      type="text"
      placeholder="Your Name"
      name="name"
      required
      value={form?.name ?? ""}
    />
    <input
      class="border-2 border-gray-400 p-2 rounded-full w-full"
      type="email"
      placeholder="your@email.com"
      name="email"
      required
      value={form?.email ?? ""}
    />
    <input
      class="border-2 border-gray-400 p-2 rounded-full w-full"
      type="password"
      placeholder="password"
      name="password"
      required
    />

    <div>
      {#if form?.error}
        <p><small>{form?.message}</small></p>
      {/if}
    </div>

    <button
      type="submit"
      class="bg-[#F53850] w-full p-2 text-lg rounded-full text-white hover:bg-gray-500"
      >Register</button
    >
    <p>
      Already a member ? <a
        href="/login"
        class="underline text-red-700 hover:bg-[#F53850] hover:text-white p-2 rounded-full"
        >Login</a
      >
    </p>
  </div>
</form>
