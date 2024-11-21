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
        description
      }
      excerpt(pruneLength: 5000)
    }
  }
}`

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.allMarkdownRemark.nodes, // Transformeer de data naar het juiste formaat voor Algolia
  },
]

module.exports = queries