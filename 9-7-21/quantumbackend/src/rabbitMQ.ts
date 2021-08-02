import amqp from "amqplib";

export const connectToChannel = async () => {
  try {
    let connection = await amqp.connect(
      "amqps://vdijnlyp:bLo_fW3txcTVxfoS1kqcf10zRbtGgGVQ@puffin.rmq2.cloudamqp.com/vdijnlyp"
    );
    return connection.createChannel();
  } catch (e) {
    console.error("failed to create amqp channel: ", e);
  }
};
