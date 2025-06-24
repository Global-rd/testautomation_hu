export const logRunMode = () => {
  if (Cypress.config("isInteractive")) {
    cy.log("GUI mode: npx cypress open");
  } else {
    cy.log("Headless mode: npx cypress run");
  }
};
