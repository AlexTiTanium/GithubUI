"use strict";

define([
    'marionette',
    './RepositoryItemView',
    './EmptyView',
    'data/RepositoriesCollection',
    "ldsh!../../templates/list/RepositoryCollectionView.html"
], function (Marionette, RepositoryItemView, EmptyView, RepositoriesCollection, template) {

    return Marionette.CompositeView.extend({

        childViewContainer: ".list-child-view",

        childView: RepositoryItemView,
        emptyView: EmptyView,

        collection: RepositoriesCollection,

        template: template,

        /**
         * Init view
         */
        initialize: function () {

            this.listenTo(this.collection, 'change', this.render);
        },

        /**
         * Filter items
         *
         * @param child
         * @override
         * @returns {*}
         */
        filter: function (child) {
            return child.get('include');
        }

    });
});