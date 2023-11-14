<script lang="ts">
  import { page } from "$app/stores";
  import NewPlaceForm from "./NewPlaceForm.svelte";
  const { action } = $page.params;
  export let form: placeFormData;
  // export let data;
  // console.log(data, "From page.svelte- action");

  // console.log(action);
</script>

<NewPlaceForm {form} />
