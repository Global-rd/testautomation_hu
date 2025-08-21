export enum UserType {
    admin = 'admin',
    testUser = 'testUser',
}

export class User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    address: Address;
    ssn: string;
}

export class Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}