export const componentSelectors = {
  cookieControl: {
    acceptButton: () => cy.get('#ccc-notify-accept')
  },
  startAanbodButton: () => cy.getBy('navigatie-verder'),
  verderZonderItsm: () => cy.getBy('navigatie-verder'),
  xerInput: {
    input: () => cy.getBy('textfield_input'),
    errorMessage: () => cy.getBy('textfield_error'),
  },
  verder: () => cy.getBy('navigatie-verder').first(),
  syncPoint: () => cy.getBy('xer-sync-point')
};
