export const componentSelectors = {
  cookieControl: {
    acceptButton: () => cy.get('#ccc-notify-accept')
  },
  xerInput: {
    input: () => cy.getBy('textfield_input'),
    errorMessage: () => cy.getBy('textfield_error')
  },
  verder: () => cy.getBy('navigatie-verder').first(),
  syncPoint: () => cy.getBy('xer-sync-point')
};
