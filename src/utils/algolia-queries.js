const algoliaQueries = [
    {
      query: `
        {
          allMarkdownRemark {
            nodes {
              id
              frontmatter {
                title
                description
              }
              fields {
                slug
              }
            }
          }
        }
      `,
      transformer: ({ data }) => data.allMarkdownRemark.nodes.map((node) => ({
        objectID: node.id,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
        slug: node.fields.slug,
      })),
      indexName: 'artworks',
    },
  ];
  
  module.exports = algoliaQueries;
  