import { faker } from "@faker-js/faker";

describe("Teste de Cadastro e Login de Usuário", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", () => false); // Ignora erros JS da página
  });

  it("Deve preencher e enviar o formulário de cadastro com sucesso e depois logar", () => {
    cy.visit("https://magento2-demo.magebit.com/");
    cy.contains("Create an Account").should("be.visible").click();

    cadastrarUsuario();
  });
});

function cadastrarUsuario() {
  const nome = faker.person.firstName();
  const sobrenome = faker.person.lastName();
  const email = faker.internet.email();
  const senha = Cypress.env("userPassword");

  // Cadastro
  cy.get("#firstname").type(nome);
  cy.get("#lastname").type(sobrenome);
  cy.get("#email_address").type(email);
  cy.get("#password").type(senha);
  cy.get("#password-confirmation").type(senha);
  cy.get('[class="action submit primary"]').click();

  // Confirma cadastro
  cy.contains("Thank you for registering with Main Website Store.").should("be.visible");

  // Logout (pega só o menu visível)
  cy.get('.customer-welcome', { timeout: 10000 })
    .filter(':visible')
    .first()
    .should('be.visible')
    .click();

  cy.contains("Sign Out", { timeout: 10000 })
    .should("be.visible")
    .click();

  // Login
  cy.contains("Sign In").click();
  cy.get("#email").type(email);
  cy.get("#pass").type(senha);
  cy.get("#send2").click();

  // Valida login
  cy.contains(`Welcome, ${nome}`, { timeout: 10000 }).should("be.visible");
}
