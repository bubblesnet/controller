# BubblesNet Controller


[![License](https://raw.githubusercontent.com/bubblesnet/documentation/9c881cf6437198cdab65f13562c5f679dcecaceb/images/bubblesnet.svg)](https://github.com/bubblesnet/documentation/LICENSE)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

![Build controller](https://github.com/bubblesnet/controller/workflows/controller-ci/badge.svg?branch=develop)
[![codecov](https://codecov.io/gh/bubblesnet/controller/branch/develop/graph/badge.svg?token=4ETBIJSIKZ)](https://codecov.io/gh/bubblesnet/controller)

[![GitHub stars](https://img.shields.io/github/stars/bubblesnet/controller.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/bubblesnet/controller/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/bubblesnet/controller.svg)](https://GitHub.com/bubblesnet/controller/pull/)
[![Github all releases](https://img.shields.io/github/downloads/bubblesnet/controller/total.svg)](https://GitHub.com/bubblesnet/controller/releases/)

[![balena deploy button](https://www.balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/bubblesnet/controller)

![Your Repository's Stats](https://github-readme-stats.vercel.app/api?username=bubblesnet&show_icons=true)



This repo is one of 6 repos that make up the BubblesNet project. If you've arrived at this repo through
the side door (direct search), then you probably want to start at the [documentation repository](https://github.com/bubblesnet/documentation) for this
project. You can not understand this repo without seeing how it interacts with the other repos.

## Repository Structure
The controller is a control, and data collection and analysis service designed to 
work with the bubblesnet edge-device.  It consists of:

[Client](client) - a React application for controlling one or more edge devices
and viewing the data from those devices.

[Server](server) - a set of three NodeJS servers (api, websocket, queue) that serve both the controller React application AND 
the edge devices manipulating the physical environment and queueing data for storage. Any of the three servers can 
be run from the server directory by calling the correct main for [api](server/src/api-server.js), [queue](server/src/queue-server.js) 
or [websocket](server/src/websocket-server.js).

## System Messaging Structure

The system uses a common JSON messaging structure throughout.  See [here](Messsaging.md) for details.




