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
      item: (hit, { html, components }) => html`
        <article>
          <div>
            <h1>${components.Highlight({ hit, attribute: 'title' })}</h1>
            <p>${components.Highlight({ hit, attribute: 'categorie' })}</p>
            <p>${components.Highlight({ hit, attribute: 'techniek' })}</p>
          </div>
        </article>
      `,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
