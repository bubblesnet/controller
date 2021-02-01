# controller

[![codecov](https://codecov.io/gh/bubblesnet/controller/branch/1-feature-firstapis/graph/badge.svg?token=4ETBIJSIKZ)](https://codecov.io/gh/bubblesnet/controller)

[![ci](https://github.com/bubblesnet/controller/workflows/BubblesNetCI/badge.svg)]

The controller is a control, and data collection and analysis service designed to 
work with the bubblesnet edge-device.  It consists of:

Client - a React application for controlling one or more edge devices
and viewing the data from those devices.

Server - an API server that serves both the controller React application AND 
the edge devices manipulating the physical environment and queueing data for storage.

This open-source project is a port and integration of an existing set of unrelated private projects.  This
original set of projects included:
* Server written in Java J2EE as APIs that write JSON files to filesystem
* File processors written in Java that read/write ActiveMQ, move file data into databases and archive files
* A MySQL database
* An Android/Android Things edge device that itself was a rewrite of a RPi python edge device

Data structures

A sensor on a device is referred to by its unique name
The measurement the sensor takes also has a unique name
The sensor and the measurement are linked in configuration not hard wired, so
for instance you 'could' link a sensor named "humidity_sensor" to "air_temp_middle".
