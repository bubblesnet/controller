(function () {
    exports.getLocals = function () {
        return {
            datadirectory: "/glassdashcamdata",
            usersdirectory: "/glassdashcamdata/users",
            statusfilesdirectory: "/glassdashcamdata/bubblesstatus",
            sessionTimeoutInMinutes: 30,
            sitename: "Bubbles Test",
            baseurl: "http://jenkins:3000",
            productname: "Bubbles",
            googleanalytics_key: "UA-42571213-2",
            dbusername: "bubbles",
            units: "IMPERIAL",
            tubdepth: 16.5,
            tubvolume: 18,
            dbpw: "bubbles",
            sendEmailNotification: false,
            sendgridRestrictedAPIKey: "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",
            sendgridFullAccessAPIKey: "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",
            sendgridSenderEmailAddress: "rodley@rodley.com",
            deviceForDiskCheck: "/",
            db_config: {
                host: "jenkins",
                user: "testgdc",
                password: "testgdc",
                database: "TestGlassDashCam"
            }
        };
    };
}).call(this);