<script>
  import "../app.css";
  import Header from "$lib/header.svelte";
  import { user } from "$lib/stores";
  export let data;

  // $: User = data?.authedUser;
  // console.log("this is from layout.svelte", data?.authedUser);

  $: {
    const newUser = data?.authedUser;
    user.set(newUser);
  }
</script>

<Header />
<slot />
