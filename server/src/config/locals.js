global.localconfig = {
    datadirectory: "d:/glassdashcam/shared/glassdashcamdata",
    usersdirectory: "d:/glassdashcam/shared/glassdashcamdata/users",
    statusfilesdirectory: "E:/shared/bubblesstatus",
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
    deviceForDiskCheck: "C",
    bubbles_db_config: {
        host: '192.168.21.237',
        user: 'gdc',
        password: 'gdc',
        database: 'bubbles_dev',
        port: 5432
    },
    icebreaker_db_config: {
        host: '192.168.21.237',
        user: 'postgres',
        password: 'postgres',
        database: 'icebreaker_dev',
        port: 5432
    },
    /// TODO move this to env var
    secret: 'supersecret'
};

(function () {
    exports.getLocals = function () {
        return (localconfig)
    };
}).call(this);