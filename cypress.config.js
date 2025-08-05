require("dotenv").config();

module.exports = {
  env: {
    userPassword: process.env.CYPRESS_userPassword,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
