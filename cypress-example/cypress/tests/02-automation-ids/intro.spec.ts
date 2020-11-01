describe('intro', () => {
  it('It should go through the intro flow', () => {
    cy.visit('nl/Opstart Eenmanszaak');

    cy.get('#ccc-notify-accept').click();
    cy.get('.xer-mb-3').click();

    cy.getBy('xer-sync-point');
    cy.get('div.xer-flex > .xer-btn').click();

    cy.getBy('xer-sync-point');
    cy.get('#persoon\\.voornaam').type('John');
    cy.get('.xer-btn')
      .first()
      .click();

    cy.getBy('xer-sync-point');
    cy.get('#persoon\\.achternaam').type('Doe');
    cy.get('.xer-btn')
      .first()
      .click();
  });

  it('It should go through the intro flow - Result', () => {
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
});
