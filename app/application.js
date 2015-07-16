"use strict";

require([
    'jquery',
    'marionette',
    'backbone',
    'moment',
    'modules/search/main',
    'modules/issues/main',
    'modules/repositories/main'
], function($, Marionette, Backbone, moment, SearchModule, IssuesModule, RepositoriesModule) {

    /**
     * Setup application
     */
    var Application = Marionette.Application.extend({
        gitHubAPI: 'https://api.github.com'
    });

    var application = new Application();

    /**
     * Start backbone history
     */
    application.on("start", function(options) {
        if (Backbone.history) {
            Backbone.history.start();
        }

        // Hide global preloader
        $('body').addClass('loaded');
    });

    // Set moment locale
    moment.locale(window.navigator.userLanguage || window.navigator.language);

    // Navigation shortcut
    application.navigate = function(fragment, options){
        if (Backbone.history) {
            Backbone.history.navigate(fragment, options);
        }
    };

    /**
     * Modules section
     */
    application.module("search", SearchModule);
    application.module("issues", IssuesModule);
    application.module("repositories", RepositoriesModule);


    // Export application to global scope
    window.application = application;

    // Start application
    application.start();

    return application;
});