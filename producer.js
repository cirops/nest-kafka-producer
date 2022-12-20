import { Kafka } from "kafkajs";
import { randomUUID } from "node:crypto";

async function bootstrap() {
  const kafka = new Kafka({
    clientId: "test-producer",
    brokers: ["mature-kite-6500-us1-kafka.upstash.io:9092"],

    sasl: {
      mechanism: "scram-sha-256",

      username:
        "bWF0dXJlLWtpdGUtNjUwMCQva7JYXICZbl6MTLKE2tZWbHhMNewwnPB5FElk2VA",

      password:
        "GoaTERLG0uIUgz5AbTvhdzv6uoCRU1gnEyOjRzuyvqlZDC3phUM5STK-SDxwGduJSVpJCA==",
    },

    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "notifications.send-notification",
    messages: [
      {
        value: JSON.stringify({
          content: "Nova solicitação de amizade!",
          category: "social",
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
