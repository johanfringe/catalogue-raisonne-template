const pageQuery = `{
  allMarkdownRemark {
    nodes {
      objectID: id
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
    transformer: ({ data }) => data.allMarkdownRemark.nodes, // De manier waarop de data wordt verstuurd naar Algolia
  },
]

module.exports = queries