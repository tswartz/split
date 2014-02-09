define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        VenmoView           = require('app/views/Venmo'),
        tpl                 = require('text!tpl/Trip.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (data) {
            this.tripResults = new Object();
            this.trip = data.trip;
            this.el = data.el;
        },

        render: function () {
            this.$el.empty().html(template(this.tripResults));
            return this;
        },

        events: {
            "click #split-trip": 'splitTrip'
        },

        calculateTrip: function() {
            var that = this;
            var totalDistance = 1;
            var mileage = "";
            var googleUrl = "http://maps.googleapis.com/maps/api/directions/json?origin=" + 
                            this.trip.get('start') + 
                            "&destination=" + 
                            this.trip.get('destination') +
                            "&sensor=false";
            var encodedUrl = encodeURIComponent(googleUrl);
            var proxyUrl = 'http://jsonp.guffa.com/Proxy.ashx?url=' + encodedUrl;
            $.ajax({dataType: 'jsonp',
                    url: proxyUrl}).done(function(data){
                        mileage = data.routes[0].legs[0].distance.text;
                        var totalDistance = parseInt(mileage.split(' ')[0].replace(",",""));
                        var avgGasPrice = 3.270;
                        var totalCost = (totalDistance/that.trip.get('mpg')) * avgGasPrice;
                        that.tripResults = {
                            mileage: mileage,
                            avgGasPrice: avgGasPrice,
                            totalCost: totalCost.toFixed(2),
                            costPerPerson: (totalCost/that.trip.get('people')).toFixed(2)
                        };
                        that.render();
            });
        },

        splitTrip: function(e) {
            this.venmoView = new VenmoView({trip: this.trip, el: $("body")});
            this.venmoView.render();
        }

    });

});