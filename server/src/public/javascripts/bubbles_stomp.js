window.stomp = {
        subscribeToServer: function (requestMsg, requestObj, cb) {
            var url = "ws://10.0.100.253:61614/stomp";
            var client = Stomp.client(url, "v11.stomp");

            client.connect( "", "",
                function() {
                    client.subscribe("BUBBLESQUEUE",
                        function( message ) {
                            // console.log( "incoming message " + message );
                            cb( message );
                        },
                        {priority: 9}
                    );
                    client.send("BUBBLESQUEUE", {priority: 9}, "Pub/Sub over STOMP!");
                }
            );
    }
};

