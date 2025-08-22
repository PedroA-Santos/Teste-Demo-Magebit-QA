import { faker } from "@faker-js/faker";

Cypress.Commands.add("cadastroLoginMagento", () => {
  const nome = faker.person.firstName();
  const sobrenome = faker.person.lastName();
  const email = faker.internet.email();
  const senha = Cypress.env("userPassword");

  
  cy.visit("https://magento2-demo.magebit.com/customer/account/create/");

  // formulário de cadastro
  cy.get("#firstname", { timeout: 10000 }).should("be.visible").type(nome);
  cy.get("#lastname").should("be.visible").type(sobrenome);
  cy.get("#email_address").should("be.visible").type(email);
  cy.get("#password").should("be.visible").type(senha);
  cy.get("#password-confirmation").should("be.visible").type(senha);
  cy.get('[class="action submit primary"]').should("be.enabled").click();

  // cadastro
  cy.contains("Thank you for registering with Main Website Store.", { timeout: 10000 }).should("be.visible");

  //log out
  cy.get(".customer-welcome", { timeout: 10000 }).first().click();
  cy.contains("Sign Out", { timeout: 10000 }).should("be.visible").click();

 //login
  cy.contains("Sign In", { timeout: 10000 }).should("be.visible").click();
  cy.get("#email", { timeout: 10000 }).should("be.visible").type(email);
  cy.get("#pass").should("be.visible").type(senha);
  cy.get("#send2").should("be.visible").click();

  // Espera até a página do cliente carregar totalmente
  cy.contains(`Welcome, ${nome}`, { timeout: 15000 }).should("be.visible");
  cy.url({ timeout: 15000 }).should("include", "/customer/account");
});
