App.Router = App.Router || {};

(function () {
    'use strict';

    App.Router.Default = Backbone.Router.extend({

        routes: {
            '(!/)': 'start',
            '!/step/:id': 'step',
            '!/step/1/link/:id/setup': 'linkSetup'
        },

        initialize: function () {
        },

        start: function () {
            var view = new App.Views.Init();
            $('body').empty().append(view.render().$el);
        },

        step: function (id) {
            switch (id) {
                case '1':
                    var view = new App.Views.Step_1();
                    $('#step-1').remove();
                    $('#step-2').remove();
                    $('body').append(view.render().$el);
                    break;
                case '2':
                    var view = new App.Views.Step_2();
                    $('#step-2').remove();
                    view.render();
                    break;
            }
        },

        linkSetup: function (id) {
            id = parseInt(id);
            var view = new App.Views.Setup({
                model: id
            });
            $('#step-1').append(view.render().$el);
        }

    });

})();