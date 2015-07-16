"use strict";

define([
    'lodash',
    'marionette',
    'bloodhound',
    'data/IssuesCollection',
    'data/RepositoriesCollection',
    'ldsh!../templates/SearchView.html',
    'typeahead'
], function (_, Marionette, Bloodhound, issuesCollection, repositoriesCollection, template) {

    /**
     * Render owner login input, init owner autocomplete, navigate to repositories list
     *
     * @class SearchView
     * @name SearchView
     */
    return Marionette.ItemView.extend({

        el: '#search',

        template: template,

        // Data
        repositories: repositoriesCollection,
        issues: issuesCollection,

        ui: {
            owner: 'input[name="owner"]'
        },

        events: {
            'keyup @ui.owner': 'onSelectOwner',
            'typeahead:selected @ui.owner': 'onSelectOwner'
        },

        /**
         * @constructor
         */
        initialize: function () {

            this.listenTo(this.repositories, 'error', this.onError);
            this.listenTo(this.repositories, 'sync', this.updateOwnerName);
            this.listenTo(this.issues, 'sync', this.updateOwnerName);
        },

        /**
         * On view render
         */
        onRender: function () {
            this.initAutocomplete();
        },

        /**
         * Init autocomplete for owner input
         */
        initAutocomplete: function () {

            var engine = new Bloodhound({
                name: 'users',
                remote: {
                    url: application.gitHubAPI + '/search/users?q=%QUERY',
                    filter: function (data) {
                        return data.items;
                    }
                },
                datumTokenizer: function (d) {
                    return Bloodhound.tokenizers.whitespace(d.val);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace
            });

            engine.initialize();

            this.ui.owner.typeahead({minLength: 3}, {
                displayKey: 'login',
                source: engine.ttAdapter()
            });
        },

        /**
         * Show repositories list by owner login
         *
         * @param {String} owner
         */
        getUserRepositories: function (owner) {

            this.ui.owner.typeahead('close');

            if (_.isEmpty(owner)) {
                repositoriesCollection.reset();
            }

            application.navigate(owner, {trigger: true});
        },

        /**
         * User pressed enter key in owner input
         *
         * @param {Event} event
         */
        onSelectOwner: _.debounce(function (event) {

            if (event.keyCode == 13 || event.type == 'typeahead:selected') {

                this.getUserRepositories(this.ui.owner.val());

            } else {
                this.hideError(this.ui.owner);
            }

        }, 600),

        /**
         * Repositories not fetched, something went wrong
         */
        onError: function (collection, xhr) {

            if (xhr && xhr.status === 404) {
                this.showError(this.ui.owner);
            } else {
                this.showError(this.ui.owner);
            }
        },

        /**
         * Set current owner login to input
         *
         * @param {RepositoriesCollection|IssuesCollection} collection
         */
        updateOwnerName: function (collection) {
            this.ui.owner.val(collection.owner);
            this.hideError(this.ui.owner);
        },

        /**
         * Show input error
         *
         * @param input
         */
        showError: function (input) {
            input.closest('.form-group').addClass('has-error');
        },

        /**
         * Hide input error
         *
         * @param input
         */
        hideError: function (input) {
            input.closest('.form-group').removeClass('has-error');
        }

    });
});