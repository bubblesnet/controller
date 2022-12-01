# pi build directory

This directory is the point from which the Balena image is built and deployed.  The two key scripts [push_dev.cmd](push_dev.cmd) and
[push_prod.cmd](push_prod.cmd) kick off a process that:
- copies the server source files into sub-directories for each server container
- builds the user interface using ``` react-scripts build ``` and copies the result into the ui container directory
- pushes the build out to Balena using balena CLI

To deploy the controller to your balena fleet, cd to this directory and run either [push_prod.cmd](push_prod.cmd) OR
[push_dev.cmd](push_dev.cmd).

The character of the Balena image will be controlled first by [docker-compose.yml], then by the Dockerfile.template files
for [api](api/Dockerfile.template), [queue](queue/Dockerfile.template), [ui](ui/Dockerfile.template) and [websocket](websocket/Dockerfile.template).
Note in the docker-compose.yml file that Postgres and ActiveMQ are independent Balena "blocks" that live in the own repositories
[here](https://github.com/bubblesnet/postgresql-11-block) and [here](https://github.com/bubblesnet/activemq-5_17-block)