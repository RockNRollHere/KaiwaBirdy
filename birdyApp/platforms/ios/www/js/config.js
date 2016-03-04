/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */

/**
 * The application config
 *
 * @author Lion
 * @version 1.0
 */

(function () {
    'use strict';

    window.APP_CONFIG = {
        //REST_SERVICE_BASE_URL: "http://ibmtravelcompanion.mybluemix.net",
        REST_SERVICE_BASE_URL: "http://travel-companion.mybluemix.net",
        API_TIMEOUT: 30000

    };

    angular.module('birdyApp')
        .constant("config", window.APP_CONFIG);
})();
