<template>
  <div
    v-editable="body"
    class="py-2"
  >
    <img
      class="mx-auto w-10 h-10 object-fit"
      :src="body.icon.filename"
    >
    <h1 class="text-lg">
      {{ body.name }}
    </h1>
    <p class="text-gray-600">
      {{ body.description }}
    </p>
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
