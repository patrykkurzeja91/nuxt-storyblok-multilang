<template>
  <section>
    <Article :blok="story.content" />
  </section>
</template>

<script>
// import translatedSlugs from '~/helpers/translated-slug.js';

function translatedSlugs (story) {
  const slugs = {
    pl: { slug: story.slug }
  }
  story.translated_slugs.forEach((t) => {
    const tmp = t.path.split('/')
    slugs[t.lang] = { slug: tmp[tmp.length - 1] }
  })
  return slugs
}

export default {
  name: 'PageArticle',
  async asyncData (context, { store }) {
    const locale = context.app.i18n.locale === 'pl' ? '' : 'en/'
    // Load the JSON from the API
    const version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    try {
      const article = await context.app.$storyapi.get(`cdn/stories/${locale}artykuly/${context.params.slug}`, {
        version
      })
      const story = article.data.story
      const aa = translatedSlugs(story)
      // const bb = await store.dispatch('i18n/setRouteParams', aa)
      console.log(aa)
      // console.log(bb)
      return { story }
    } catch (error) {
      context.error({
        message: error
      })
    }
  },
  // data: () => ({
  //   story: { content: { } }
  // }),
  mounted () {
    // Use the input event for instant update of content
    this.$storybridge.on('input', (event) => {
      if (event.story.id === this.story.id) {
        this.story.content = event.story.content
      }
    })
    // Use the bridge to listen the events
    this.$storybridge.on(['published', 'change'], (event) => {
      // window.location.reload()
      this.$nuxt.$router.go({
        path: this.$nuxt.$router.currentRoute,
        force: true
      })
    })
  },
  methods: {
    translatedSlugs (story) {
      const slugs = {
        pl: { slug: story.slug }
      }
      story.translated_slugs.forEach((t) => {
        const tmp = t.path.split('/')
        slugs[t.lang] = { slug: tmp[tmp.length - 1] }
      })
      return slugs
    }
  }

}
</script>
