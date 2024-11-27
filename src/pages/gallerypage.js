import React, { useEffect } from "react";
import algoliasearch from 'algoliasearch/lite'; // Gebruik de lite-versie voor een lichter gewicht
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// Hier is je Algolia zoekclient
const searchClient = algoliasearch(
  '39JPZSUI05',  // Vul hier je eigen App ID in
  '071b803f152e93845e56fdfd29401ad8' // Vul hier je eigen Search Key in
);

const GalleryPage = ({ data }) => {
  // Gebruik effect voor Algolia zoekfunctionaliteit
  useEffect(() => {
    const search = instantsearch({
      indexName: "artworks",
      searchClient,
    });

    search.addWidgets([
      searchBox({
        container: "#searchbox",
        placeholder: "Zoek naar kunstwerken...",
      }),
      hits({
        container: "#hits",
        templates: {
          item: `
            <div>
              <h2>{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</h2>
              <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
            </div>
          `,
        },
      }),
    ]);

    search.start();

    return () => {
      search.dispose(); // Clean up InstantSearch wanneer de component wordt verwijderd
    };
  }, []);

  // Galerij met alle kunstwerken uit markdown bestanden
  return (
    <main>
      <h1>Galerijpagina</h1>

      {/* Algolia zoekbox en zoekresultaten */}
      <div id="searchbox" style={{ marginBottom: "2rem" }}></div>
      <div id="hits" style={{ marginBottom: "4rem" }}></div>

      {/* Statische weergave van kunstwerken */}
      <div>
        {data.allMarkdownRemark.nodes.map((artwork) => {
          const image = getImage(artwork.frontmatter.image);
          return (
            <div key={artwork.id} style={{ marginBottom: "2rem" }}>
              <h2>{artwork.frontmatter.title}</h2>
              {image && (
                <GatsbyImage
                  image={image}
                  alt={artwork.frontmatter.title}
                  style={{ maxWidth: "300px", marginBottom: "1rem" }}
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

// GraphQL-query om alle kunstwerken op te halen
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
