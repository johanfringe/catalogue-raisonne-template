import * as React from "react";
import { Link } from "gatsby"; // Import Gatsby's Link component

const IndexPage = () => {
  return (
    <main>
      <h1>Jean Milo</h1>
      <p>.</p>
      {/* Link naar de gallerypagina */}
      <Link to="/gallerypage">
        Catalogue Raisonné van de Schilderijen
      </Link>
    </main>
  );
};

export default IndexPage;
