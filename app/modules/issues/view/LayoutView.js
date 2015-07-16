"use strict";

define([
    'marionette',
    './list/IssuesCollectionView',
    './TopControlsView',
    'data/IssuesCollection',
    "ldsh!../templates/LayoutView.html"
], function(Marionette, IssuesCollectionView, TopControlsView, issuesCollection, template) {

    return Marionette.LayoutView.extend({

        el: '#content',
        template: template,

        ui:{
            loader: 'div.loader',
            regions: '.region',
            error: '.error'
        },

        regions: {
            list: "#rgn-list",
            topControls: "#rgn-top-controls"
        },

        /**
         * Init view
         */
        initialize: function(){

            this.listenTo(issuesCollection, 'sync',     this.hideLoading);
            this.listenTo(issuesCollection, 'request',  this.showLoading);
            this.listenTo(issuesCollection, 'error',    this.onError);
        },

        /**
         * On render event
         *
         * @event
         */
        onRender: function(){

            this.ui.regions.hide();
            this.getRegion('list').show(new IssuesCollectionView());
            this.getRegion('topControls').show(new TopControlsView());
        },

        /**
         * Show layout loading animation
         */
        showLoading: function (){
            this.ui.regions.hide();
            this.ui.loader.show();
        },

        /**
         * Hide layout loading animation
         */
        hideLoading: function (){
            this.ui.regions.show();
            this.ui.loader.hide();
        },

        /**
         * Show issuesCollection api errors
         *
         * @param collection
         * @param error
         */
        onError: function (collection, error) {

            this.ui.loader.hide();
            this.ui.error.show();

            var message = 'Unknown error';
            if(error && error.responseJSON){
               message = error.responseJSON.message;
            }

            this.ui.error.find('.error-message').text(message);
        }

    });
});