import notification from './notification';

class HelpButton {
  public notification = notification;
  public button = () => cy.getBy('help-button__button');
}

export default new HelpButton();
