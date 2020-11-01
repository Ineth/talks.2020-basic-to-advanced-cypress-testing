class NavBar {
  public back = () => cy.getBy('navbar_button-back');
  public home = () => cy.getBy('navbar_button-home');
  public chat = () => cy.getBy('navbar_button-chat');
}

export default new NavBar();
