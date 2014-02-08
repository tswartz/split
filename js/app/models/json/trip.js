define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        Trip = Backbone.Model.extend({

            urlRoot: "http://localhost:3000/trip",

            initialize: function () {
            }

        });

    return {
        Trip: Trip,
    };

});