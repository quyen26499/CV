const Prefetch = {
  store: [],
  request: function() {
    return m.request("data.json").then(userData => {
      return (Prefetch.store = userData.details);
    });
  }
};

const App = {
  oninit: Prefetch.request,
  view: function(vNode) {
    if (Prefetch.store.length !== 0) {
      return [m(Header, Prefetch.store.header), m(Body, Prefetch.store.body)];
    }
  }
};

const Header = {
  view: function(passedData) {
    return m("header", [
      m("h1", passedData.attrs.name),
      m("section", [
        m("aside", [
          m.trust(
            `<img src="${
              passedData.attrs.photo
            }" alt="Dilip Shukla" width="150" height="150"></img><br>Language : <b>${
              passedData.attrs.langues_know
            }</b><br/><b>${passedData.attrs.print.join(", ")}</b>`
          )
        ]),
        m("", `${passedData.attrs.city}, ${passedData.attrs.country}`),
        m.trust(`Mobile : <b>${passedData.attrs.mobile}</b><br/>
                 Email : <a href="mailto:${passedData.attrs.email}" target="_blank" title="Contact Email">${passedData.attrs.email}</a><br />
                 GitHub : <a href="mailto:${passedData.attrs.git}" target="_blank" title="Contact Email">${passedData.attrs.git}</a><br />
                 Facebook : <a href="${passedData.attrs.facebook}" target="_blank" title="Personal Website">${passedData.attrs.facebook}</a><br />`)
      ])
    ]);
  }
};


const Body = {
  view: function(passedData) {
    return m(
      "article",
      Object.keys(passedData.attrs).map(section => {
        return [
          m("section", [
            m("h3", section),
            m("hr"),
            m(
              "",
              passedData.attrs[section].map(item => {
                return [
                  m("h4", item.title),
                  m("h5", item.subtitle),
                  m.trust(`<p>${item.description}</p>`)
                ];
              })
            )
          ]),
          m("br", { class: "pagebreak" })
        ];
      })
    );
  }
};

m.mount(document.body, App);
