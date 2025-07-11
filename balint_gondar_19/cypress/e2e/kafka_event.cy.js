describe('Kafka REST producer-consumer flow', () => {
    const apiBase = 'http://localhost:4002';
    const testPayload = {
        name: 'Test User',
        email: 'testuser@example.com',
    };

    it('should send event and retrieve it from topic', () => {
        // PRODUCER – POST to /events
        cy.request('POST', `${apiBase}/events`, testPayload).then((response) => {
            expect(response.status).to.eq(202);
            expect(response.body.status).to.eq('sent');
        });

        // CONSUMER – wait and GET from /events
        cy.wait(500); // add delay for Kafka consumer to receive it

        cy.request(`${apiBase}/events`).then((response) => {
            expect(response.status).to.eq(200);
            const body = response.body;
            expect(body).to.be.an('array');
            const parsedEvents = body.map((e) => JSON.parse(e.value));
            const last = parsedEvents[parsedEvents.length - 1];
            expect(last).to.include(testPayload);
        });
    });
});

describe('Kafka direct producer-consumer test', () => {
    const testPayload = {
        name: 'Direct Kafka User',
        email: 'direct@example.com'
    };

    it('should send and receive message via Kafka directly', () => {
        cy.task('sendKafkaMessage', {
            topic: 'user-events',
            message: testPayload
        }).then((result) => {
            expect(result).to.eq(true);
        });

        cy.wait(200);

        cy.task('readKafkaMessage', {
            topic: 'user-events'
        }).then((received) => {
            expect(received).to.include(testPayload);
        });
    });
});