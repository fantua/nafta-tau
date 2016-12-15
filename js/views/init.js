App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.Init = Backbone.View.extend({

        tagName: 'div',
        id: '',
        className: '',

        events: {
            'click .next': 'next'
        },

        initialize: function () {
            this.template = _.template(App.Templates.Init);
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        },

        next: function () {
            App.Config.links = parseInt(this.$('#links-selector').val());
            Backbone.history.navigate('!/step/1', true);

            return false;
        }

    });

})();
