import {LoginPage} from "../pages/LoginPage";
import {UserService} from "../support/services/user-service";
import {UserType} from "../support/model/User";
import {RequestLoanPage} from "../pages/RequestLoanPage";
import {RequestLoanService} from "../support/services/request-loan-service";

describe('Request loan', () => {

    let loginPage: LoginPage;
    let requestLoanPage: RequestLoanPage;

    let userService: UserService;
    let requestLoanService: RequestLoanService;

    let currentUserId: number;
    let defaultUserAccountId: number;

    before(() => {
        userService = new UserService();
        cy.fixture('users.json').then(userData => {
            userService.seedData(userData.testUser);
        });

        loginPage = new LoginPage(UserType.testUser);

        loginPage.loggedInUserId.subscribe(userId => currentUserId = userId);
        loginPage.userDefaultAccountId.subscribe(accountId => defaultUserAccountId = accountId);

        loginPage.logout();
    })

    beforeEach(() => {
        loginPage.login();

        requestLoanPage = new RequestLoanPage();
        requestLoanService = new RequestLoanService();
    })

    after(() => {
        userService.resetData();
    })

    it('RL001 - user can request loan filling out downpayment and loan amount', () => {
        requestLoanPage.goToPage();
        requestLoanPage.setLoanAmount(123);
        requestLoanPage.selectAccount(defaultUserAccountId);
        requestLoanPage.setDownPayment(123);
        requestLoanPage.verifyButtonState(true);
        requestLoanPage.applyForLoan();
        requestLoanPage.verifyLoanStatus('Approved');
    });

    it('RL002 - user can request loan filling out only downpayment', () => {
        requestLoanService.requestLoan(currentUserId, defaultUserAccountId, 123, null).then((response) => {
            requestLoanService.verifyResponseStatus(response, 200);
        })
    });

    it('RL003 - user can request loan filling out only loan amount', () => {
        requestLoanService.requestLoan(currentUserId, defaultUserAccountId, null, 123).then((response) => {
            requestLoanService.verifyResponseStatus(response, 200);
        })
    });
})