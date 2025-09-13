export class AuthPage {
  // Elements
  get nameInput() {
    return cy.get("[data-cy=name-input]");
  }
  get emailInput() {
    return cy.get("[data-cy=email-input]");
  }
  get passwordInput() {
    return cy.get("[data-cy=password-input]");
  }
  get confirmPasswordInput() {
    return cy.get("[data-cy=confirm-password-input]");
  }
  get signinButton() {
    return cy.get("[data-cy=signin-button]");
  }
  get signupButton() {
    return cy.get("[data-cy=signup-button]");
  }
  get forgotPasswordLink() {
    return cy.get("[data-cy=forgot-password-link]");
  }
  get signupLink() {
    return cy.get("[data-cy=signup-link]");
  }
  get signinLink() {
    return cy.get("[data-cy=signin-link]");
  }
  get errorMessage() {
    return cy.get("[data-cy=error-message]");
  }
  get successMessage() {
    return cy.get("[data-cy=success-message]");
  }

  // Actions
  visitSignin() {
    cy.visit("/signin");
  }

  visitSignup() {
    cy.visit("/signup");
  }

  signin(email: string, password: string) {
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.signinButton.click();
  }

  signup(name: string, email: string, password: string) {
    this.nameInput.type(name);
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.confirmPasswordInput.type(password);
    this.signupButton.click();
  }

  verifyOnSigninPage() {
    cy.url().should("include", "/signin");
    cy.contains("Welcome back").should("be.visible");
  }

  verifyOnSignupPage() {
    cy.url().should("include", "/signup");
    cy.contains("Get started").should("be.visible");
  }
}
