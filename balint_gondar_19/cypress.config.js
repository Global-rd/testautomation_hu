module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      const { Kafka } = require('kafkajs');

      on('task', {
        sendKafkaMessage({ topic, message }) {
          const kafka = new Kafka({ brokers: ['localhost:9092'] });
          const producer = kafka.producer();
          return producer.connect()
            .then(() => producer.send({
              topic,
              messages: [{ value: JSON.stringify(message) }]
            }))
            .then(() => producer.disconnect())
            .then(() => true);
        },

        readKafkaMessage({ topic }) {
          return new Promise(async (resolve, reject) => {
            const kafka = new Kafka({ brokers: ['localhost:9092'] });
            const consumer = kafka.consumer({ groupId: 'cypress-read-group-' + Date.now() });

            await consumer.connect();
            await consumer.subscribe({ topic, fromBeginning: true });

            let lastMessage = null;

            const run = async () => {
              await consumer.run({
                eachMessage: async ({ message }) => {
                  lastMessage = JSON.parse(message.value.toString());
                },
              });
            };

            run().catch(async (err) => {
              clearTimeout(timeout);
              await consumer.disconnect();
              reject(err);
            });

            const timeout = setTimeout(async () => {
              await consumer.disconnect();
              if (lastMessage) {
                resolve(lastMessage);
              } else {
                reject(new Error('Kafka read timeout'));
              }
            }, 5000); // Timeout: 5 seconds
          });
        }
      });
    },
  },
};
