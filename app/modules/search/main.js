"use strict";

define([
    'marionette',
    './view/SearchView'
], function (Marionette, SearchView) {

    /**
     * Search module, render input for owner login
     */
    return Marionette.Module.extend({

        /**
         * Render search view on start
         */
        onStart: function () {
            this.layout = new SearchView();
            this.layout.render();
        }

    });
});