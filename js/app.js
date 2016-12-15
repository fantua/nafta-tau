'use strict';

var App = App || {};

(function () {
    App = {

        modal: null,
        graph: null,

        selectors: {
            body: 'body',
            modal: '#modal',
        },

        settings: {},

        sections: {
            count: null,
            data: {},
            helper: {
                1: {
                    image: {
                        width: 95,
                        height: 18
                    },
                    downStep: 0,
                    T: false,
                    getT: function () {
                        return 0;
                    }
                },
                2: {
                    image: {
                        width: 99,
                        height: 37
                    },
                    downStep: 20,
                    T: false,
                    getT: function () {
                        return 1;
                    }
                },
                3: {
                    image: {
                        width: 137,
                        height: 39
                    },
                    downStep: 20,
                    T: true,
                    getT: function (val) {
                        return 1 / val;
                    }
                },
                4: {
                    image: {
                        width: 145,
                        height: 41
                    },
                    downStep: 40,
                    T: true,
                    getT: function (val) {
                        return 1 / val;
                    }
                }
            }
        },

        init: function () {
            this.setupModal();
            this.configure();
        },

        setupModal: function () {
            this.modal = $(this.selectors.modal);
            this.modal.on('hidden.bs.modal', function () {
                $('.modal-content', this).empty();
            });
        },

        configure: function () {
            var self = this;

            $.get('templates/start.mst').done(function (template) {
                var rendered = Mustache.render(template);

                self.modal.find('.modal-content').html(rendered);
                self.modal.modal('show');

                self.modal.find('form').submit(function (e) {
                    e.preventDefault();

                    self.sections.count = $('input[name=count]:checked', this).val();
                    self.modal.modal('hide');

                    self.drawSchema();
                });
            });
        },

        drawSchema: function () {
            var self = this;

            $.get('templates/schema.mst').done(function (template) {
                self.renderSchema(template);
            });
        },

        renderSchema: function (template) {
            var self = this,
                count = this.sections.count,
                data = {
                    x1: function () {
                        return 210 + 160 * count;
                    },
                    sections: [],
                    prepare: function () {
                        this.x1 = 50 + this.id * 160;
                        this.x2 = this.x1 + 50;
                        this.configured = (typeof self.sections.data[this.id] !== 'undefined');

                        if (this.configured) {
                            this.type = self.sections.data[this.id].type;
                            this.imageWidth = self.sections.helper[this.type].image.width;
                            this.imageHeight = self.sections.helper[this.type].image.height;
                            this._T = self.sections.helper[this.type].T;
                            this.T = 1 / self.sections.data[this.id].T;
                            this.K = self.sections.data[this.id].K;
                        }

                        // helper:
                        this._x2 = function () {
                            return function(val) {
                                return this.x2 + parseInt(val);
                            }
                        };
                    }
                };

            for (var i = 1; i <= count; ++i) data.sections.push({id: i});

            $('#schema-group').remove();
            var rendered = Mustache.render(template, data);
            $(this.selectors.body).append(rendered);

            // section configuration:
            $('#schema g.section').click(function (e) {
                var id = $(this).data('id');

                $.get('templates/configure-section.mst').done(function (sectionTemplate) {
                    self.renderSectionConfiguration(id, sectionTemplate, template);
                });
            });

            if (Object.keys(this.sections.data).length == count) {
                $('#next').prop('disabled', false);
                $('#next').click(function () {
                    $(this).remove();
                    self.drawFirstGraph();
                });
            }
        },

        renderSectionConfiguration: function (id, template, schemaTemplate) {
            var self = this;

            var rendered = Mustache.render(template, {id: id});
            this.modal.find('.modal-content').html(rendered);
            this.modal.modal('show');

            this.modal.find('#set-data').hide();

            // events:
            this.modal.find('input[name=type]').change(function () {
                var type = this.value,
                    setT = self.sections.helper[type].T;

                self.modal.find('#set-data').show();
                self.modal.find('#set-t').toggle(setT);
                self.modal.find('#set-t input').prop('required', setT);
            });
            this.modal.find('form').submit(function (e) {
                e.preventDefault();

                var type = parseInt($('input[name=type]:checked', this).val()),
                    k = parseFloat($('input[name=k]', this).val()),
                    t = self.sections.helper[type].getT(parseFloat($('input[name=t]', this).val()));

                self.sections.data[id] = { type: type, K: k, T: t };

                self.renderSchema(schemaTemplate)
                self.modal.modal('hide');
            });
        },

        drawFirstGraph: function () {
            var self = this,
                dataset = [],
                arr = [],
                K = 1,
                step = 0;

            $.each(this.sections.data, function(index, section) {
                arr.push(section);
                K *= section.K;
            });

            arr = arr.sort(function (a, b) {
                if (a.T < b.T) return -1;
                if (a.T > b.T) return 1;
                return 0;
            });
            K = Math.round(20 * Math.log10(K));

            arr.forEach(function (el) {
                K -= step;
                step += self.sections.helper[el.type].downStep;

                dataset.push({x: el.T, y: K});
            });

            // fix:
            if (dataset[0].x > 1) dataset.unshift({x: 0, y: dataset[0].y});

            dataset.push({x: 1000, y: K - step});

            console.log(dataset);

            $.get('templates/graph.mst').done(function (template) {
                var rendered = Mustache.render(template);
                $(self.selectors.body).append(rendered);

                self.graph = new Graph('#graph');
                self.graph.setTitles('lg w (декади)', '20lgA(w) (Дб)');
                self.graph.line(dataset);

                $('#next').click(function () {
                    $(this).remove();
                    self.simulator();
                });
            });

        },

        simulator: function () {
            var self = this;

            $.get('templates/simulator.mst').done(function (template) {
                var rendered = Mustache.render(template);
                self.modal.find('.modal-content').html(rendered);
                self.modal.modal('show');

                self.modal.find('#simulator-group').hide();
                self.modal.find('#set-k').hide();

                self.modal.find('form').submit(function (e) {
                    e.preventDefault();

                    var form = $(this),
                        sigma = form.find('input[name=sigma]').val(),
                        tp = form.find('input[name=t]').val();

                    form.find('#simulator-group').show();
                    form.find('button').prop('disabled', true);

                    self.drawSimulator(sigma, function () {
                        form.find('#set-k').show();
                        form.find('button').prop('disabled', false);
                        form.find('input[name=k]').prop('required', true);
                        form.off().submit(function (e) {
                            e.preventDefault();

                            var k = form.find('input[name=k]').val();

                            console.log('Wзр = ', k * Math.PI / tp);
                        });
                    });
                });
            });
        },

        drawSimulator: function (sigma, callback) {
            var paper = Snap("#simulator"),
                helpLine = null,
                lines = [];

            sigma = 374 - ((sigma - 10) * 9.1);

            paper.image('img/simulator.png');
            helpLine = paper.line(28, sigma, 28, sigma);
            helpLine.attr({class: 'help-line'});

            paper.click(function (e, x, y) {
                var line, coords = helpLine.attr();

                line = paper.line(coords.x1, coords.y1, coords.x2, coords.y2);
                line.attr({class: 'line'});
                lines.push(line);

                helpLine.attr({x1: coords.x2, y1: coords.y2});

                if (lines.length == 3) {
                    helpLine.remove();
                    callback.call(null);
                }

            });


            paper.mousemove(function (e) {
                if (helpLine && !helpLine.removed) {
                    var fix = e.target.getBoundingClientRect(),
                        x = e.clientX - fix.left,
                        y = e.clientY - fix.top;

                    if (lines.length % 2) {
                        x = helpLine.attr('x1');
                    } else {
                        y = helpLine.attr('y1');
                    }

                    helpLine.attr({x2: x, y2: y});
                }
            })
        },

        drawSecondGraph: function () {

        }




    };
})();