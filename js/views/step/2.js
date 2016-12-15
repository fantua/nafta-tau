App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.Step_2 = Backbone.View.extend({

        tagName: 'div',
        id: 'step-2',
        className: '',

        events: {
            'click .next': 'next'
        },

        initialize: function () {
            this.template = _.template(App.Templates.Step_2);
        },

        render: function () {
            this.$el.html(this.template());

            $('body').append(this.$el);

            var k = 1,
                blocks = [],
                x = [],
                data = [],
                step = 0;

            _.each(App.Links, function (item) {
                blocks.push({t: item.get('Helper').t, model: item});
                k *= parseInt(item.get('K'));
            });

            blocks = blocks.sort(function (a, b) {
                if (a.t < b.t) return -1;
                if (a.t > b.t) return 1;
                return 0;
            });

            console.log(blocks);

            k = Math.round(20 * Math.log10(k));

            _.each(blocks, function (item) {
                k = k - step;
                step += item.model.get('Helper').downStep;
                data.push({
                    category: item.t,
                    'column-1': k,
                    name: 'W' + item.model.get('Type'),
                    step: step
                });
            });

            data.push({
                category: '∞',
                'column-1': k - step,
                'column-2': k - step
            });

            var chart = AmCharts.makeChart("chart", {
                "type": "serial",
                "pathToImages": "//cdn.amcharts.com/lib/3/images/",
                "categoryField": "category",
                "startDuration": 1,
                "categoryAxis": {
                    "gridPosition": "middle"
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "Ланка: [[name]]\n Амплітуда: [[value]]\n Частота: [[category]]\n Спад: [[step]] дб/дек",
                        "bullet": "round",
                        "id": "AmGraph-1",
                        "title": "graph 1",
                        "valueField": "column-1"
                    },
                    {
                        "balloonText": "",
                        "bullet": "round",
                        "id": "AmGraph-2",
                        "title": "graph 2",
                        "valueField": "column-2",
                        "bulletColor": "#fff"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": "Axis title"
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "useGraphSettings": false
                },
                "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": "Chart Title"
                    }
                ],
                "dataProvider": data
            });

            return this;
        },

        next: function () {
            Backbone.history.navigate('!/step/2', true);

            return false;
        }

    });

})();
