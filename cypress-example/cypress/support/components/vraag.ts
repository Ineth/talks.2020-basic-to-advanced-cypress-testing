class Vraag {
  public text = () => cy.getBy('vraag_text');
}

export default new Vraag();
