import {BasePage} from "./BasePage";
import {AccountType} from "../support/model/Account";

export class AccountDetailsPage extends BasePage {

    baseUrl = `activity.htm?id=${this.accountId}`;

    selectors = {
        accountId: "#accountId",
        accountType: "#accountType",
        balance: "#balance",
        availableBalance: "#availableBalance",
    }

    constructor(private accountId: string) {
        super();
    }

    openPage(): void {
        cy.visit(this.baseUrl);
    }

    verifyAccountMatch(accountId: number, accountType: AccountType, balance: string): void {
        cy.get(this.selectors.accountId).should('contain.text', accountId);
        cy.get(this.selectors.accountType).should('contain.text', accountType.toString());
        cy.get(this.selectors.balance).should('contain.text', balance);
    }
}