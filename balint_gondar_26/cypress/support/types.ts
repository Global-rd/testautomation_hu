// API Response típusok
export interface ParkingCalculationResponse {
  cost: number;
  days: number;
  hours: number;
  minutes: number;
}

export interface ParkingCalculationRequest {
  parkType: string;
  entryDate: string;
  exitDate: string;
}

// UI Selector típusok
export interface ParkingLotSelectors {
  parkingLot: string;
  entryDate: string;
  exitDate: string;
  entryTime: string;
  exitTime: string;
  calculateButton: string;
}

// Test Data típusok
export interface TestData {
  parkingLot: string;
  entryDate: string;
  exitDate: string;
  entryTime: string;
  exitTime: string;
}

// Cypress Command típusok
declare global {
  namespace Cypress {
    interface Chainable {
      selectParkingLot(lot: string): Chainable<void>;
      fillEntryDateTime(date: string, time: string): Chainable<void>;
      fillExitDateTime(date: string, time: string): Chainable<void>;
      calculateCost(): Chainable<void>;
      verifyCostCalculation(cost: number, days: number, hours: number, minutes: number): Chainable<void>;
      getDayRateFromUI(parkingLot: string): Chainable<number>;
      interceptParkingCalculation(): Chainable<void>;
    }
  }
}
