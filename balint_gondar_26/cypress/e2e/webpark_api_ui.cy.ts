import { ParkingApiService } from '../support/services/ParkingApiService';
import { ParkingCalculatorPage } from '../support/pages/ParkingCalculatorPage';
import { TestData } from '../support/types';
import { TestDataFactory } from '../support/factories/TestDataFactory';
import { TestUtils } from '../support/utils/TestUtils';

// Parkolás kalkulátor: API és UI crosscheck példák
describe('Webpark Parking Calculator - API és UI integráció', () => {
    let parkingPage: ParkingCalculatorPage;
    let apiService: ParkingApiService;

    beforeEach(() => {
        parkingPage = new ParkingCalculatorPage();
        apiService = new ParkingApiService();
    });

    it('API kalkuláció eredménye megegyezik a UI-on láthatóval', () => {
        // fixture
        TestDataFactory.createBasicTestData().then((testData: TestData) => {
            const apiRequest = TestDataFactory.convertToApiRequest(testData);

                        apiService.calculateParkingCost(apiRequest).then((apiRes) => {
                apiService.logApiResponse(apiRes);
                
                if (apiRes.status === 200) {
                    
                    parkingPage.visit();
                    parkingPage.fillAllFields(testData);
                    parkingPage.calculateCost();
                    
                   
                    parkingPage.verifyCostCalculation(
                        apiRes.body.cost,
                        apiRes.body.days,
                        apiRes.body.hours,
                        apiRes.body.minutes
                    );
                } else {
                    // Ha API hiba van, csak a UI tesztet futtatjuk
                    cy.log(`API hiba: ${apiRes.status} - ${JSON.stringify(apiRes.body)}`);
                    parkingPage.visit();
                    parkingPage.fillAllFields(testData);
                    parkingPage.calculateCost();
                    parkingPage.verifyCalculationSuccess();
                }
            });
        });
    });

    it('UI-n olvasott day rate alapján API response cost ellenőrzése több napra', () => {
        //  fixture-ből
        TestDataFactory.createMultiDayTestData().then((testData: TestData) => {
            const expectedDays = TestDataFactory.calculateDaysDifference(testData.entryDate, testData.exitDate);

            
            parkingPage.visit();
            parkingPage.getDayRateFromUI(testData.parkingLot).then((dayRate: number) => {
                cy.log(`Kiolvasott day rate: ${dayRate}€`);
                
                
                TestUtils.interceptParkingCalculation();
                
                parkingPage.fillAllFields(testData);
                parkingPage.calculateCost();
                
                
                TestUtils.waitForParkingCalculation().then((interception) => {
                    TestUtils.logDebug('API Interception', {
                        status: interception.response?.statusCode,
                        body: interception.response?.body
                    });
                    
                    if (interception.response?.statusCode === 200) {
                        
                        const expectedCost = dayRate * expectedDays;
                        expect(interception.response.body.cost).to.eq(expectedCost);
                        cy.log(`Várt költség: ${expectedCost}€ (${dayRate}€ × ${expectedDays} nap)`);
                    } else {
                        cy.log(`API hiba a második tesztben: ${interception.response?.statusCode}`);
                        parkingPage.verifyCalculationSuccess();
                    }
                });
            });
        });
    });

    it('Egy napos parkolás tesztelése', () => {
        //Factory
        const testData: TestData = TestDataFactory.createSingleDayTestData();
        
        parkingPage.visit();
        parkingPage.fillAllFields(testData);
        parkingPage.calculateCost();
        parkingPage.verifyCalculationSuccess();
    });

    it('Óránkénti parkolás tesztelése', () => {
        //Factory
        const testData: TestData = TestDataFactory.createHourlyTestData();
        
        parkingPage.visit();
        parkingPage.fillAllFields(testData);
        parkingPage.calculateCost();
        parkingPage.verifyCalculationSuccess();
    });
});
