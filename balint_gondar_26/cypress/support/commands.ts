import { ParkingApiService } from './services/ParkingApiService';
import { ParkingCalculatorPage } from './pages/ParkingCalculatorPage';
import { TestDataFactory } from './factories/TestDataFactory';
import { TestUtils } from './utils/TestUtils';

// Custom commands
Cypress.Commands.add('selectParkingLot', (lot: string) => {
  const page = new ParkingCalculatorPage();
  page.selectParkingLot(lot);
});

Cypress.Commands.add('fillEntryDateTime', (date: string, time: string) => {
  const page = new ParkingCalculatorPage();
  page.fillEntryDateTime(date, time);
});

Cypress.Commands.add('fillExitDateTime', (date: string, time: string) => {
  const page = new ParkingCalculatorPage();
  page.fillExitDateTime(date, time);
});

Cypress.Commands.add('calculateCost', () => {
  const page = new ParkingCalculatorPage();
  page.calculateCost();
});

Cypress.Commands.add('verifyCostCalculation', (cost: number, days: number, hours: number, minutes: number) => {
  const page = new ParkingCalculatorPage();
  page.verifyCostCalculation(cost, days, hours, minutes);
});

Cypress.Commands.add('getDayRateFromUI', (parkingLot: string) => {
  const page = new ParkingCalculatorPage();
  return page.getDayRateFromUI(parkingLot);
});

Cypress.Commands.add('interceptParkingCalculation', () => {
  TestUtils.interceptParkingCalculation();
});

// Global types are already defined in types.ts
