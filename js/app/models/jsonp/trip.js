define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        Trip = Backbone.Model.extend({

            urlRoot: "http://localhost:3000/trip",

            initialize: function () {
            }

        }),

        originalSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        if (method === "read") {
            options.dataType = "jsonp";
            return originalSync.apply(Backbone, arguments);
        }
    };

    return {
        Trip: Trip
    };

});