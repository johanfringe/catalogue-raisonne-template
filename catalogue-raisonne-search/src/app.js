const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  '39JPZSUI05',
  '071b803f152e93845e56fdfd29401ad8'
);

const search = instantsearch({
  indexName: 'artworks',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit) => `
        <div>
          <h2><em>Title: ${hit.title}</em></h2>
          <p><em>Category: ${hit.category}</em></p>
          <p><em>Description: ${hit.description}</em></p>
          <p><em>Datum: ${hit.date}</em></p>
        </div>
      `,
    },
  }),
]);

search.start();
