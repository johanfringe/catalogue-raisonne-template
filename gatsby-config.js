require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Catalogue Raisonné`,
    description: `An online catalogue raisonné for artists' works.`,
    author: `@johanfringe`,
    siteUrl: `https://catalogue-raisonne-template.netlify.app`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Catalogue Raisonné Template`,
        short_name: `Catalogue`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `content/images/icon.png`, // Dit moet een bestaande afbeelding in je project zijn
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: `artworks`,
        queries: require("./src/utils/algolia-queries"), // Zorg dat het pad correct is
        chunkSize: 10000,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `artworks`,
        path: `${__dirname}/content/artworks`, // Pad naar je markdown-bestanden
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images`, // Pad naar je afbeeldingen
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet`,
      options: {},
    },
  ],
};
