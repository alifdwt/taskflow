describe("Authentication - Registration", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("should display registration page correctly", () => {
    cy.visit("/signup");

    cy.contains("Get started").should("be.visible");
    cy.contains("Create your TaskFlow Pro account").should("be.visible");
    cy.get("[data-cy=name-input]").should("be.visible");
    cy.get("[data-cy=email-input]").should("be.visible");
    cy.get("[data-cy=password-input]").should("be.visible");
    cy.get("[data-cy=confirm-password-input]").should("be.visible");
    cy.get("[data-cy=signup-button]").should("be.visible");
    cy.get("[data-cy=signin-link]").should("be.visible");
  });

  it("should show validation errors for empty fields", () => {
    cy.visit("/signup");
    cy.get("[data-cy=signup-button]").click();

    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password must be at least 8 characters").should("be.visible");
  });

  it("should show validation error for invalid email", () => {
    cy.visit("/signup");
    cy.get("[data-cy=name-input]").type("Test User");
    cy.get("[data-cy=email-input]").type("invalid-email");
    cy.get("[data-cy=password-input]").type("Test123!");
    cy.get("[data-cy=confirm-password-input]").type("Test123!");
    cy.get("[data-cy=signup-button]").click();

    cy.contains("Please enter a valid email address").should("be.visible");
  });

  it("should show validation error for weak password", () => {
    cy.visit("/signup");
    cy.get("[data-cy=name-input]").type("Test User");
    cy.get("[data-cy=email-input]").type("test@example.com");
    cy.get("[data-cy=password-input]").type("123");
    cy.get("[data-cy=confirm-password-input]").type("123");
    cy.get("[data-cy=signup-button]").click();

    cy.contains("Password must be at least 8 characters").should("be.visible");
  });

  it("should show error when passwords do not match", () => {
    cy.visit("/signup");
    cy.get("[data-cy=name-input]").type("Test User");
    cy.get("[data-cy=email-input]").type("test@example.com");
    cy.get("[data-cy=password-input]").type("Test123!");
    cy.get("[data-cy=confirm-password-input]").type("Different123!");
    cy.get("[data-cy=signup-button]").click();

    cy.contains("Passwords don't match").should("be.visible");
  });

  it("should show password strength indicator", () => {
    cy.visit("/signup");

    // Weak password
    cy.get("[data-cy=password-input]").type("123");
    cy.get("[data-cy=password-strength]").should("contain", "Weak");

    // Medium password
    cy.get("[data-cy=password-input]").clear().type("Test123");
    cy.get("[data-cy=password-strength]").should("contain", "Medium");

    // Strong password
    cy.get("[data-cy=password-input]").clear().type("Test123!@#");
    cy.get("[data-cy=password-strength]").should("contain", "Strong");
  });

  it("should successfully register new user", () => {
    const timestamp = Date.now();
    const testUser = {
      name: "Test User",
      email: `test${timestamp}@example.com`,
      password: "Test123!",
    };

    cy.visit("/signup");
    cy.get("[data-cy=name-input]").type(testUser.name);
    cy.get("[data-cy=email-input]").type(testUser.email);
    cy.get("[data-cy=password-input]").type(testUser.password);
    cy.get("[data-cy=confirm-password-input]").type(testUser.password);
    cy.get("[data-cy=signup-button]").click();

    // Should show success message
    cy.get("[data-cy=success-message]").should("be.visible");
    cy.contains("Account created successfully").should("be.visible");

    // Should redirect to dashboard
    cy.url().should("include", "/dashboard");
    cy.get("[data-cy=dashboard-header]").should("be.visible");
  });

  it("should show error for existing email", () => {
    const existingUser = {
      name: "Test User",
      email: "test@example.com",
      password: "Test123!",
    };

    // First registration
    cy.visit("/signup");
    cy.get("[data-cy=name-input]").type(existingUser.name);
    cy.get("[data-cy=email-input]").type(existingUser.email);
    cy.get("[data-cy=password-input]").type(existingUser.password);
    cy.get("[data-cy=confirm-password-input]").type(existingUser.password);
    cy.get("[data-cy=signup-button]").click();

    // Wait for success and logout
    cy.url().should("include", "/dashboard");
    cy.logout();

    // Try to register again with same email
    cy.visit("/signup");
    cy.get("[data-cy=name-input]").type("Another User");
    cy.get("[data-cy=email-input]").type(existingUser.email);
    cy.get("[data-cy=password-input]").type(existingUser.password);
    cy.get("[data-cy=confirm-password-input]").type(existingUser.password);
    cy.get("[data-cy=signup-button]").click();

    cy.get("[data-cy=error-message]").should("contain", "User already exists");
  });

  it("should navigate to signin page", () => {
    cy.visit("/signup");
    cy.get("[data-cy=signin-link]").click();
    cy.url().should("include", "/signin");
  });

  it("should show loading state during registration", () => {
    cy.visit("/signup");
    cy.get("[data-cy=name-input]").type("Test User");
    cy.get("[data-cy=email-input]").type("loading@example.com");
    cy.get("[data-cy=password-input]").type("Test123!");
    cy.get("[data-cy=confirm-password-input]").type("Test123!");

    // Intercept the API call to add delay
    cy.intercept("POST", "/api/auth/signup", {
      delay: 2000,
      statusCode: 200,
      body: { success: true },
    }).as("signupRequest");

    cy.get("[data-cy=signup-button]").click();

    // Should show loading state
    cy.get("[data-cy=signup-button]").should("be.disabled");
    cy.get("[data-cy=loading-spinner]").should("be.visible");
  });
});
