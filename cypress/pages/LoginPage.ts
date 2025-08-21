import {User, UserType} from "../support/model/User";
import Chainable = Cypress.Chainable;
import {BasePage} from "./BasePage";
import {BehaviorSubject, Observable} from "rxjs";

export class LoginPage extends BasePage {
    baseUrl: string = '/';

    selectors = {
        userNameInputField: '[name="username"]',
        passwordInputField: '[name="password"]',
        submitButton: '[type="submit"]',
        logoutButton: '[href="logout.htm"]',
    };

    userId: BehaviorSubject<number> = new BehaviorSubject(undefined);
    loggedInUserId: Observable<number> = this.userId.asObservable();
    accountId: BehaviorSubject<number> = new BehaviorSubject(undefined);
    userDefaultAccountId: Observable<number> = this.accountId.asObservable();

    constructor(private userType: UserType) {
        super();
    }

    public async login(): Promise<void> {
        cy.intercept('GET', '/parabank/services_proxy/bank/customers/**/accounts').as('accountRequest');

        cy.visit(this.url);

        cy.fixture('users.json').then((userData) => {
            let user = userData[this.userType] as User;
            this.userNameInputField.type(user.username);
            this.passwordInputField.type(user.password);
            this.submitButton.click();
        });

        return new Promise((resolve) => {
            cy.wait('@accountRequest').then(({response}) => {
                this.userId.next(response.body[0].customerId);
                this.accountId.next(response.body[0].id);
                resolve();
            });
        });
    }


    get url(): string{
        return this.baseUrl;
    }

    get userNameInputField(): Chainable<JQuery<HTMLElement>> {
        return cy.get(this.selectors.userNameInputField);
    }

    get passwordInputField(): Chainable<JQuery<HTMLElement>> {
        return cy.get(this.selectors.passwordInputField);
    }

    get submitButton(): Chainable<JQuery<HTMLElement>> {
        return cy.get(this.selectors.submitButton);
    }

    logout() {
        cy.get(this.selectors.logoutButton).click();
    }
}