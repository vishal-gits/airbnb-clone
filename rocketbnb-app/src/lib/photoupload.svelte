<script lang="ts">
  import * as LR from "@uploadcare/blocks";

  LR.registerBlocks(LR);
  // photo uploader event
  export let urlArr: string[];
  function handleUploaderEvent(e: { detail: { data: any } }) {
    const { data } = e.detail;

    urlArr = data.map((data: { cdnUrl: any }) => data.cdnUrl);
    if (urlArr.length > 0) {
      return urlArr;
    }
  }
</script>

<lr-config
  ctx-name="my-uploader"
  pubkey="808b49ebbd049d167d3f"
  multiple="true"
  max-local-file-size-bytes="10000000"
  use-cloud-image-editor="true"
  cloud-Image-Editor-Tabs="crop"
  img-only="true"
  source-list="local, url, camera, dropbox"
/>

<lr-file-uploader-regular
  css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.27.4/web/lr-file-uploader-regular.min.css"
  ctx-name="my-uploader"
/>
<lr-data-output
  ctx-name="my-uploader"
  use-event
  hidden
  on:lr-data-output={handleUploaderEvent}
/>
