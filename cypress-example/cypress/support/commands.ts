// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// tslint:disable-next-line: no-namespace
declare namespace Cypress {
  interface Chainable<Subject> {
    getBy: typeof getBy;
    getNestedBy: typeof getNestedBy;
    syncPointShouldBe: typeof syncPointShouldBe;
    getSyncPoint: typeof getSyncPoint;
    waitForStatus: typeof waitForStatus;
    elementIsCovered: typeof elementIsCovered;
    loginForApplication: typeof loginForApplication;
  }
}

const dataAutomationIdAttr = 'data-automation-id';

function getBy(
  automationId: string,
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable> | undefined
) {
  return cy.get(`[${dataAutomationIdAttr}="${automationId}"]`, options);
}

function getNestedBy(automationIds: string[]) {
  let selector = '';
  automationIds.forEach(id => {
    selector += `[${dataAutomationIdAttr}="${id}"] `;
  });
  return cy.get(selector);
}

function waitForStatus(alias: string, status: number) {
  return cy.wait(alias).should(xhr => expect(xhr.status).to.equal(status, `status code mismatch`));
}

function getSyncPoint(timeout = 10000) {
  return cy.getBy('xer-sync-point', { timeout });
}

function syncPointShouldBe(naam: string, timeout = 10000) {
  return getSyncPoint(timeout).should('have.html', naam);
}

/**
 * Check if an element is coverd by an element.
 *
 * NOTE: As Cypress lacks this functionality we try to click an element and watch it fail.
 * This causes a small wait time of about 3 sec.
 *
 * @param automationId
 * @param done
 */
function elementIsCovered(automationId: string, done: Mocha.Done) {
  cy.getBy(automationId).click();
  cy.once('fail', error => {
    expect(error.message).to.include('cy.click() failed because this element');
    expect(error.message).to.include('is being covered by another element');
    done();
  });
  cy.getBy(automationId)
    .click()
    .then(() => {
      done(new Error('Expected element to be covered by another element, but it was visible'));
    });
}

/**
 * This command mimics the authentication flow of identify server with api requests
 * so the proper cookies are set to login to an application.
 *
 * NOTE: Only tested for Aanvraagbeheer
 *
 * Login flows:
 * 3: Normal login
 *  - Navigate to application -> Redirect to login
 *  - POST login with credentials -> redirect to identity.azurewebsites.net/connect/authorize
 *  - Gets form with required claims -> POST to appliaction domain
 *
 * 2: Refresh
 *  - Navigate to application -> redirect to identity.azurewebsites.net/connect/authorize
 *  - Gets form with required claims -> POST to appliaction domain
 *
 * 1: Already logged in
 *  - This case should not happen as cookies are always cleared.
 */
function loginForApplication(applicationBaseUrl: string, username: string, password: string) {
  const domParser = new DOMParser();

  return cy
    .request({
      url: applicationBaseUrl,
      method: 'GET',
      followRedirect: true
    })
    .then(response => {
      switch (response.allRequestResponses.length) {
        case 3:
          cy.log('login Requirement Detected');
          const loginResponse = response.allRequestResponses[2];
          const parsedHtml = domParser.parseFromString(loginResponse['Response Body'], 'text/html');
          const formAction = loginResponse['Request URL'];
          const inputs = parsedHtml.getElementsByTagName('input') as any;
          const postBody: any = { username, password };
          for (let input of inputs) {
            if (input.getAttribute('type') === 'hidden') {
              postBody[input.getAttribute('name')] = input.getAttribute('value');
            }
          }

          return cy.request({
            url: formAction,
            method: 'POST',
            form: true,
            body: postBody,
            followRedirect: true
          });
        case 2:
          cy.log('Refresh authentication Detected');
          return cy.then(_ => response.allRequestResponses[1]);
        case 1:
          cy.log('No login required');
          return undefined;
        default:
          return undefined;
      }
    })
    .then((response: any) => {
      if (!response) {
        return undefined;
      } else if (!response.redirects) {
        // Pass body for refresh authentication
        return cy.then(_ => ({
          body: response['Response Body']
        }));
      }
      const redirectValue = response.redirects[0] as string;
      const redirectUrl = redirectValue.substr(redirectValue.indexOf(': ') + 2);

      return cy.request({
        url: redirectUrl,
        method: 'GET',
        followRedirect: true
      });
    })
    .then(response => {
      if (!response) {
        return undefined;
      }

      const parser = new DOMParser();
      const parsedResponse = parser.parseFromString(response.body, 'text/html');
      const postAction = parsedResponse
        .getElementsByTagName('form')[0]
        .getAttribute('action') as string;
      const inputs = parsedResponse.getElementsByTagName('input') as any;

      const postBody: any = {};
      for (let element of inputs) {
        element = element as any;
        postBody[element.getAttribute('name')] = element.getAttribute('value');
      }

      return cy.request({
        url: postAction,
        method: 'POST',
        form: true,
        body: postBody,
        followRedirect: false
      });
    });
}

Cypress.Commands.add('getBy', getBy);
Cypress.Commands.add('getNestedBy', getNestedBy);
Cypress.Commands.add('getSyncPoint', getSyncPoint);
Cypress.Commands.add('syncPointShouldBe', syncPointShouldBe);
Cypress.Commands.add('waitForStatus', waitForStatus);
Cypress.Commands.add('elementIsCovered', elementIsCovered);
Cypress.Commands.add('loginForApplication', loginForApplication);
