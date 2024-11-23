import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const DetailPage = ({ data }) => {
  const { markdownRemark: artwork } = data;
  const image = getImage(artwork.frontmatter.image);

  return (
    <main>
      <h1>{artwork.frontmatter.title}</h1>
      {image && (
        <GatsbyImage
          image={image}
          alt={artwork.frontmatter.title}
          style={{ maxWidth: "100%", marginBottom: "20px" }}
        />
      )}
      <p>{artwork.frontmatter.description}</p>
      <p>
        <strong>Category:</strong> {artwork.frontmatter.category}
      </p>
      <p>
        <strong>Date:</strong> {artwork.frontmatter.date}
      </p>
    </main>
  );
};

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        date
        category
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;

export default DetailPage;
