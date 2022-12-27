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

echo Setting timezone
sudo ln -sf /usr/share/zoneinfo/US/Eastern /etc/localtime

if [ $RESIN_SERVICE_NAME = "api" ]
then
  echo 'Running API in ' $RESIN_SERVICE_NAME
  /startservers_api.sh
elif [ $RESIN_SERVICE_NAME = "queue" ]
then
  echo 'Running QUEUE service in ' $RESIN_SERVICE_NAME
  /startservers_queue.sh
elif [ $RESIN_SERVICE_NAME = "websocket" ]
then
  echo 'Running WEBSOCKET server in ' $RESIN_SERVICE_NAME
  /startservers_websocket.sh
else
  echo $RESIN_SERVICE_NAME
fi