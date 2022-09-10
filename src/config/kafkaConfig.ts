import { Kafka } from 'kafkajs';

const kafkaClient = new Kafka({
    clientId: 'catalog-app',
    brokers: ['localhost:9092']
});

const responseProducer = kafkaClient.producer();
const requestCosnumer = kafkaClient.consumer(
    {
        groupId: "catalog-service"
    }
);

const connectToKafka = async () => {
    await responseProducer.connect();
    await requestCosnumer.connect();
}

export { kafkaClient, responseProducer, requestCosnumer, connectToKafka };