import { componentSelectors } from '@support/component.selectors';
import { cookieControl } from '@support/components';
import navigatie from '@support/navigatie';
import stringInput from '@support/views/content-components/string-input';

describe('intro', () => {
  it('It should go through the intro flow', () => {
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

  it.only('It should go through the intro flow - Result', () => {
    cy.visit('nl/Opstart Eenmanszaak');

    cookieControl.accept();
    navigatie.startAanbod();

    navigatie.verder();

    stringInput.fill('John');
    stringInput.next();

    stringInput.fill('Doe');
    stringInput.next();

    stringInput.fill('', true);
    stringInput.next();
  });
});
