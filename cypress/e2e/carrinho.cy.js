import { faker } from "@faker-js/faker";

describe("Adicionar multiplos produtos no carrinho e validar o total", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", () => false);
    cy.visit("https://magento2-demo.magebit.com/");
    cy.cadastroLoginMagento();
  });

  it("Deve Adicionar dois produtos, atualizar a quantidade e validar o total", () => {
    cy.contains("What's New", { timeout: 10000 }).click();
    cy.contains("Jackets", { timeout: 10000 }).click();

    cy.contains("Josie Yoga Jacket", { timeout: 10000 }).click();
    cy.get("#option-label-size-157-item-171").click();
    cy.get("#option-label-color-93-item-50").click();
    cy.get('button[title="Add to Cart"]').click();

    cy.contains("You added Josie Yoga Jacket to your shopping cart.", {
      timeout: 10000,
    }).should("be.visible");

    cy.get('a[title="Go to Home Page"]').should("be.visible").click();

    cy.contains("Shop New Yoga", { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.contains("Rival Field Messenger").should("be.visible").click();
    cy.get('button[title="Add to Cart"]').click();

    cy.get("a.action.showcart")
      .should("have.attr", "href")
      .then((href) => {
        cy.visit(href); 
      });


    cy.url({ timeout: 15000 }).then((url) => {
      if (!url.includes("/checkout")) {
        cy.visit("https://magento2-demo.magebit.com/checkout");
      }
    });

    cy.url({ timeout: 10000 }).should("include", "/checkout");

    cy.get('input[name^="cart["]').first().clear().type("2{enter}");

    cy.contains("Update Shopping Cart", { timeout: 10000 }).click();

    cy.get(".cart-totals").should("be.visible");
    cy.get(".grand.totals .price", { timeout: 10000 }).should("exist");
  });
});
