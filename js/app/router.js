define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        HomeView    = require('app/views/Home'),

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "trip": "calculateTrip"
        },

        home: function () {
            homeView.delegateEvents();
            slider.slidePage(homeView.$el);
        },

        calculateTrip: function (id) {
            require(["app/models/trip", "app/views/Trip"], function (models, TripView) {
                var trip = new models.Trip();
                trip.fetch({
                    success: function (data) {
                        slider.slidePage(new TripView({model: data}).$el);
                    }
                });
            });
        }

    });

});