var amqp = require('amqplib/callback_api');

const LOCAL_URL = 'amqp://localhost';
const EXCHANGE_NAME = 'logs';

amqp.connect(LOCAL_URL, function(error0, connection) {
	if (error0) {
		throw error0;
	}
	connection.createChannel(function(error1, channel) {
		if (error1) {
			throw error1;
		}
		var msg = process.argv.slice(2).join(' ') || 'Hello World!';

		channel.assertExchange(EXCHANGE_NAME, 'fanout', {
			durable: false
		});
		channel.publish(EXCHANGE_NAME, '', Buffer.from(msg));
		console.log(" [x] Sent %s", msg);
	});

	setTimeout(function() {
		connection.close();
		process.exit(0);
	}, 500);
});