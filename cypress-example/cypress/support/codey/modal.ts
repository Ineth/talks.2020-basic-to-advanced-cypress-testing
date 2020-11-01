class Modal {
  public backdrop = () => cy.getBy('modal_backdrop');
  public close = () => cy.getBy('modal_close');
  public title = () => cy.getBy('modal_title');
}

export default new Modal();
