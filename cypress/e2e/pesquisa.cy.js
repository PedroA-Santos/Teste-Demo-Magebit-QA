describe("Pesquisar produto pela barra de pesquisa e validar resultados", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", () => false);
    cy.visit("https://magento2-demo.magebit.com/");
    cy.cadastroLoginMagento();
  });

  it("Deve retornar apenas produtos relacionados ao termo pesquisado", () => {
    const pesquisa = "Short";

    cy.get("#search").should("be.visible").type(`${pesquisa}{enter}`);
    cy.url().should("include", "catalogsearch/result");

    cy.get("body").then(($body) => {
      // aq pega o body inteiro da página para a verificação
      //verificando aq se n trouxe nenhum resultado a pesquiosa
      if ($body.text().includes("Your search returned no results.")) {
        cy.contains("Your search returned no results.").should("be.visible");
      } else {
        cy.get(".product-item-name:visible").each(($el) => {
          //percorre cada elemento
          const text = $el.text().trim().toLowerCase(); //pega o texto do elemento, remove espaços
          expect(text).to.include(pesquisa.toLowerCase()); //valida que o nome do produto contém o termo pesquisado, ignorando maiúsculas/minúsculas.
        });
      }
    });
  });
});
