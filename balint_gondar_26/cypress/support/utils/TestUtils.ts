export class TestUtils {

  static wait(ms: number): void {
    cy.wait(ms);
  }


  static verifyElementVisible(selector: string): void {
    cy.get(selector).should('be.visible');
  }


  static verifyElementExists(selector: string): void {
    cy.get(selector).should('exist');
  }

  
  static verifyTextContains(text: string): void {
    cy.contains(text).should('exist');
  }

  
  static clickBodyToCloseCalendar(): void {
    cy.get('body').click(0, 0);
  }

  
  static interceptParkingCalculation(): void {
    cy.intercept('POST', Cypress.env('apiUrl')).as('calcCost');
  }

 
  static waitForParkingCalculation(): Cypress.Chainable<any> {
    return cy.wait('@calcCost');
  }

 
  static verifyApiSuccess(interception: any): void {
    expect(interception.response?.statusCode).to.eq(200);
  }


  static logDebug(message: string, data?: any): void {
    if (data) {
      cy.log(`${message}: ${JSON.stringify(data)}`);
    } else {
      cy.log(message);
    }
  }
}
