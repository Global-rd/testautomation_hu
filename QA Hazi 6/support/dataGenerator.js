const { faker } = require("@faker-js/faker");

function generateFakeContact() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const uniqueId = Date.now();

  return {
    firstName,
    lastName,
    email: `${firstName}.${lastName}.${uniqueId}@example.com`.toLowerCase(),
    phone: `06${faker.string.numeric(13)}`.slice(0, 15), // max 15 characters
  };
}

module.exports = { generateFakeContact };
