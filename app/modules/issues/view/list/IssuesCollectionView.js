"use strict";

define([
    'marionette',
    './IssueItemView',
    './EmptyIssuesView',
    'data/IssuesCollection',
    "ldsh!../../templates/list/IssuesCollectionView.html"
], function(Marionette, IssueItemView, EmptyIssuesView, issuesCollection, template) {

    /**
     * Render issues list
     */
    return Marionette.CompositeView.extend({

        childViewContainer: ".list-child-view",

        childView: IssueItemView,
        emptyView: EmptyIssuesView,

        collection: issuesCollection,
        template: template

    });
});