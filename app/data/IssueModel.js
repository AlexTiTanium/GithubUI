"use strict";

define([
    'backbone'
], function(Backbone) {

    /**
     * @class IssueModel
     */
    return Backbone.Model.extend({
        defaults: {
            id: 0,
            title: "",
            number: 0,
            created_at: "",
            state: "",
            user: { login: "",  html_url: ""}
        }

    });
});