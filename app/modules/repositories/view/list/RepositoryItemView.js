"use strict";

define([
    'jquery',
    'marionette',
    "ldsh!../../templates/list/RepositoryItemView.html"
], function ($, Marionette, template) {

    /**
     * Represent one item in list repositories list
     */
    return Marionette.ItemView.extend({

        tagName: 'a',
        className: 'list-group-item',
        attributes: {href: '#'},

        template: template,

        events: {
            'click': 'onClick'
        },

        /**
         * On item click, navigate to issues list
         *
         * @event
         * @param e
         */
        onClick: function (e) {

            e.preventDefault();

            var url = this.model.get('owner').login + '/' + this.model.get('name');
            application.navigate(url, {trigger: true});
        }
    });
});