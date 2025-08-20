import {User, UserType} from "../support/model/User";
import Chainable = Cypress.Chainable;
import {BasePage} from "./BasePage";

export class LoginPage extends BasePage {
    baseUrl: string = '/';

    selectors = {
        userNameInputField: '[name="username"]',
        passwordInputField: '[name="password"]',
        submitButton: '[type="submit"]',
    };

    constructor(private userType: UserType) {
        super();
    }

    public login(): void {
        cy.visit(this.url);

        cy.fixture('users.json').then((userData) => {
            let user = userData[this.userType] as User;
            this.userNameInputField.type(user.username);
            this.passwordInputField.type(user.password);
            this.submitButton.click();
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

}