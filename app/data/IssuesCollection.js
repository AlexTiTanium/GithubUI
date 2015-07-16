"use strict";

define([
    'backbone',
    './IssueModel'
], function (Backbone, IssueModel) {

    /**
     * @api https://developer.github.com/v3/issues/#list-issues-for-a-repository
     * @class IssuesCollection
     * @name IssuesCollection
     */
    var Collection = Backbone.Collection.extend({

        model: IssueModel,

        // Save fetch params
        owner: null,
        repository: null,

        // Result per page
        onPage: 30,

        /**
         * Get repositories issues resource url
         *
         * @param {string} owner
         * @param {string} repository
         * @returns {string}
         */
        url: function (owner, repository) {
            return application.gitHubAPI + '/repos/' + owner + '/' + repository + '/issues';
        },

        /**
         * Change result count per page, will call fetch
         *
         * @param count
         */
        setOnPageCount: function (count) {

            this.onPage = count;

            this.fetch({
                owner: this.owner,
                repository: this.repository,
                reset: true,
                force: true
            });
        },

        /**
         * Custom collection fetch, owner and repository option is required
         *
         * @override
         * @param {Object} options
         */
        fetch: function (options) {

            options = options || {};
            options.data = options.data || {};

            if (!options.owner) {
                throw new Error('Owner name required');
            }

            if (!options.repository) {
                throw new Error('Repository name required');
            }

            // Don't fetch same data twice
            if (!options.force && this.size() && this.owner == options.owner && this.repository == options.repository) {
                this.trigger('sync', this);
                return;
            }

            // Save fetch options
            this.owner = options.owner;
            this.repository = options.repository;

            // Set per page count result
            options.data.per_page = this.onPage;

            // Override default url
            options.url = this.url(options.owner, options.repository);

            // Call parent method
            this.constructor.__super__.fetch.call(this, options);
        }

    });

    // Create and collection instance
    return new Collection();
});