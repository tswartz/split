define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Venmo.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (data) {
            this.trip = data.trip;
            this.render();
        },

        events: {
            "click #send-charges": "sendCharges"
        },

        render: function () {
            this.$el.empty().html(template({numPeople: this.trip.get('people')-1}));
            return this;
        },

        sendCharges: function(e) {

        }

    });

});