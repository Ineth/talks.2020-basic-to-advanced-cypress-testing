// TODO: Remove after feature toggle is removed and replacement with cookiebot
class CookieControl {
  public acceptButton = () =>
    cy.get('#CybotCookiebotDialogBodyLevelButtonAccept', { timeout: 10000 });
  public accept = () => this.acceptButton().click();
}

export default new CookieControl();
