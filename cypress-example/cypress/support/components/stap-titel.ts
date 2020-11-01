class StapTitel {
  public titel = () => cy.getBy('stap-titel');
  public prijs = () => cy.getBy('stap-prijs');
}

export default new StapTitel();
