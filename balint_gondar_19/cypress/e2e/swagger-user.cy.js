describe('Swagger-backed User API tests', () => {
    const apiBase = Cypress.env('CYPRESS_BASE_URL') + '/users'

    const validUser = {
        name: 'Cypress User',
        email: 'cypress@example.com',
        nick: 'cy'
    };

    const invalidUser = {
        email: 'missingname@example.com'
    };

    it('should reject invalid user with 400', () => {
        cy.fixture("user").then((users) => {

            cy.request({
                method: 'POST',
                url: apiBase,
                body: users,
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(400);
                expect(res.body).to.have.property('message');
            })
        });
    });

    it('should create user with 201', () => {
        cy.request('POST', apiBase, validUser).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body).to.include({
                name: validUser.name,
                email: validUser.email,
                nick: validUser.nick
            });
        });
    });

    it('should list users and contain the new one', () => {
        cy.request(apiBase).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('array');


            const found = res.body.find(u => u.email === validUser.email);
            expect(found).to.include({ name: validUser.name });

        });



    });
});
