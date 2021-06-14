module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  // purge: [
  //   './public/**/*.html',
  //   './src/**/*.{js,jsx,ts,tsx,vue}'
  // ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  },
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ]
}
