import * as React from "react";
import { Link } from "gatsby"; // Import Gatsby's Link component

const IndexPage = () => {
  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Jean Milo</h1>
        <p className="text-gray-700 mb-6">Welkom op de officiële website van Jean Milo.</p>
        
        {/* Link naar de gallerypagina */}
        <Link 
          to="/gallerypage"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Catalogue Raisonné van de Schilderijen
        </Link>
      </div>
    </main>
  );
};

export default IndexPage;
