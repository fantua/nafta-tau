window.App = {
    Links: {},
    Models: {},
    Templates: {},
    Views: {},
    Router: {},
    Config: {
        links: 2,
        w: {
            min: 0,
            max: 50
        }
    },
    init: function () {
        'use strict';
        new App.Router.Default();
    }
};

$(document).ready(function () {
    'use strict';
    App.init();
    location.hash = '!/';
    Backbone.history.start();
});