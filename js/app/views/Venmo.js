define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        SuccessView         = require('app/views/Success'),
        tpl                 = require('text!tpl/Venmo.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (data) {
            this.trip = data.trip;
            this.passengers = this.trip.get('people')-1;
            this.accessToken = 'YOUR ACCESS TOKEN HERE';
            this.render();
        },

        events: {
            "click #send-charges": "sendCharges"
        },

        render: function () {
            this.$el.empty().html(template({numPeople: this.passengers}));
            return this;
        },

        sendCharges: function(e) {
            var that = this;
            for(var i=0;i<this.passengers;i++){
                var email = $('#passenger-'+i).val(),
                    amount = 0-this.trip.get('costPerPerson');
                var localUrl = "http://localhost:5000?" +
                                "access_token=" + this.accessToken  +
                                "&email=" + encodeURIComponent(email) +
                                "&note=" + encodeURIComponent("Thanks for the gas!") +
                                "&amount=" + amount;
                $.ajax({
                    url: localUrl,
                    type: "POST",
                    dataType: "json"
                }).done(function(data){
                    if (data["data"]) {
                        that.successView = new SuccessView({el: $("body")});
                        that.successView.render();
                    } else if (data["error"]) {
                        for(var i=0;i<this.passengers;i++){
                            $('#passenger-'+i).val("");
                        }
                        $('.content-container').append("<p class='error'>" + data["error"]["message"] + "</p>");
                    }
                })
            }
        }

    });

});