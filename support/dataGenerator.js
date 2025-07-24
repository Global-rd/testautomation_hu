const { faker } = require('@faker-js/faker');

function generateFakeContact() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode().slice(0,10)
  };
}

module.exports = { generateFakeContact };
