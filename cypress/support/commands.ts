/// <reference types="cypress" />

// Type declarations for custom commands
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login via UI
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>;

      /**
       * Custom command to login via API
       * @example cy.loginAPI('user@example.com', 'password123')
       */
      loginAPI(email: string, password: string): Chainable<void>;

      /**s
       * Custom command to register new user
       * @example cy.register('John Doe', 'john@example.com', 'password123')
       */
      register(name: string, email: string, password: string): Chainable<void>;

      /**
       * Custom command to logout
       * @example cy.logout()
       */
      logout(): Chainable<void>;

      /**
       * Custom command to clear all data
       * @example cy.clearData()
       */
      clearData(): Chainable<void>;

      /**
       * Custom command to seed test data
       * @example cy.seedData()
       */
      seedData(): Chainable<void>;
    }
  }
}

// Login via UI
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/signin");
  cy.get("[data-cy=email-input]").type(email);
  cy.get("[data-cy=password-input]").type(password);
  cy.get("[data-cy=signin-button]").click();

  // Wait for redirect to dashboard
  cy.url().should("include", "/dashboard");
  cy.get("[data-cy=dashboard-header]").should("be.visible");
});

// Login via API (faster for test setup)
Cypress.Commands.add("loginAPI", (email: string, password: string) => {
  cy.request({
    method: "POST",
    url: "/api/auth/signin",
    body: {
      email,
      password,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      // Handle successful login
      window.localStorage.setItem(
        "auth-token",
        response.body.token || "authenticated"
      );
    }
  });
});

// Register new user
Cypress.Commands.add(
  "register",
  (name: string, email: string, password: string) => {
    cy.visit("/signup");
    cy.get("[data-cy=name-input]").type(name);
    cy.get("[data-cy=email-input]").type(email);
    cy.get("[data-cy=password-input]").type(password);
    cy.get("[data-cy=confirm-password-input]").type(password);
    cy.get("[data-cy=signup-button]").click();

    // Wait for success message or redirect
    cy.url().should("include", "/dashboard");
  }
);

// Logout
Cypress.Commands.add("logout", () => {
  cy.get("[data-cy=user-menu]").click();
  cy.get("[data-cy=logout-button]").click();
  cy.url().should("include", "/signin");
});

// Clear all test data - placeholder implementation
Cypress.Commands.add("clearData", () => {
  // This would typically call a test API endpoint
  // For now, we'll just clear browser storage
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Seed test data - placeholder implementation
Cypress.Commands.add("seedData", () => {
  // This would typically call a test API endpoint to seed data
  // For now, we'll just ensure clean state
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Export empty object to make this a module
export {};
