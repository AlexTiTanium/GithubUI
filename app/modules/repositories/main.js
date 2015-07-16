"use strict";

define([
    'marionette',
    './view/LayoutView',
    'data/RepositoriesCollection',
    './router'
], function(Marionette, LayoutView, repositoriesCollection, Router) {

    /**
     * Repositories module, render repositories list
     */
    return Marionette.Module.extend({

        /**
         * Init module
         */
        initialize: function() {
            this.router = new Router({ controller: this });
        },

        /**
         * Module start
         */
        onStart: function() {
            this.layout = new LayoutView();
        },

        /**
         * Router event
         *
         * @event ":owner"
         * @param {String} owner
         */
        showRepositoryList : function(owner){

            this.layout.render();

            repositoriesCollection.fetch({
                owner: owner,
                reset: true,
                data: { per_page: 500 },
                processData: true
            });
        }

    });
});