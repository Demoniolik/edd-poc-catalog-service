import express from 'express';
import { connectToKafka, requestCosnumer, responseProducer } from './config/kafkaConfig';
const app = express();

const PRODCUT_REQUEST_TOPIC = "bff.prodcut.catalog.reqeust";
const PRODCUT_RESPONSE_TOPIC = "bff.prodcut.catalog.response";

requestCosnumer.subscribe({
    topic: PRODCUT_REQUEST_TOPIC
});

requestCosnumer.run({
    eachMessage: async ({ message }) => {
        console.log("Catalog service recived the message");
        console.log(message);
        const response = {
            topic: PRODCUT_RESPONSE_TOPIC,
            messages: [{
                value: `Here are all products ${message.headers?.correlationId}`,
                headers: {
                    correlationId: message.headers?.correlationId
                }
            }]
        }
        responseProducer.send(response);
        console.log(`Result message was sent to bff service ${message.headers?.correlationId}`);
    }
});

app.listen(3001, () => {
    connectToKafka();
    console.log('Application started on port 3001!');
});