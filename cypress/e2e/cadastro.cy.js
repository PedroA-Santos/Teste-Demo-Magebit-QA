import { faker } from "@faker-js/faker";

describe("Teste de Cadastro de Usuário", () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; // Ignora erros JS da página
    });
  });

  it("Deve preencher e enviar o formulário de cadastro com sucesso", () => {
    cy.visit("https://magento2-demo.magebit.com/");
    cy.contains("Create an Account").should("be.visible").click();

    cadastrarUsuario();
  });
});

function cadastrarUsuario() {
  const nome = faker.person.firstName();
  const sobrenome = faker.person.lastName();
  const email = faker.internet.email();
  const senha = Cypress.env('userPassword');


  cy.get("#firstname").type(nome);
  cy.get("#lastname").type(sobrenome);
  cy.get("#email_address").type(email);
  cy.get("#password").type(senha);
  cy.get("#password-confirmation").type(senha);
  cy.get('[class="action submit primary"]').click();
}
