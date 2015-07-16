"use strict";

define([
    'marionette',
    'moment',
    "ldsh!../../templates/list/IssueItemView.html"
], function(Marionette, moment, template) {

    /**
     * Represent one issie on list
     */
    return Marionette.ItemView.extend({

        tagName: 'div',
        className: 'list-group-item',

        template: template,

        templateHelpers: {
            moment: moment
        },

        events: {
            'click': 'onClick'
        }

    });
});