"use strict";

define([
    'backbone'
], function (Backbone) {

    /**
     * @class RepositoryModel
     */
    return Backbone.Model.extend({

        defaults: {

            id: 0,
            name: "",
            description: "",
            full_name: "",
            owner: {login: ""},

            // Used for filter
            include: true
        }

    });
});