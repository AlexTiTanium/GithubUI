"use strict";

define([
    'marionette',
    './view/LayoutView',
    'data/IssuesCollection',
    './router'
], function(Marionette, LayoutView, issuesCollection, Router) {

    /**
     * Module issues
     */
    return Marionette.Module.extend({

        /**
         * Init module
         */
        initialize: function() {
            this.router = new Router({ controller: this });
        },

        /**
         * Module start event
         */
        onStart: function() {
            this.layout = new LayoutView();
        },

        /**
         * Fetch repository list
         *
         * @route :owner/:repository
         * @param owner
         * @param repository
         */
        showRepositoryIssues : function(owner, repository){
            this.layout.render();
            issuesCollection.fetch({ owner: owner, repository: repository, reset: true  });
        }

    });
});