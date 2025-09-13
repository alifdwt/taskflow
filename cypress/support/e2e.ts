// Import commands.js using ES2015 syntax:
import "./commands";

// Import Cypress commands
import "cypress-real-events/support";

// Code coverage support
import "@cypress/code-coverage/support";

// Global configuration
Cypress.on("uncaught:exception", (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // on uncaught exceptions from the application
  if (err.message.includes("ResizeObserver loop limit exceeded")) {
    return false;
  }
  return true;
});

// Custom error handling for Better Auth
Cypress.on("window:before:load", (win) => {
  win.console.error = cy.stub().as("consoleError");
});
