import { Kafka } from 'kafkajs';
import express from 'express';

const app = express();
app.use(express.json());

const kafka = new Kafka({
    clientId: 'robotdreams-app',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'robotdreams-consumers' });

const messages = [];

async function startKafka() {
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics: [{ topic: 'user-events' }],
        waitForLeaders: true,
    });
    await admin.disconnect();
    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic: 'user-events', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            messages.push({
                value: message.value.toString(),
            });
        },
    });
}

app.post('/events', async (req, res) => {
    const payload = {
        topic: 'user-events',
        messages: [{ value: JSON.stringify(req.body) }],
    };
    await producer.send(payload);
    res.status(202).json({ status: 'sent' });
});

app.get('/events', (req, res) => {
    res.json(messages);
});

app.listen(4002, () => {
    console.log('Kafka REST bridge listening on http://localhost:4002');
    startKafka().catch(console.error);
});