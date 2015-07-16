"use strict";

define([
    'marionette',
    "ldsh!../../templates/list/EmptyIssuesView.html"
], function(Marionette, template) {

    /**
     * Renders only if issues collection is empty
     */
    return Marionette.ItemView.extend({
        template: template
    });
});