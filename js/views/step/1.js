App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.Step_1 = Backbone.View.extend({

        tagName: 'div',
        id: 'step-1',
        className: '',

        events: {
            'click g.link': 'setup',
            'click .next': 'next'
        },

        initialize: function () {
            this.template = _.template(App.Templates.Step_1);
        },

        render: function () {
            this.$el.html(this.template());

            for (var n = 1; n <= App.Config.links; n++) {
                var template = _.template(App.Templates.Section);
                this.$('#sections').html(this.$('#sections').html() + template({n: n}));
            }

            return this;
        },

        setup: function (e) {
            var id = this.$(e.currentTarget).data('id');
            Backbone.history.navigate('!/step/1/link/' + id + '/setup', true);

            return false;
        },

        next: function () {
            var size = 0, key;
            for (key in App.Links) {
                if (App.Links.hasOwnProperty(key)) size++;
            }

            if (size !== App.Config.links) {
                return alert('Потрібно сконфігурувати всі ланки');
            }

            Backbone.history.navigate('!/step/2', true);

            return false;
        }

    });

})();
