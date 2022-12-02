# Server

The server is a set of NodeJS applications that handle storing and providing access to data supplied by
the [edge-devices](https://github.com/bubblesnet/edge-device).

It contains three balena containers:

| Container | Description                                                                                                                                                                                                      |
| ----------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| api | Provide an accessible REST API to both the edge devices and the user interface container. Puts incoming data from the edge-devices onto an ActiveMQ queue. All database access happens within the api container. |
| queue | A daemon that reads the ActiveMQ queue of inbound edge-device data and puts it into the Postgresql database.                                                                                                     |
| websocket | A daemon that reads the ActiveMQ queue of inbound edge-device data and sends it to the user interface for display.                                                                                               |

