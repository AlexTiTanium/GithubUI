"use strict";

define([
    'backbone',
    'bloodhound',
    './RepositoryModel'
], function (Backbone, Bloodhound, RepositoryModel) {

    /**
     * @api https://developer.github.com/v3/repos/#list-user-repositories
     * @class RepositoriesCollection
     * @name RepositoriesCollection
     */
    var Collection = Backbone.Collection.extend({

        model: RepositoryModel,

        // Save fetch params
        owner: null,

        // Save filter value
        currentFilter: null,

        /**
         * Get repositories resource url
         *
         * @param {string} owner
         * @returns {string}
         */
        url: function (owner) {
            return application.gitHubAPI + '/users/' + owner + '/repos';
        },

        /**
         * Custom collection fetch, owner option required
         *
         * @override
         * @param {Object} options
         */
        fetch: function (options) {

            options = options || {};

            if (!options.owner) {
                throw new Error('Owner name required');
            }

            // Don't fetch same data twice
            if (this.size() && this.owner == options.owner) {
                this.trigger('sync', this);
                return;
            }

            // Save owner
            this.owner = options.owner;

            // Override default url
            options.url = this.url(options.owner);

            // Call parent method
            this.constructor.__super__.fetch.call(this, options);
        },

        /**
         * Filter current collection.
         * If field value of the model not pass regExp test -> change model include to false
         *
         * @param {String} field - Filed of model
         * @param {String} letters
         */
        filterBy: function (field, letters) {

            var pattern = new RegExp(letters, "gi");

            // Save filter value
            this.currentFilter = letters;

            this.each(function (model) {

                var include = true;

                if (!pattern.test(model.get(field))) {
                   include = false;
                }

                model.set({include: include}, {silent: true});

            });

            this.trigger('change', this);
        }

    });

    // Create and collection instance
    return new Collection();
});