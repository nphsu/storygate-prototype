const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'gatsby-three-ts-plus',
    description: '3D web starter kit with Three.js and TypeScript.',
    keywords: 'three.js, typescript, gatsbyjs, gatsby, emotion, tailwindcss',
    siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com',
    author: {
      name: 'Shumpei Koike',
      url: 'https://twitter.com/shunpei42ba_'
    }
  },
  plugins: [
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-three-ts-plus.netlify.app'
      }
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images')
      }
    },
    'gatsby-plugin-emotion',
    `gatsby-plugin-postcss`,
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-robots-txt'
  ]
}