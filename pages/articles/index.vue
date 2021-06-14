<template>
  <section>
    <h2 class="py-10 text-center font-bold text-4xl">
      Articles Overview
    </h2>
    <ul class="flex py-6 mb-6 flex-row flex-wrap">
      <li
        v-for="article in stories"
        :key="article._uid"
        class="w-1/3 flex px-6 mb-6"
        style="min-width: 33%;"
      >
        <article-teaser
          v-if="article.content"
          :article-link="article.full_slug"
          :article-content="article.content"
        />
        <p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">
          This content loads on save. <strong>Save the entry & reload.</strong>
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Articles',
  asyncData (context) {
    const locale = context.app.i18n.locale === 'pl' ? '' : 'en/'

    return context.app.$storyapi.get('cdn/stories', {
      starts_with: `${locale}artykuly/`,
      version: 'draft'
    }).then((res) => {
      return { stories: res.data.stories }
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }
  // data () {
  //   return {
  //     stories: []
  //   }
  // }
}
</script>
