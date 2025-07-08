const { faker } = require('@faker-js/faker');

function generateFakeContact() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthdate: faker.date.birthdate({ mode: 'year' }).toISOString().split('T')[0],
    email: faker.internet.email(),
    phone: faker.phone.number('+36-##-###-####'),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country()
  };
}

module.exports = { generateFakeContact };
