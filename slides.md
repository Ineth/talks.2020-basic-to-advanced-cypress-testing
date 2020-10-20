---
title: Cypress
separator: <!--s-->
verticalSeparator: <!--v-->
theme: solarized
revealOptions:
  transition: fade
---

<img src="img/cypress-logo.png" style="background:none; border:none; box-shadow:none; filter: invert(100%);">

Testing for Modern Web Apps

Note: [cypress.io](https://www.cypress.io/)

Alle demo's werden op basis van de Bruto-Netto repo gemaakt.

<!--s-->

## Agenda

- Algemeen

  - Wat is Cypress
  - Cypress VS Selenium
  - Demo

<!--v-->

## Agenda

- Technisch
  - Werking
  - Installatie
  - Test mogelijkheden
  - CI

<!--s-->

## Wat is Cypress?

- Javascript E2E, Unit & Integratie Testing framework
- Gemaakt voor alles in de browser
- Voor developers & test engineers

<!--v-->

### Hun doel

- _**Altijd**_ gratis en open source
- Toegankelijke UI testing
- Developer happiness 😍

Note: [Why Cypress](https://docs.cypress.io/guides/overview/why-cypress.html)

<!--s-->

## Cypress VS Selenium

<!--v-->

## Voordelen

- Sneller
- Component/Unit testing
- Eenvoudig debuggen prioriteit
- Interactief (Time travel)
- _**Volledige**_ browser controle
- Automatisch wachten
- Automatisch screenshots & videos
- Geen externe browser dependencies

<!--v-->

## Nadelen

- _**Nog**_ geen cross-browser support
- Geen multi browser tab support
- Minder geschikt over meerdere applicaties heen te werken

Note: support voor IE, FF, Edge in de maak

<!--s-->

## Demo

```bash
git checkout cypress-talk/general-demo
npm run demo
```

Note: [Features](https://www.cypress.io/features/)

<!--s-->

# Technisch

<!--v-->

## Agenda

- Technisch
  - Werking
  - Installatie
  - Test mogelijkheden
  - CI

<!--s-->

## Werking

<!--v-->

### Selenium

![selenium-webdriver-architecture](img/selenium-webdriver-architecture.png)

- Werkt buiten de browser
- Voert commands uit via netwerk

Note: [source](https://applitools.com/blog/cypress-vs-selenium-webdriver-better-or-just-different)

<!--v-->

### Cypress

![cypress-architecture](img/cypress-architecture.png)

<!--v-->

- Leeft in de browser
- Volledige controle over:
  - Netwerk verkeer
  - Local storage/cookies
  - Applicatie state
  - ...
- Geen compiler tussenstap

Note: [Cypress architecture](https://docs.cypress.io/guides/overview/key-differences.html#Architecture)
[How it works](https://www.cypress.io/how-it-works/)

<!--s-->

## Installatie

Note: [Installatie](https://docs.cypress.io/guides/getting-started/installing-cypress.html)

<!--v-->

## Cypress

```bash
  npm install cypress --save-dev
```

### Commands

```json
// package.json

"scripts": {
  ...
  "cy-open": "cypress open",
  "cy-run": "cypress run",
}
```

<!--v-->

## Typescript support

File Preprocessor

```bash
npm install @bahmutov/add-typescript-to-cypress --save-dev
```

TSCONFIG

```json
// cypress/.tsconfig
{
  "extends": "../tsconfig",
  "compilerOptions": {
    "baseUrl": "../node_modules",
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress"]
  },
  "include": ["**/*.ts"]
}
```

Note: [Typescript support](https://docs.cypress.io/guides/tooling/typescript-support.html#Transpiling-TypeScript-test-files)

<!--v-->

Update Support files

![js-to-ts](img/js-to-ts.png)

Update config

```json
// cypress.json
...
"supportFile": "./cypress/support/index.ts",
...
```

<!--s-->

## Test mogelijkheden

<!--v-->

### All-in-one Test Library

standaard ondersteuning voor:

- Mocha
- Chai
- Sinon
- Sinon-Chai

Note: [Bundled Tools](https://docs.cypress.io/guides/references/bundled-tools.html)

<!--v-->

Standaard Utility libraries:

- lodash
- jQuery
- minimatch.js
- moment.js
- blob utils

Note: [Utilities](https://docs.cypress.io/guides/references/bundled-tools.html#Other-Library-Utilities)

<!--v-->

## Demo

```bash
git checkout cypress-talk/writing-tests-demo-0
npm run demo
```

Note: http://localhost:4202

<!--v-->

```Typescript
describe('collapse component', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('Should show the collapse body when the header is clicked', () => {
    // Act
    cy.get('[data-cy=profiel-header]').click();

    // Assert
    cy.get('[data-cy=profiel-body]').should('be.visible');
  });

  it('Should hide the collapse body when the header is clicked', () => {
    // Arrange
    cy.get('[data-cy=profiel-header]').click();

    // Act
    cy.get('[data-cy=profiel-header]').click();

    // Assert
    cy.get('[data-cy=profiel-body]').should('not.exist');
  });
});
```

<!--v-->

## Custom Commands

<!--v-->

## Demo

```bash
git checkout cypress-talk/writing-tests-demo-1
npm run demo
```

<!--v-->

![commands](img/cypress-commands.png)

GetBy (data-cy attribute)

```Typescript
// commands.ts
...
function getBy(cyName: string): Cypress.Chainable<JQuery> {
  return cy.get(`[data-cy=${cyName}]`);
}
...
```

<!--v-->

## Register command

```typescript
// commands.ts

// Define the function on type for intelliSense to find it
declare namespace Cypress {
  interface Chainable<Subject> {
    getBy: typeof getBy;
  }
}

function getBy(cyName: string): Cypress.Chainable<JQuery> {
  return cy.get(`[data-cy=${cyName}]`);
}

// Add the function as custom Command
Cypress.Commands.add("getBy", getBy);
```

<!--v-->

## Route Check <!-- & Stubbing -->

<!--v-->

## Demo

<a target="_blank" href="http://ta-zeno.xeriusgroup.be">Zeno</a>

```bash
git checkout cypress-talk/route-checking
npm run demo
```

<!--v-->

```Typescript
describe('Zeno - Identificatie Lei entiteit', () => {
  describe('selectie functiehouder', () => {
    beforeEach(() => {
      cy.server(); // Start server
      cy.route({
        method: 'POST',
        url: '/*/IdentificatieLeiEntiteit/KboRaadplegen**',
        status: 200
      }).as('kboRaadplegen'); // Define route to watch for

      cy.visit('http://ta-zeno.xeriusgroup.be/');
      cy.get('[data-automation-id="Z-Index-a-636761615049713107"]').click();
    });

    it('Identifie met KBO nummer als bevoegde met functiehouders should only show functiehouder selectie', () => {
      cy.get('#ondernemingsnummer').type('0700278137');
      cy.get('#btn-kbo-raadplegen')
        .click()
        .wait('@kboRaadplegen'); //Wait and check for a completed call

      cy.getBy('aanvrager-type-bevoegd').click();

      cy.get('#aanvrager-functiehouder').should('be.visible');
    });
  });
});
```

Note: [Routes](https://docs.cypress.io/api/commands/route.html)

<!--v-->

## Local Storage/Cookie Preset

<!--v-->

## Demo

```bash
git checkout cypress-talk/cookie-demo
npm run demo
```

<!--v-->

```Typescript
describe('Login to my xerius desk', () => {
  beforeEach(() => {
    // Reset before each run
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Open Xerius Desk as al@vidam.be without login', () => {
    cy.setCookie(
      'XeriusPartnerPortal',
      'E-8ZRhvmNubY...',
      { domain: 'acc-desk.xerius.be' }
    );
    cy.setCookie('idsrvlanguagecookie', 'nl-BE', { domain: 'acc-desk.xerius.be' });

    cy.visit('https://acc-desk.xerius.be');
  });
});

```

<!--v-->

## Application manipulation

<!--v-->

## Demo

```bash
git checkout cypress-talk/application-manipulation
npm run demo
```

<!--v-->

Test

```Typescript
describe('Persoonsgegevens', () => {
    let store: Store;
    beforeEach(() => {
      cy.visit('');
      cy.window().then(win => {
        // Get exposed angular services from window
        store = (win as any).ngServices.store;
      });
    });

    it('It should show the current persoonsgegevens when clicking the user btn', () => {
      const persoonsgegevens = {
        voornaam: 'appel',
        naam: 'boom',
        email: 'appel.boom@fruit.be'
      };

      store.reset({
        ...
      });

      cy.getBy('btn-profiel').click();

      cy.get('.naam').should('have.value', persoonsgegevens.naam);
      cy.getBy('voornaam').should('have.value', persoonsgegevens.voornaam);
      cy.get('.email').should('have.value', persoonsgegevens.email);
    });
  });
```

<!--v-->

Expose services

```Typescript
// app.component.ts

@Component({
  selector: 'xer-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  constructor(
    store: Store,
    ...
  ) {
    ...

    exposeE2eTestingServices({ store });
  }
}
```

<!--v-->

exposeE2eTestingServices

```Ts
import { environment } from '@xer-environment';
import { ExposedE2eServicesModel } from './models/exposed-e2e-services.model';

export function exposeE2eTestingServices(exposedServices: ExposedE2eServicesModel) {
  if (environment.exposeE2eTestingServices) {
    (window as any).ngServices = exposedServices;
  }
}

```

<!--s-->

## Continuous Integration

Bruto-Netto

<!--v-->

## Doel

- UI tests uitvoeren voor code in PR
- Test resultaten importeren
- Screenshots/recordings uploaden

<!--v-->

## praktisch

- Testen uitvoeren als deel van de pipe
- Op een productie build
- Zonder afzonderlijke server deploy
- Gebruik dev API

⚠️Geen blijvende data manipulatie uitvoeren ⚠️<!-- .element: class="fragment" -->

Note: ideaal voor compoment testing

<!--v-->

## Productie build

Voorzien van "cypress" build configuratie die:

- Productie build maakt
- Standaard connectie naar bv. dev omgeving APIs
- Afzonderlijke output folder

```json
// package.json - scripts

"start-cy": "ng serve --configuration=cy",
...
"build-cy": "npm run build -- --configuration=cy",

```

Note: Afzonderlijke map zodat deze niet wordt gebundeld als artifact van een build.

<!--v-->

## Lokale http-server

### Installatie

```bash
npm install http-server --save-dev
```

### script

```json
// package.json - scripts

 "start-ci": "http-server <your-output-dir> -a localhost -p 4202 -c-1",
```

Note: [http-server](https://github.com/indexzero/http-server)

<!--v-->

## Huidige Commands

```JS
// package.json - scripts

// Create production build with Cypress environment configuration
"build-cy": "npm run build -- --configuration=cy",

// Start a local http server serving the build-cy output
"start-ci": "http-server <your-output-dir> -a localhost -p 4202 -c-1",

// Run cypress tests headless
"cy-run": "cypress run",

```

<!--v-->

## Running Parallel Commands

```bash
npm install npm-run-all --save-dev
```

### cy-ci

```JS
"cy-ci": "npm run build-cy && npm run cy-verify && run-p --race start-ci cy-run"

/*
  1. npm run build-cy   => create build-cy output
  2. npm run cy-verify  => verify cypress installation (as CI installs this for the first time)
  3. run-p              => run the following commands in paralell
    start-ci      => start application cy build on local http-server
    cy-run        => run cypress tests
    --race        => Terminate all tasks when one finishes
*/
```

<!--v-->

## VSTS BUILD

![build-steps](img/vsts-steps.png)

1. Run **npm run cy-ci**
2. Publish JUnit test results
3. Publish Screenshots/recordings

<a target="_blank" href="https://xeriusit.visualstudio.com/SVZ-OL/_build/results?buildId=69313">Bruto-Netto build</a>
