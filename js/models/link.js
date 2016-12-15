/*global App, Backbone*/

App.Models = App.Models || {};

(function () {
    'use strict';

    App.Models.Link = Backbone.Model.extend({

        defaults: {
            'Name': null,
            'Type': null,
            'K': null,
            'T': null,
            'w': null,
            'Helper': {
                image: {
                    width: null,
                    height: null
                }
            }
        },

        initialize: function() {
            this.prepare();
        },

        prepare: function () {
            var helper = _.extend({}, this.get('Helper')),
                t = this.get('T');

            switch (this.get('Type')) {
                case '1':
                    t = 0;
                    helper = {
                        image: {
                            width: 95,
                            height: 18
                        },
                        downStep: 0,
                        t: t
                    };

                    break;
                case '2':
                    t = 1;
                    helper = {
                        image: {
                            width: 99,
                            height: 37
                        },
                        downStep: 20,
                        t: t
                    };

                    break;
                case '3':
                    helper = {
                        image: {
                            width: 137,
                            height: 39
                        },
                        downStep: 20,
                        t: 1 / t
                    };

                    break;
                case '4':
                    helper = {
                        image: {
                            width: 145,
                            height: 41
                        },
                        downStep: 40,
                        t: 1 / t
                    };

                    break;

            }

            this.set({
                Helper: helper,
                T: t
            });

        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
