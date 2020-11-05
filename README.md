# controller

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
