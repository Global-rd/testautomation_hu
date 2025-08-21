
export abstract class BaseService {

    verifyResponseStatus(response: Cypress.Response<any>, statusCode: number): void {
        expect(response.status).to.eq(statusCode);
    };

    verifyResponseProperty(response: Cypress.Response<any>, property: string): void {
        expect(response.body).to.have.property(property);
    }

    verifyResponseMessage(response: Cypress.Response<any>, message: string): void {
        expect(response.body).to.eq(message);
    }
}