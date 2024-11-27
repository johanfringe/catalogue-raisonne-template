const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Slug genereren voor elk markdown bestand
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "content/artworks" });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

// Dynamisch detailpagina's aanmaken
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `);

  // Voor elk kunstwerk (markdown bestand) maken we een detailpagina aan
  result.data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: `artwork${node.fields.slug}`, // Bijv. /artwork/kunstwerk1/
      component: path.resolve("./src/templates/detailpage.js"),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};
