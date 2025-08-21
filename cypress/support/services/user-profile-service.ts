import {BaseService} from "./base-service";
import {User} from "../model/User";

export class UserProfileService extends BaseService {

    updateProfile(userId: number, user: User): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
            method: 'POST',
            url: `services_proxy/bank/customers/update/${userId}?${this.userToQueryParams(user)}`,
        })
    }

    private userToQueryParams(user: User): string{
        return `firstName=${user.firstName}&lastName=${user.lastName}&street=${user.address.street}&city=${user.address.city}
        &state=${user.address.state}&zipCode=${user.address.zipCode}&phoneNumber=${user.address.phoneNumber}
        &ssn=${user.ssn}&username=${user.username}&password=${user.password}`
    }
}