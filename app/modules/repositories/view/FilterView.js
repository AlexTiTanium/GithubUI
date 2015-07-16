"use strict";

define([
    'marionette',
    'data/RepositoriesCollection',
    "ldsh!../templates/FilterView.html"
], function (Marionette, repositoriesCollection, template) {

    /**
     * Render filter input for repositories collection
     */
    return Marionette.ItemView.extend({

        template: template,

        ui: {
            filter: 'input[name="filter-repositories"]'
        },

        events: {
            'keyup @ui.filter': 'onFilterInput'
        },

        /**
         * On render
         *
         * @event
         */
        onRender: function () {
            this.ui.filter.val(repositoriesCollection.currentFilter);
        },

        /**
         * On filter input event
         *
         * @event
         */
        onFilterInput: function () {
            repositoriesCollection.filterBy('name', this.ui.filter.val());
        }

    });
});