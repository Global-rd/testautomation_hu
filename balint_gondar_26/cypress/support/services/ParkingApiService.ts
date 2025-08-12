import { ParkingCalculationRequest, ParkingCalculationResponse } from '../types';

export class ParkingApiService {
  private readonly baseUrl = 'https://practice.expandtesting.com/webpark';
  private readonly calculateCostEndpoint = '/calculate-cost';


  calculateParkingCost(request: ParkingCalculationRequest): Cypress.Chainable<Cypress.Response<ParkingCalculationResponse>> {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}${this.calculateCostEndpoint}`,
      form: true,
      body: request,
      failOnStatusCode: false
    });
  }


  verifyApiResponseSuccess(response: Cypress.Response<ParkingCalculationResponse>): void {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('cost');
    expect(response.body).to.have.property('days');
    expect(response.body).to.have.property('hours');
    expect(response.body).to.have.property('minutes');
  }


  logApiResponse(response: Cypress.Response<ParkingCalculationResponse>): void {
    cy.log(`API Status: ${response.status}`);
    cy.log(`API Response: ${JSON.stringify(response.body)}`);
  }


  verifyApiResponseValues(
    response: Cypress.Response<ParkingCalculationResponse>,
    expectedCost: number,
    expectedDays: number
  ): void {
    expect(response.body.cost).to.eq(expectedCost);
    expect(response.body.days).to.eq(expectedDays);
  }
}
