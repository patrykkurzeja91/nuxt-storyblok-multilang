<template>
  <header class="max-w-5xl mx-auto py-8 flex">
    <nav>
      <ul>
        <li>
          <nuxt-link
            class="text-teal-600 hover:underline"
            :to="localePath({name: 'index'})"
          >
            Home
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            class="text-teal-600 hover:underline"
            :to="localePath({name: 'articles'})"
          >
            Blog
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="flex-1">
      <a href="/" class="block w-56 mx-auto">
        <img src="http://a.storyblok.com/f/42016/1096x313/0353bf6654/logo2.png">
      </a>
    </div>
    <nav>
      <ul>
        <li>
          <nuxt-link
            class="text-teal-600 hover:underline"
            :to="switchLocalePath('pl')"
          >
            Polish
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            class="text-teal-600 hover:underline"
            :to="switchLocalePath('en')"
          >
            English
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  mounted () {
    console.log(this.$route.name)
  }
}
</script>
