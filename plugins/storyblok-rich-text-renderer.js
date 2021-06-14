import Vue from 'vue'
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer'
import feature from '@/components/RTEFeature.vue'
import Teaser from '@/components/Teaser.vue'
import blokDoubleImage from '@/components/RTEBlokDoubleImage.vue'

// Simple ...
Vue.use(VueRichTextRenderer, {
  resolvers: {
    components: {
      feature,
      teaser: Teaser,
      blokDoubleImage
    }
  }
})
