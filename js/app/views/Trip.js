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
            var totalDistance = 1
            var googleUrl = "http://maps.googleapis.com/maps/api/directions/json?origin=" + 
                            this.trip.get('start') + 
                            "&destination=" + 
                            this.trip.get('destination') +
                            "&sensor=false";
            var encodedUrl = encodeURIComponent(googleUrl);
            var proxyUrl = 'http://jsonp.guffa.com/Proxy.ashx?url=' + encodedUrl;
            $.ajax({dataType: 'jsonp',
                    url: proxyUrl}).done(function(data){
                totalDistance = data.routes[0].legs[0].distance.text
            });

            this.tripResults = {
                
            }
            this.render();
        }

    });

});