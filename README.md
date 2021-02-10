# BubblesNet Controller

[![codecov](https://codecov.io/gh/bubblesnet/controller/branch/6---CI-and-Testing/graph/badge.svg?token=4ETBIJSIKZ)](https://codecov.io/gh/bubblesnet/controller)
![ci](https://github.com/bubblesnet/controller/workflows/BubblesNetCI/badge.svg)

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![GitHub stars](https://img.shields.io/github/stars/bubblesnet/controller.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/bubblesnet/controller/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/bubblesnet/controller.svg)](https://GitHub.com/bubblesnet/controller/pull/)
[![Github all releases](https://img.shields.io/github/downloads/bubblesnet/controller/total.svg)](https://GitHub.com/bubblesnet/controller/releases/)

![Your Repository's Stats](https://github-readme-stats.vercel.app/api?username=bubblesnet&show_icons=true)

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
