import { componentSelectors } from '@support/component.selectors';

describe('intro', () => {
  it('It should go through the intro flow', () => {
    cy.visit('nl/Opstart Eenmanszaak');

    cy.get('#ccc-notify-accept').click();
    cy.getBy('navigatie-verder').click();

    cy.getBy('xer-sync-point');
    cy.getBy('navigatie-verder').click();

    cy.getBy('xer-sync-point');
    cy.getBy('textfield_input').type('John');
    cy.get('.xer-btn')
      .first()
      .click();

    cy.getBy('xer-sync-point');
    cy.getBy('textfield_input').type('Doe');
    cy.getBy('navigatie-verder')
      .first()
      .click();
  });

  it('It should go through the intro flow - Result', () => {
    componentSelectors.cookieControl.acceptButton().click();
    componentSelectors.verder().click();

    componentSelectors.syncPoint();
    componentSelectors.verder().click();

    componentSelectors.syncPoint();
    componentSelectors.xerInput.input().type('John');
    componentSelectors.verder();

    componentSelectors.syncPoint();
    componentSelectors.xerInput.input().type('Doe');
    componentSelectors.verder().click();
  });
});
