import {LoginPage} from "../pages/LoginPage";
import {UserService} from "../support/services/user-service";
import {UserType} from "../support/model/User";
import {TransferFundsPage} from "../pages/TransferFundsPage";
import {TransferFundsService} from "../support/services/transfer-funds-service";
import {OverviewPage} from "../pages/OverviewPage";
import {NewAccountPage} from "../pages/NewAccountPage";

describe('Transfer funds between owned accounts', () => {

    let loginPage: LoginPage;
    let transferFundsPage: TransferFundsPage;
    let newAccountPage: NewAccountPage;
    let overviewPage: OverviewPage;

    let userService: UserService;
    let transferFundsService: TransferFundsService;

    let currentUserId: number;
    let defaultUserAccountId: number;
    let newCheckingAccountId: number;

    before(() => {
        userService = new UserService();
        cy.fixture('users.json').then(userData => {
            userService.seedData(userData.testUser);
        });

        loginPage = new LoginPage(UserType.testUser);
        newAccountPage = new NewAccountPage();
        overviewPage = new OverviewPage();

        loginPage.loggedInUserId.subscribe(userId => currentUserId = userId);
        loginPage.userDefaultAccountId.subscribe(accountId => defaultUserAccountId = accountId);

        newAccountPage.goToPage();
        newAccountPage.createNewAccount('CHECKING');
        newAccountPage.returnNewAccountNumber().then(result => newCheckingAccountId = result);

        loginPage.logout();
    })

    beforeEach(() => {
        loginPage.login();

        transferFundsPage = new TransferFundsPage();
        transferFundsService = new TransferFundsService();
    })

    after(() => {
        userService.resetData();
    })

    it('TF001 - user can transfer funds from one account to another', () => {
        transferFundsService.transfer(defaultUserAccountId, newCheckingAccountId, 123)
            .then(response => {
                transferFundsService.verifyResponseStatus(response, 200);
            })
    });

    it('TF002 - user is allowed to overdaft on their account', () => {
        overviewPage.goToPage();
        overviewPage.getBalanceForAccount(newCheckingAccountId).then((balanceForAccount) => {
            const amountToTransfer = balanceForAccount + 1000;
            transferFundsService.transfer(newCheckingAccountId, defaultUserAccountId, amountToTransfer);
            transferFundsService.verifyBalance(newCheckingAccountId, -1000);
        })
    });

    it('TF003 - overdraft is displayed as a negative balance on the overview page', () => {
        overviewPage.goToPage();
        overviewPage.getBalanceForAccount(defaultUserAccountId).then((balanceForAccount) => {
            const amountToTransfer = balanceForAccount + 1000;
            transferFundsPage.goToPage();
            transferFundsPage.selectFromAccountId(defaultUserAccountId.toString());
            transferFundsPage.selectToAccountId(newCheckingAccountId.toString());
            transferFundsPage.setAmount(amountToTransfer);
            transferFundsPage.doTransfer();

            overviewPage.goToPage();
            overviewPage.getBalanceForAccount(defaultUserAccountId).then((balanceForAccount) => {
                expect(balanceForAccount).eq(-1000);
            })
        })
    });

    it('TF004 - transferring funds fails when source and target account are the same', () => {
        transferFundsService.transfer(defaultUserAccountId, defaultUserAccountId, 123)
            .then(response => {
                transferFundsService.verifyResponseStatus(response, 422);
            })
    });

    it('TF005 - UI block transfer request when source and target account are the same', () => {
        transferFundsPage.goToPage();
        transferFundsPage.selectFromAccountId(defaultUserAccountId.toString());
        transferFundsPage.selectToAccountId(defaultUserAccountId.toString());

        transferFundsPage.verifySubmitButtonDisabled();
    });
})