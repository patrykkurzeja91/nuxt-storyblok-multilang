export const translatedSlugs = (story) => {
  const slugs = {
    pl: { slug: story.slug }
  }
  story.translated_slugs.forEach((t) => {
    const tmp = t.path.split('/')
    slugs[t.lang] = { slug: tmp[tmp.length - 1] }
  })
  return slugs
}
