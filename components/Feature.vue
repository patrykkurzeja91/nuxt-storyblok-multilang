<template>
  <div
    v-editable="blok"
    class="py-2"
  >
    <img
      class="mx-auto w-10 h-10 object-fit"
      :src="blok.icon.filename"
    >
    <h1 class="text-lg">
      {{ blok.name }}
    </h1>
    <p class="text-gray-600">
      {{ blok.description }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
