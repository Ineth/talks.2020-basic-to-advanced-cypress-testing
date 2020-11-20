class CookieControl {
  public acceptButton = () => cy.getBy('cookiebot-accept', { timeout: 10000 });
  public accept = () => this.acceptButton().click();
}

export default new CookieControl();
