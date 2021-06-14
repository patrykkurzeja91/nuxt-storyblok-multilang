<template>
  <div class="flex -mx-2 my-4">
    <div v-if="body " class="px-2 w-1/2">
      <img
        class="mx-auto w-40 h-40 object-fit"
        :src="body.one.filename"
      >
    </div>
    <div v-if="body" class="px-2 w-1/2">
      <img
        class="mx-auto w-40 h-40 object-fit"
        :src="body.two.filename"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    body: {
      type: Object,
      required: true
    }
  }
}
</script>
