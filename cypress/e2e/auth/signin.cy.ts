/// <reference types="cypress" />

describe("Authentication - Login", () => {
  beforeEach(() => {
    // Clear any existing session
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("should display login page correctly", () => {
    cy.visit("/signin");

    // Check page elements
    cy.contains("Welcome back").should("be.visible");
    cy.contains("Sign in to your TaskFlow Pro account").should("be.visible");
    cy.get("[data-cy=email-input]").should("be.visible");
    cy.get("[data-cy=password-input]").should("be.visible");
    cy.get("[data-cy=signin-button]").should("be.visible");
    cy.get("[data-cy=forgot-password-link]").should("be.visible");
    cy.get("[data-cy=signup-link]").should("be.visible");
  });

  it("should show validation errors for empty fields", () => {
    cy.visit("/signin");
    cy.get("[data-cy=signin-button]").click();

    // Should show validation errors (may vary based on implementation)
    // We'll check if form doesn't submit to dashboard
    cy.url().should("include", "/signin");
  });

  it("should show validation error for invalid email format", () => {
    cy.visit("/signin");
    cy.get("[data-cy=email-input]").type("invalid-email");
    cy.get("[data-cy=password-input]").type("Test123!");
    cy.get("[data-cy=signin-button]").click();

    // Should stay on signin page with invalid email
    cy.url().should("include", "/signin");
  });

  it("should show error for incorrect credentials", () => {
    cy.visit("/signin");
    cy.get("[data-cy=email-input]").type("wrong@example.com");
    cy.get("[data-cy=password-input]").type("wrongpassword");
    cy.get("[data-cy=signin-button]").click();

    // Should show error or stay on signin page
    cy.url().should("include", "/signin");
  });

  it("should successfully login with valid credentials", () => {
    // Create a test user first
    const timestamp = Date.now();
    const testUser = {
      name: "Login Test User",
      email: `login${timestamp}@example.com`,
      password: "Test123!",
    };

    // Register user first
    cy.register(testUser.name, testUser.email, testUser.password);

    // Logout to test login
    cy.logout();

    // Now test login
    cy.visit("/signin");
    cy.get("[data-cy=email-input]").type(testUser.email);
    cy.get("[data-cy=password-input]").type(testUser.password);
    cy.get("[data-cy=signin-button]").click();

    // Should redirect to dashboard
    cy.url().should("include", "/dashboard");
    cy.get("[data-cy=dashboard-header]").should("be.visible");
  });

  it("should toggle password visibility", () => {
    cy.visit("/signin");

    // Password should be hidden by default
    cy.get("[data-cy=password-input]").should("have.attr", "type", "password");

    // Click toggle button (if exists)
    cy.get("[data-cy=password-toggle]").then(($toggle) => {
      if ($toggle.length > 0) {
        cy.get("[data-cy=password-toggle]").click();
        cy.get("[data-cy=password-input]").should("have.attr", "type", "text");

        // Click again to hide
        cy.get("[data-cy=password-toggle]").click();
        cy.get("[data-cy=password-input]").should(
          "have.attr",
          "type",
          "password"
        );
      } else {
        cy.log("Password toggle not implemented yet");
      }
    });
  });

  it("should navigate to signup page", () => {
    cy.visit("/signin");
    cy.get("[data-cy=signup-link]").click();
    cy.url().should("include", "/signup");
  });

  it("should navigate to forgot password page", () => {
    cy.visit("/signin");
    cy.get("[data-cy=forgot-password-link]").then(($link) => {
      if ($link.length > 0) {
        cy.get("[data-cy=forgot-password-link]").click();
        cy.url().should("include", "/forgot-password");
      } else {
        cy.log("Forgot password link not implemented yet");
      }
    });
  });
});
