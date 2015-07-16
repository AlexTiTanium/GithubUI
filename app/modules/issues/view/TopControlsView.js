"use strict";

define([
    'jquery',
    'marionette',
    'data/IssuesCollection',
    "ldsh!../templates/TopControlsView.html"
], function($, Marionette, issuesCollection, template) {

    /**
     * Render issues control elements such as back btn and select on page result
     *
     * @class TopControlsView
     */
    return Marionette.ItemView.extend({

        template: template,

        ui: {
            back: 'button[data-action="back"]',
            onPageCountBtns: 'button[data-action="change-on-page-count"]'
        },

        events: {
            'click @ui.back': 'onBack',
            'click @ui.onPageCountBtns': 'onPageCount'
        },

        /**
         * On back btn click
         *
         * @event
         */
        onBack: function () {
            application.navigate(issuesCollection.owner, { trigger: true });
        },

        /**
         * On view render
         *
         * @event
         */
        onRender: function(){

            // Activate current on page result btn
            this.ui.onPageCountBtns.filter('[data-count="'+issuesCollection.onPage+'"]').addClass('active');
        },

        /**
         * Change per page count
         *
         * @event
         * @param e
         */
        onPageCount: function (e) {

            // New on page count
            var count = $(e.target).data('count');

            // Change active btn
            this.ui.onPageCountBtns.removeClass('active');
            $(e.target).addClass('active');

            // Fetch collection
            issuesCollection.setOnPageCount(count);
        }

    });
});