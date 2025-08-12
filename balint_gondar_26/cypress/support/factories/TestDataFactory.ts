import { ParkingCalculationRequest, TestData } from '../types';

export class TestDataFactory {

  static createBasicTestData(): Cypress.Chainable<TestData> {
    return cy.fixture('parkingTestData').then((data) => data.basicTest);
  }


  static createMultiDayTestData(): Cypress.Chainable<TestData> {
    return cy.fixture('parkingTestData').then((data) => data.multiDayTest);
  }


  static createSingleDayTestData(): TestData {
    return {
      parkingLot: 'Valet Parking',
      entryDate: '2025-10-21',
      exitDate: '2025-10-21',
      entryTime: '16:11',
      exitTime: '23:59'
    };
  }


  static createHourlyTestData(): TestData {
    return {
      parkingLot: 'Valet Parking',
      entryDate: '2025-10-21',
      exitDate: '2025-10-21',
      entryTime: '16:00',
      exitTime: '17:00'
    };
  }


  static createDynamicMultiDayTestData(days: number): TestData {
    const entryDate = new Date('2025-10-21');
    const exitDate = new Date(entryDate);
    exitDate.setDate(entryDate.getDate() + days);

    return {
      parkingLot: 'Valet Parking',
      entryDate: this.formatDate(entryDate),
      exitDate: this.formatDate(exitDate),
      entryTime: '16:11',
      exitTime: '16:11'
    };
  }


  static convertToApiRequest(testData: TestData): ParkingCalculationRequest {
    return {
      parkType: testData.parkingLot,
      entryDate: `${testData.entryDate}T${testData.entryTime}`,
      exitDate: `${testData.exitDate}T${testData.exitTime}`
    };
  }


  private static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  static calculateDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }
}
