describe('GraphQL createUser mutation test', () => {
    const apiBase = 'http://localhost:4000/graphql';

    const mutation = `
      mutation CreateUser($name: String!, $email: String!) {
        createUser(name: $name, email: $email) {
          id
          name
          email
        }
      }
    `;

    const variables = {
        name: 'GraphQL Test',
        email: 'graphql@example.com'
    };

    it('should create user via GraphQL mutation', () => {
        cy.request({
            method: 'POST',
            url: apiBase,
            body: {
                query: mutation,
                variables
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('createUser');
            expect(response.body.data.createUser).to.include({
                name: variables.email,
                email: variables.name
            });
            expect(response.body.data.createUser.id).to.exist;
        });
    });
});