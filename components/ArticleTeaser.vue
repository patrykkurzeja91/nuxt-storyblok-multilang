<template>
  <nuxt-link
    :to="translatedLink"
    class="article-teaser block py-4 px-6 border rounded border-gray-500"
  >
    <h2 class="pt-2 pb-4 text-2xl font-bold">
      {{ articleContent.name }}
    </h2>
    <p class="pb-6 leading-relaxed">
      {{ articleContent.intro }}
      {{ translatedSlugs }}
      {{ articleLink }}
      <br>
    </p>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    articleContent: {
      type: Object,
      required: true
    },
    articleLink: {
      type: String,
      required: true
    },
    translatedSlugs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    translatedLink () {
      const locale = this.$i18n.locale
      if (locale !== 'pl' && this.translatedSlugs.length > 0) {
        return `/${this.translatedSlugs[0].lang}/${this.translatedSlugs[0].path}`
      }
      return `/${this.articleLink}`
    }
  }
}
</script>

<style>
.article-teaser:hover {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.75);
}
</style>
