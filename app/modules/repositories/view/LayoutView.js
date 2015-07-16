"use strict";

define([
    'marionette',
    './FilterView',
    './list/RepositoriesCollectionView',
    'data/RepositoriesCollection',
    "ldsh!../templates/LayoutView.html"
], function (Marionette, FilterView, RepositoriesCollectionView, repositoriesCollection, template) {

    /**
     * Root layout for repositories module
     */
    return Marionette.LayoutView.extend({

        el: '#content',
        template: template,

        ui: {
            loader: 'div.loader',
            regions: '.region',
            error: '.error'
        },

        regions: {
            list: "#rgn-list",
            filter: "#rgn-filter"
        },

        /**
         * Init layout
         */
        initialize: function () {

            this.listenTo(repositoriesCollection, 'sync', this.hideLoading);
            this.listenTo(repositoriesCollection, 'request', this.showLoading);
            this.listenTo(repositoriesCollection, 'error', this.onError);
        },

        /**
         * On render
         *
         * @event
         */
        onRender: function () {

            this.ui.regions.hide();

            this.getRegion('list').show(new RepositoriesCollectionView());
            this.getRegion('filter').show(new FilterView());
        },

        /**
         * Show loading animation
         */
        showLoading: function () {
            this.ui.error.hide();
            this.ui.regions.hide();
            this.ui.loader.show();
        },

        /**
         * Hide loading animation
         */
        hideLoading: function () {
            this.ui.error.hide();
            this.ui.regions.show();
            this.ui.loader.hide();
        },

        /**
         * Show error
         *
         * @param collection
         * @param error
         */
        onError: function (collection, error) {

            this.ui.loader.hide();
            this.ui.error.show();

            var message = 'Unknown error';
            if (error && error.responseJSON) {
                message = error.responseJSON.message;
            }

            this.ui.error.find('.error-message').text(message);
        }

    });
});