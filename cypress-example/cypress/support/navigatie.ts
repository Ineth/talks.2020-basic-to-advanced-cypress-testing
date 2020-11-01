export default {
  startAanbod: () =>
    cy
      .getBy('navigatie-verder')
      .click()
      .getSyncPoint(),
  verder: () =>
    cy
      .getBy('navigatie-verder')
      .then(elements => {
        for (let index = 0; index < elements.length; index++) {
          const element = elements[index];
          element.scrollIntoView();
          if (!Cypress.dom.isHidden(element)) {
            return element;
          }
        }
        return elements[0];
      })
      .click()
      .getSyncPoint()
};
