const pageQuery = `{
  allMarkdownRemark {
    nodes {
      objectID: id
      internal {
        contentDigest
      }
      frontmatter {
        title
        date(formatString: "YYYY")
        category
        description
        image {
          childImageSharp {
            gatsbyImageData(
              width: 600
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
      excerpt(pruneLength: 5000)
    }
  }
}`;


const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => 
      data.allMarkdownRemark.nodes.map((node) => {
        return {
          objectID: node.objectID,
          title: node.frontmatter.title,
          date: node.frontmatter.date,
          category: node.frontmatter.category,
          description: node.frontmatter.description,
          excerpt: node.excerpt,
          internal: {
            contentDigest: node.internal.contentDigest,
          },
        };
      }),
  },
];

module.exports = queries;
