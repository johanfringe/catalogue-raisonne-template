const pageQuery = `{
  allMarkdownRemark {
    nodes {
      objectID: id
      internal {
        contentDigest
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
        description
      }
      excerpt(pruneLength: 5000)
    }
  }
}`

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => {
      return data.allMarkdownRemark.nodes.map(node => ({
        ...node,
        contentDigest: node.internal.contentDigest, // Voeg het contentDigest toe
      }));
    },
  },
]

module.exports = queries