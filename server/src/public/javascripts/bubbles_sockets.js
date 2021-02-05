window.bubbles = {
        subscribeToServer: function (requestMsg, requestObj, responseEvent) {
        var socket = io.connect('/', {
            'reconnect': true,
            'reconnection delay': 500,
            'max reconnection attempts': 'Infinity'
        });
        socket.on('close', function () {
            console.log('bubbles.js server closed the connection!!');
        });
        socket.on('error', function () {
            console.log('bubbles.js socket error');
            // window.location.reload();
        });
        socket.on('connect', function () {
            console.log('bubbles.js "successfully connected"');
        });
        socket.on('disconnect', function () {
            console.log('bubbles.js "server disconnected"');
        });
        socket.emit(requestMsg, requestObj);
        socket.on(responseEvent, function (data) {
            console.log('data = ' + JSON.stringify(data));
        });
    }
};

