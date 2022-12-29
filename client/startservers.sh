#!/bin/bash

#
# Copyright (c) John Rodley 2022.
# SPDX-FileCopyrightText:  John Rodley 2022.
# SPDX-License-Identifier: MIT
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this
# software and associated documentation files (the "Software"), to deal in the
# Software without restriction, including without limitation the rights to use, copy,
# modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
# and to permit persons to whom the Software is furnished to do so, subject to the
# following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
# INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
# PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
# HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
# CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
# OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
#

if [ "$BALENA_DEVICE_TYPE" = "coral-dev" ]
then
  echo Turning coral dev board fan on
  sudo echo "disabled" > /sys/devices/virtual/thermal/thermal_zone0/mode
  sudo echo 8600 > /sys/devices/platform/gpio_fan/hwmon/hwmon0/fan1_target
fi

echo Setting timezone
sudo ln -sf /usr/share/zoneinfo/US/Eastern /etc/localtime

echo Backing up log files
now=$(date +"%Y.%m.%d_%H.%M.%S")
sudo mkdir -p $LOGS_SHARED_DIRECTORY/logs/ui/${now}
sudo mv /*.log $LOGS_SHARED_DIRECTORY/logs/ui/${now}

# Start the ui process
cd /client
ROARR_LOG=true; serve --listen tcp://0.0.0.0:$REACT_APP_UI_PORT -s build &


# Wait for any process to exit
wait -n

exit_status=$?

echo Executing sleep "$SLEEP_ON_EXIT_FOR_DEBUGGING"s
sleep "$SLEEP_ON_EXIT_FOR_DEBUGGING"s

echo Exiting with exit status $exit_status

# Exit with status of process that exited first
exit $exit_status