# BubblesNet Controller


[![codecov](https://codecov.io/gh/bubblesnet/controller/branch/develop/graph/badge.svg?token=4ETBIJSIKZ)](https://codecov.io/gh/bubblesnet/controller)
![ci](https://github.com/bubblesnet/controller/workflows/BubblesNetCI/badge.svg)

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![GitHub stars](https://img.shields.io/github/stars/bubblesnet/controller.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/bubblesnet/controller/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/bubblesnet/controller.svg)](https://GitHub.com/bubblesnet/controller/pull/)
[![Github all releases](https://img.shields.io/github/downloads/bubblesnet/controller/total.svg)](https://GitHub.com/bubblesnet/controller/releases/)

![Your Repository's Stats](https://github-readme-stats.vercel.app/api?username=bubblesnet&show_icons=true)

This repo is one of 6 repos that make up the BubblesNet project. If you've arrived at this repo through
the side door (direct search), then you probably want to start at the [documentation repository](https://github.com/bubblesnet/documentation) for this
project. You can not understand this repo without seeing how it interacts with the other repos.

The controller is a control, and data collection and analysis service designed to 
work with the bubblesnet edge-device.  It consists of:

Client - a React application for controlling one or more edge devices
and viewing the data from those devices.

Server - a set of three NodeJS servers (api, websocket, queue) that serve both the controller React application AND 
the edge devices manipulating the physical environment and queueing data for storage.


