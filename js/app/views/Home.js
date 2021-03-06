define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        TripView            = require('app/views/Trip'),
        models              = require('app/models/trip'),
        tpl                 = require('text!tpl/Home.html'),

        template = _.template(tpl);


    return Backbone.View.extend({

        initialize: function () {
            this.trip = new models.Trip();
            this.render();
        },

        render: function () {
            this.$el.empty().html(template());
            return this;
        },

        events: {
            "click #calculate-trip":  "search",
        },

        search: function (event) {
            var mpg = $('#mpg').val() ? parseInt($('#mpg').val()) : 25
            this.trip.set({start:$('#start').val(), destination:$('#destination').val(), 
                people:parseInt($('#people').val()), mpg:mpg});
            this.tripView = new TripView({trip: this.trip, el: $("body")});
            this.tripView.calculateTrip();
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        }

    });

});