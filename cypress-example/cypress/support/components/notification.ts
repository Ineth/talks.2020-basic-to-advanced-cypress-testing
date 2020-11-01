import { modal } from '@support/codey';

class Notification {
  public modal = modal;
  public modalContainer = () => cy.getBy('modal');
  public modalShouldBeVisible = () => this.modalContainer().should('be.visible');
}

export default new Notification();
