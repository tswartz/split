define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Trip.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (data) {
            this.trip = data.trip
            this.render();
        },

        render: function () {
            this.$el.empty().html("<p>" + this.trip.get('start') + "</p>");
            //this.$el.html(template(this.model.attributes));
            return this;
        },

        calculateTrip: function() {

            this.tripResults = {
                
            }
            this.render();
        }

    });

});