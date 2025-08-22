🧪 Testes Automatizados com Cypress – Magento Demo

Este projeto contém cenários de testes automatizados end-to-end (E2E) desenvolvidos com Cypress utilizando o site de demonstração do Magento 2.
O objetivo é praticar e demonstrar habilidades em QA Automation, cobrindo fluxos críticos de um e-commerce.

🚀 Cenários implementados
1️⃣ Cadastro, Login, Logout e Compra de Produto

Criação de usuário com dados dinâmicos gerados pelo Faker.js.

Logout e Login com os dados cadastrados.

Adição de um produto ao carrinho.

Fluxo de checkout e finalização da compra.

2️⃣ Adição de Múltiplos Produtos ao Carrinho

Login automático com usuário dinâmico.

Adição de dois produtos diferentes ao carrinho.

Atualização da quantidade de produtos no carrinho.

Validação do valor total da compra.

🛠️ Tecnologias Utilizadas

Cypress – framework de testes E2E

Faker.js – geração de dados aleatórios

JavaScript / Node.js

📂 Estrutura do Projeto
cypress/
  ├── e2e/
  │   ├── cadastroCompra.cy.js       # Teste de cadastro, login, logout e compra
  │   ├── carrinho.cy.js             # Teste de múltiplos produtos no carrinho
  ├── support/
      ├── commands.js                # Função customizada de cadastro/login

▶️ Como Executar os Testes
Pré-requisitos

Node.js instalado (>= 16)

Cypress instalado globalmente ou no projeto (npm install cypress --save-dev)

Rodando os testes
# Abrir interface interativa do Cypress
npx cypress open

# Rodar em modo headless
npx cypress run

🎯 Objetivo do Projeto

Este repositório tem como finalidade demonstrar conhecimentos em:

Automação de testes E2E com Cypress

Estruturação de cenários de testes reais de e-commerce

Uso de boas práticas de escrita de testes

Criação de funções customizadas reutilizáveis (Commands)
