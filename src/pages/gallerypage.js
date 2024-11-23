import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const GalleryPage = ({ data }) => {
  return (
    <main>
      <h1>Galerij</h1>
      <div>
        {data.allMarkdownRemark.nodes.map(artwork => {
          const image = getImage(artwork.frontmatter.image);
          return (
            <div key={artwork.id}>
              <h2>{artwork.frontmatter.title}</h2>
              {image && (
                <GatsbyImage
                  image={image}
                  alt={artwork.frontmatter.title}
                />
              )}
              <p>{artwork.frontmatter.description}</p>
              <Link to={`/artwork${artwork.fields.slug}`}>Bekijk details</Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        id
        frontmatter {
          title
          description
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 300)
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`;

export default GalleryPage;
