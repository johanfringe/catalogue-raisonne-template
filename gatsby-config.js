require("dotenv").config();

const myQueries = require("./src/utils/algolia-queries"); // Zorg dat dit bovenaan staat!

module.exports = {
  siteMetadata: {
    title: `Catalogue Raisonné`,
    description: `Catalogue Raisonné`,
    author: `@johanfringe`,
    siteUrl: `https://catalogue-raisonne-template.netlify.app`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images`,
      },
    },

    {
      resolve: `gatsby-plugin-react-helmet`,
      options: {},
    },

    `gatsby-transformer-remark`,

    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },

    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY, // Alleen gebruiken tijdens build-tijd
        indexName: `artworks`,
        queries: myQueries,
        chunkSize: 10000,
      },
    },
  ],
};
