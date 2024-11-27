const escapeStringRegexp = require("escape-string-regexp");
const { createContentDigest } = require("gatsby-core-utils");


const indexName = `artworks`;

const artworkQuery = `
{
  allMarkdownRemark {
    nodes {
      id
      frontmatter {
        title
        description
        date
        category
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 150)
          }
        }
      }
      fields {
        slug
      }
      excerpt(pruneLength: 500)
    }
  }
}
`;

const queries = [
  {
    query: artworkQuery,
    transformer: ({ data }) => {
      return data.allMarkdownRemark.nodes.map((node) => {
        const contentDigest = createContentDigest(node);
        return {
          objectID: node.id,
          title: node.frontmatter.title,
          description: node.frontmatter.description,
          date: node.frontmatter.date,
          category: node.frontmatter.category,
          slug: node.fields.slug,
          excerpt: node.excerpt,
          internal: {
            contentDigest: contentDigest,
          },
        };
      });
    },
    indexName,
    settings: {
      searchableAttributes: ["title", "description", "category", "date", "slug"],
    },
  },
];

module.exports = queries;
