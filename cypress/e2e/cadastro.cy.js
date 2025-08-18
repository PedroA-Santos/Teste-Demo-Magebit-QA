import { faker } from "@faker-js/faker";

describe("Teste de Cadastro e Login de Usuário", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", () => false);
  });

  it("Deve preencher e enviar o formulário de cadastro com sucesso e depois logar", () => {
    cy.visit("https://magento2-demo.magebit.com/");
    cy.contains("Create an Account", { timeout: 10000 })
      .should("be.visible")
      .click();

    cadastrarUsuarioeLogar();
    adicionarNoCarrinhoEComprar();
    preencherCheckout();
  });
});

function cadastrarUsuarioeLogar() {
  const nome = faker.person.firstName();
  const sobrenome = faker.person.lastName();
  const email = faker.internet.email();
  const senha = Cypress.env("userPassword");

  cy.get("#firstname", { timeout: 10000 }).should("be.visible").type(nome);
  cy.get("#lastname").should("be.visible").type(sobrenome);
  cy.get("#email_address").should("be.visible").type(email);
  cy.get("#password").should("be.visible").type(senha);
  cy.get("#password-confirmation").should("be.visible").type(senha);
  cy.get('[class="action submit primary"]').should("be.enabled").click();

  cy.contains("Thank you for registering with Main Website Store.", {
    timeout: 10000,
  }).should("be.visible");

  cy.get(".customer-welcome", { timeout: 10000 })
    .first()
    .should("be.visible")
    .click();
  cy.contains("Sign Out", { timeout: 10000 }).should("be.visible").click();

  cy.contains("Sign In", { timeout: 10000 }).should("be.visible").click();
  cy.get("#email", { timeout: 10000 }).should("be.visible").type(email);
  cy.get("#pass").should("be.visible").type(senha);
  cy.get("#send2").should("be.visible").click();

  cy.contains(`Welcome, ${nome}`, { timeout: 10000 }).should("be.visible");
}

function adicionarNoCarrinhoEComprar() {
  cy.contains("a", "What's New", { timeout: 10000 })
    .should("be.visible")
    .click();
  cy.contains("Jackets", { timeout: 10000 }).should("be.visible").click();

  cy.contains("Stellar Solar Jacket", { timeout: 10000 })
    .should("be.visible")
    .click();
  cy.get("#option-label-size-157-item-171", { timeout: 10000 })
    .should("be.visible")
    .click();
  cy.get("#option-label-color-93-item-50").should("be.visible").click();
  cy.get('button[title="Add to Cart"]').should("be.visible").click();

  cy.contains("You added Stellar Solar Jacket to your shopping cart.", {
    timeout: 10000,
  }).should("be.visible");

  cy.get(".action.showcart", { timeout: 10000 })
    .should("be.visible")
    .click({ force: true });
  cy.get(".minicart-items-wrapper", { timeout: 10000 }).should("be.visible");

  cy.get("#top-cart-btn-checkout", { timeout: 10000 })
    .should("be.visible")
    .click({ force: true });

  cy.url({ timeout: 15000 }).then((url) => {
    if (!url.includes("/checkout")) {
      cy.visit("https://magento2-demo.magebit.com/checkout");
    }
  });

  cy.url({ timeout: 10000 }).should("include", "/checkout");
}

function preencherCheckout() {
  const empresa = faker.company.name().replace(/\n/g, "");
  const endereco = faker.location.streetAddress();
  const cidade = faker.location.city();
  const codigoPostal = faker.location.zipCode("#####-###");
  const telefone = faker.phone.number("###########");

  cy.get('input[name="company"]', { timeout: 8000 }).type(empresa);
  cy.get('input[name="street[0]"]').should("be.visible").type(endereco);
  cy.get('select[name="country_id"]').should("be.visible").select("BR");
  cy.get('select[name="region_id"]').should("be.visible").select("Paraná");
  cy.get('input[name="city"]').should("be.visible").type(cidade);
  cy.get('input[name="postcode"]').should("be.visible").type(codigoPostal);
  cy.get('input[name="telephone"]').should("be.visible").type(telefone);

  cy.get('input[type="radio"][name^="ko_unique_2"]', { timeout: 15000 })
    .should("be.visible")
    .first()
    .check({ force: true })
    .should("be.checked");

  cy.intercept("POST", "**/estimate-shipping-methods").as("estimateShipping");
  cy.intercept("POST", "**/shipping-information").as("saveAddress");

  cy.get('button[data-role="opc-continue"]', { timeout: 10000 })
    .should("be.visible")
    .and("not.be.disabled")
    .scrollIntoView()
    .click();

  cy.wait("@estimateShipping", { timeout: 20000 })
    .its("response.statusCode")
    .should("eq", 200);

  cy.wait("@saveAddress", { timeout: 20000 })
    .its("response.statusCode")
    .should("eq", 200);

  cy.contains("Payment Method", { timeout: 20000 }).should("be.visible");

  cy.get('input[name="billing-address-same-as-shipping"]').click();

  cy.intercept("POST", "**/payment-information").as("placeOrder");

  cy.get('button[title="Place Order"]').should("be.visible").click();

  cy.wait("@placeOrder", { timeout: 20000 })
    .its("response.statusCode")
    .should("eq", 200);

  cy.url({ timeout: 10000 }).should("include", "/checkout/cart");

  cy.log("✅ Pedido processado até o envio de payment-information");
}
