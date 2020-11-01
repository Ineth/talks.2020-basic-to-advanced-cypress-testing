class Header {
  public logo = () => cy.getBy('header_logo-link');
  public productName = () => cy.getBy('header_product-name');
}

export default new Header();
