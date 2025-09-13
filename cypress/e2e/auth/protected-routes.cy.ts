/// <reference types="cypress" />

describe("Authentication - Protected Routes", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  const protectedRoutes = ["/dashboard", "/tasks", "/projects", "/profile"];

  protectedRoutes.forEach((route) => {
    it(`should redirect unauthenticated user from ${route} to signin`, () => {
      cy.visit(route);
      cy.url().should("include", "/signin");
    });
  });

  it("should allow authenticated user to access protected routes", () => {
    // Create unique test user to avoid conflicts
    const timestamp = Date.now();
    const testUser = {
      name: "Protected Route Test User",
      email: `protected${timestamp}@example.com`,
      password: "Test123!",
    };

    // Register user using custom command
    cy.register(testUser.name, testUser.email, testUser.password);

    // Test access to protected routes
    protectedRoutes.forEach((route) => {
      cy.visit(route);
      cy.url().should("include", route);
    });
  });

  it("should redirect to signin after logout", () => {
    // Create unique test user
    const timestamp = Date.now();
    const testUser = {
      name: "Logout Test User",
      email: `logout${timestamp}@example.com`,
      password: "Test123!",
    };

    cy.register(testUser.name, testUser.email, testUser.password);
    cy.logout();

    // Try to access protected route
    cy.visit("/dashboard");
    cy.url().should("include", "/signin");
  });
});
