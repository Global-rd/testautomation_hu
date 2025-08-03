Cypress.Commands.add('login', () => {
	cy.fixture('testUser').then((user) => {
		cy.visit('/parabank/index.htm');
		cy.get('input[name="username"]').type(user.username);
		cy.get('input[name="password"]').type(user.password);
		cy.get('input[value="Log In"]').click();

		cy.contains('Account Services').should('be.visible');
	});
});

Cypress.Commands.add('resetDatabase', () => {
	cy.request('POST', '/parabank/services/bank/cleanDB').then((res) => {
		expect(res.status).to.eq(204);
	});
	cy.request('POST', '/parabank/services/bank/initializeDB').then((res) => {
		expect(res.status).to.eq(204);
	});
});

Cypress.Commands.add('registerUser', () => {
	cy.visit('/parabank/register.htm');
	
	cy.fixture('testUser').then((user) => {
		cy.get('#customer\\.firstName').type(user.firstName);
		cy.get('#customer\\.lastName').type(user.lastName);
		cy.get('#customer\\.address\\.street').type(user.address);
		cy.get('#customer\\.address\\.city').type(user.city);
		cy.get('#customer\\.address\\.state').type(user.state);
		cy.get('#customer\\.address\\.zipCode').type(user.zip);
		cy.get('#customer\\.phoneNumber').type(user.phone);
		cy.get('#customer\\.ssn').type(user.ssn);
		cy.get('#customer\\.username').type(user.username);
		cy.get('#customer\\.password').type(user.password);
		cy.get('#repeatedPassword').type(user.password);

		cy.get('input[value="Register"]').click();
		cy.contains('Your account was created successfully. You are now logged in.').should('be.visible');

		cy.contains('Log Out').click();
	});
});

Cypress.Commands.add('registerUserAPI', () => {
	cy.fixture('testUser').then((user) => {
		const formData = {
			'customer.firstName': user.firstName,
			'customer.lastName': user.lastName,
			'customer.address.street': user.address,
			'customer.address.city': user.city,
			'customer.address.state': user.state,
			'customer.address.zipCode': user.zip,
			'customer.phoneNumber': user.phone,
			'customer.ssn': user.ssn,
			'customer.username': user.username,
			'customer.password': user.password,
			'repeatedPassword': user.password
		};

		return cy.request({
			method: 'POST',
			url: '/parabank/register.htm',
			form: true,
			body: formData,
			failOnStatusCode: false
		}).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.headers['content-type']).to.include('text/html');

			expect(response.body).to.include('Your account was created successfully');
		});
	});
});

Cypress.Commands.add('setDefaults', () => {
	cy.visit('/parabank/admin.htm');
	
	cy.fixture('defaults').then((def) => {
		cy.get('input[value="'+def.accessMode+'"]').click();
		cy.get('#initialBalance').clear();
		cy.get('#initialBalance').type(def.initialBalance);

		cy.get('input[value="Submit"]').click();
		cy.contains('Settings saved successfully.').should('be.visible');
	});
});

Cypress.Commands.add('initEnvironment', () => {
	cy.resetDatabase();
	cy.setDefaults();
	cy.registerUser();
});