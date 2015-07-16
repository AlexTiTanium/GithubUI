"use strict";

define([
    'marionette',
    "ldsh!../../templates/list/EmptyView.html"
], function (Marionette, template) {

    /**
     * Renders only if repositories collection is empty
     */
    return Marionette.ItemView.extend({
        template: template
    });
});