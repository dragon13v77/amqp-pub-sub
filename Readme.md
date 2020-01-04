#AMQP Publish Subscribe

The assumption behind a work queue is that each task is delivered to exactly one worker.

In this part we'll do something completely different -- we'll deliver a message to multiple consumers.
This pattern is known as "publish/subscribe".

A producer is a user application that sends messages.
A queue is a buffer that stores messages.
A consumer is a user application that receives messages.

The core idea in the messaging model in RabbitMQ is that the producer never sends any messages directly to a queue.
Actually, quite often the producer doesn't even know if a message will be delivered to any queue at all.


Instead, the producer can only send messages to an exchange.
An exchange is a very simple thing. On one side it receives messages from producers and the other side it pushes them to queues.
That relationship between exchange and a queue is called a binding.

				 ------ binding -----> Q1 -----> C1
	P -------> X
				 ------ binding -----> Q2 -----> C2

The exchange X must know exactly what to do with a message it receives.
Should it be appended to a particular queue?
Should it be appended to many queues?
Or should it get discarded.
The rules for that are defined by the exchange type.

There are a few exchange types available:

- direct
- topic
- headers
- fanout : it just broadcasts all the messages it receives to all the queues it knows

In previous parts of the tutorial we knew nothing about exchanges, but still were able to send messages to queues.
That was possible because we were using a default or nameless exchange, which is identified by the empty string ("").

Detail tutorial can be found here https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html