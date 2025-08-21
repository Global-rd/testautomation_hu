import {UserType} from "../support/model/User";
import {LoginPage} from "../pages/LoginPage";
import {OverviewPage} from "../pages/OverviewPage";
import {NewAccountPage} from "../pages/NewAccountPage";
import {UserService} from "../support/services/user-service";
import {NewAccountService} from "../support/services/new-account-service";
import {AccountType} from "../support/model/Account";
import {AccountDetailsPage} from "../pages/AccountDetailsPage";

describe('Opening new account for user', () => {

    let loginPage: LoginPage;
    let overviewPage: OverviewPage;
    let newAccountPage: NewAccountPage;
    let accountDetailsPage: AccountDetailsPage;

    let userService: UserService;
    let newAccountService: NewAccountService;

    let newCheckingAccountId: number;
    let newSavingsAccountId: number;
    let currentUserId: number;
    let defaultUserAccountId: number;

    before(() => {
        userService = new UserService();
        cy.fixture('users.json').then(userData => {
            userService.seedData(userData.testUser);
        });

        loginPage = new LoginPage(UserType.testUser);
        overviewPage = new OverviewPage();
        newAccountPage = new NewAccountPage();
        newAccountService = new NewAccountService();

        loginPage.login();

        loginPage.loggedInUserId.subscribe(userId => currentUserId = userId);
        loginPage.userDefaultAccountId.subscribe(accountId => defaultUserAccountId = accountId);

        loginPage.logout();
    })

    beforeEach(() => {
        loginPage.login();
    })

    it('OA001 - registered user is allowed to open a new checking account', () => {
        newAccountService.createNewAccount(currentUserId, AccountType.CHECKING, defaultUserAccountId)
            .then(response => {
                cy.log('new account created');
                newAccountService.verifyAccountCreated(response, currentUserId, AccountType.CHECKING);
            })
    });

    it('OA002 - registered user can open new checking account using UI', () => {
        overviewPage.verifyPageUrl();
        overviewPage.goToNewAccount();
        newAccountPage.verifyPageUrl();
        newAccountPage.createNewAccount('CHECKING');
        newAccountPage.verifyOpenAccountResult('Account Opened!');
        newAccountPage.returnNewAccountNumber().then(result => newCheckingAccountId = result);
    });

    it('OA003 - new account displays default balance', () => {
        cy.fixture('default.json').then(result => {
            accountDetailsPage = new AccountDetailsPage(newCheckingAccountId);
            accountDetailsPage.openPage();
            accountDetailsPage.verifyAccountMatch(newCheckingAccountId, AccountType.CHECKING,
                `${result.newAccountCurrency}${result.newAccountBalance.toFixed(2)}`);
        })
    });


    it('OA004 - new account has default balance', () => {
        cy.fixture('default.json').then(result => {
            newAccountService.verifyAccountExists(newCheckingAccountId, result.newAccountBalance, AccountType.CHECKING)
        })

    });

    it('OA005 - new account listed on Account Overview page', () => {
        cy.fixture('default.json').then(result => {
            overviewPage.goToPage();
            overviewPage.verifyAccountPresent(newCheckingAccountId, `${result.newAccountCurrency}${result.newAccountBalance.toFixed(2)}`);
        })

    });

    it('OA006 - registered user is allowed to open a new savings account', () => {
        newAccountService.createNewAccount(currentUserId, AccountType.SAVINGS, defaultUserAccountId)
            .then(response => {
                cy.log('new account created');
                newAccountService.verifyAccountCreated(response, currentUserId, AccountType.SAVINGS);
            })
    });

    it('OA007 - registered user can open new savings account using UI', () => {
        overviewPage.verifyPageUrl();
        overviewPage.goToNewAccount();
        newAccountPage.verifyPageUrl();
        newAccountPage.createNewAccount('SAVINGS');
        newAccountPage.verifyOpenAccountResult('Account Opened!');
        newAccountPage.returnNewAccountNumber().then(result => newSavingsAccountId = result);
    });

});