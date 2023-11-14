<script>
  export let data;
  const { allPlaces } = data.allPlacesData;
</script>

<p
  class="text-3xl max-xs:text-2xl max-vs:text-lg text-center font-bold my-9 text-red-600"
>
  Explore & Book New Destinations
</p>

<div
  class="grid sm:grid-cols-2 md:grid-cols-3 w-5/6 mx-auto mt-4 gap-4 gap-y-8"
>
  {#each allPlaces as place}
    <div class="group">
      <a href="/place/{place.id}"
        ><img
          src={place.photos[0]}
          alt={place.title}
          class="mx-auto h-[200px] rounded-2xl w-11/12 group-hover:w-full"
        /></a
      >

      <div class="w-11/12 mx-auto group-hover:w-full">
        <p class="line-clamp-1 font-bold">{place.title}</p>
        <p class="italic">{place.address}</p>
        <p class="italic">
          Rs.{new Intl.NumberFormat("en-IN", {
            maximumSignificantDigits: 3,
          }).format(place.price)} per night
        </p>
      </div>
    </div>
  {/each}
</div>
