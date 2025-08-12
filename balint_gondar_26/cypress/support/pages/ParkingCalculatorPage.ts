import { ParkingLotSelectors, TestData } from '../types';

import { TestUtils } from '../utils/TestUtils';

export class ParkingCalculatorPage {
  private readonly selectors: ParkingLotSelectors = {
    parkingLot: '#parkingLot',
    entryDate: 'input[placeholder="Entry Date"]',
    exitDate: 'input[placeholder="Exit Date"]',
    entryTime: 'input[placeholder="Entry Time"]',
    exitTime: 'input[placeholder="Exit Time"]',
    calculateButton: 'button:contains("Calculate Cost")'
  };



  visit(): void {
    cy.visit('/');
  }

 
  selectParkingLot(lot: string): void {
    cy.get(this.selectors.parkingLot).select(lot);
  }

 
  fillEntryDateTime(date: string, time: string): void {
    cy.get(this.selectors.entryDate).clear().type(date);
    // Calendar disappears
    TestUtils.clickBodyToCloseCalendar();
    cy.get(this.selectors.entryTime).clear().type(time);
    TestUtils.clickBodyToCloseCalendar();
  }


  fillExitDateTime(date: string, time: string): void {
    cy.get(this.selectors.exitDate).clear().type(date, { force: true });
    TestUtils.clickBodyToCloseCalendar();
    cy.get(this.selectors.exitTime).clear().type(time);
    TestUtils.clickBodyToCloseCalendar();
  }


  calculateCost(): void {
    cy.contains('Calculate Cost').click({ force: true });
  }


  fillAllFields(testData: TestData): void {
    this.selectParkingLot(testData.parkingLot);
    this.fillEntryDateTime(testData.entryDate, testData.entryTime);
    this.fillExitDateTime(testData.exitDate, testData.exitTime);
  }


  verifyCostCalculation(cost: number, days: number, hours: number, minutes: number): void {
    cy.contains(`${cost}.00€`).should('exist');
    cy.contains(`${days} Day(s), ${hours} Hour(s), ${minutes} Minute(s)`).should('exist');
  }


  getDayRateFromUI(parkingLot: string): Cypress.Chainable<number> {
    return cy.contains('.card-header', parkingLot)
      .parent()
      .find('.card-block li')
      .first()
      .invoke('text')
      .then((rateText: string) => {
        //  "18€ per day" -> 18
        return parseFloat(rateText);
      });
  }


  verifyCalculationSuccess(): void {
    cy.contains('€').should('exist');
    cy.get('body').should('contain.text', '€');
    cy.get('body').should('contain.text', 'Hour(s)');
  }
}
