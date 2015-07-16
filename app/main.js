"use strict";

require.config({

    paths: {
        "lodash": "../bower_components/lodash/lodash",
        "jquery": "../bower_components/jquery/dist/jquery",
        "backbone": "../bower_components/backbone/backbone",
        "marionette": "../bower_components/marionette/lib/backbone.marionette",
        "q": "../bower_components/q/q.js",
        "ldsh": "../bower_components/lodash-template-loader/loader",
        "application": "application",
        "typeahead": "../bower_components/typeahead.js/dist/typeahead.jquery",
        "bloodhound": "../bower_components/typeahead.js/dist/bloodhound",
        "moment": "../bower_components/moment/min/moment-with-locales"
    },

    map: {
        '*': {
            'underscore': 'lodash'
        }
    },

    shim: {
        'backbone': ['jquery', 'underscore'],
        'marionette': ['backbone','underscore' ],
        'ldsh': ['lodash'],
        'typeahead': ['jquery'],
        'application': ['marionette'],
        'bloodhound': {
            exports: 'Bloodhound'
        }
    },

    lodashLoader: {

        // This is the default extension, you can change to whatever you like.
        // Setting this to "" will disable automatic extensions.
        ext: "",

        // Globally configured template settings to be applied to any templates
        // loaded.  This correlates directly to `_.templateSettings`.
        templateSettings: {}
    },

    deps: ["application"]
});