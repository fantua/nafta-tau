App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.Setup = Backbone.View.extend({

        tagName: 'div',
        id: 'link-setup',
        className: '',

        type: null,

        events: {
            'hidden.bs.modal #popup': 'close',
            'change input[type=radio]': 'insertData',
            'submit': 'setData'
        },

        initialize: function () {
            this.template = _.template(App.Templates.Popup);
        },

        render: function () {
            this.$el.html(this.template({
                id: this.model,
                type: this.type
            }));
            this.$('#popup').modal('show');

            return this;
        },

        insertData: function (e) {
            this.type = e.currentTarget.value;
            var template = _.template(App.Templates.Data);
            this.$('#data').html(template({
                type: this.type
            }));
        },

        setData: function () {
            var obj = {};
            _.each(this.$('form').serializeArray(), function (item) {
                obj[item.name] = item.value;
            });
            obj.Name = 'W' + this.model;
            App.Links[this.model] = new App.Models.Link(obj);
            this.$('#popup').modal('hide');

            return false;
        },

        close: function () {
            this.remove();
            Backbone.history.navigate('!/step/1', true);

            return false;
        }

    });

})();
