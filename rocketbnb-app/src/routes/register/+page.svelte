<script lang="ts">
  export let form;
  import { enhance } from "$app/forms";
  let thisForm: HTMLFormElement;
</script>

<form method="post" use:enhance bind:this={thisForm}>
  <div
    class=" w-2/5 mx-auto flex flex-col items-center justify-center h-auto gap-3 mt-10"
  >
    <h1 class="text-3xl max-md:text-xl">Register</h1>
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
      {#if form?.weakPassword}
        <p class="xs:text-[12px] max-xs:text-[9px]">
          Minimum password requirements:
        </p>
        <ul class="list-disc list-inside">
          <li class="xs:text-[12px] max-xs:text-[9px]">
            At least 8 characters
          </li>
          <li class="xs:text-[12px] max-xs:text-[9px]">
            At least one Uppercase character
          </li>
          <li class="xs:text-[12px] max-xs:text-[9px]">
            At least one lowercase character
          </li>
          <li class="xs:text-[12px] max-xs:text-[9px]">
            At least 3 special characters OR numbers
          </li>
        </ul>
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
