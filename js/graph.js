(function(window, document) {
    'use strict';

    var Graph = Graph || function (selector) {

        var paper,
            settings = {
                axis: {
                    y: {
                        class: 'axis',
                        padding: 10,
                        titles: {
                            class: 'y-label',
                            count: 3, // without 0
                            step: 20,
                            length: 60,
                            padding: 3,  // right
                            max: function () {
                                return this.count * this.step;
                            },
                            name: {
                                class: 'y-label-name',
                                padding: 10
                            }
                        }
                    },
                    x: {
                        class: 'axis',
                        padding: 40,
                        titles: {
                            class: 'x-label',
                            supClass: 'sup',
                            count: 3,
                            step: 10,
                            padding: 20,
                            length: function () {
                                return settings.axis.y.titles.length * 2.5;
                            },
                            max: function () {
                                return Math.pow(this.step, this.count);
                            },
                            name: {
                                class: 'x-label-name',
                                padding: 25
                            }
                        }
                    }
                },
                helpLine: {
                    class: 'help-line'
                },
                line: {
                    class: 'line',
                    point: {
                        size: 3,
                        class: ''
                    }
                }
            },

            drawYAxis = function () {
                var _settings = settings.axis.y,
                    _titles = _settings.titles;


                // draw axis vertical line:
                paper.line(
                    getCoordX(1),
                    getCoordY(_titles.max()),
                    getCoordX(1),
                    getCoordY(-_titles.max())
                ).attr({class: _settings.class});

                // draw axis titles:
                for (var i = _titles.count; i >= 0; --i) {
                    var val = i * _titles.step;

                    var drawTitle = function (name) {
                        paper.text(
                            getCoordX(1) - _titles.padding,
                            getCoordY(name),
                            name.toString()
                        ).attr({class: _titles.class});

                        drawHelpLine(
                            getCoordX(1),
                            getCoordY(name),
                            getCoordX(settings.axis.x.titles.max()),
                            getCoordY(name)
                        );
                    };

                    drawTitle(val);
                    if (val != 0) drawTitle(-val);
                }
            },

            drawXAxis = function () {
                var _settings = settings.axis.x,
                    _titles = _settings.titles;

                // draw axis horizontal line:
                var _maxY = getCoordY(-settings.axis.y.titles.max()),
                    _minY = getCoordY(settings.axis.y.titles.max());

                paper.line(
                    getCoordX(1),
                    _maxY,
                    getCoordX(_titles.max()),
                    _maxY
                ).attr({class: _settings.class});

                // draw axis titles:
                var val = 0;
                for (var i = 0; i <= _titles.count; ++i) {
                    val = Math.pow(_titles.step, i);

                    paper.text(
                        getCoordX(val),
                        _maxY + _titles.padding,
                        [10, i]
                    )
                        .attr({class: _titles.class})
                        .selectAll('tspan')[1].attr({class: _titles.supClass});

                    if (i < _titles.count) {
                        for (var k = 2; k <= 10; ++k) {
                            var _x = getCoordX(k * val);

                            drawHelpLine(_x, _minY, _x, _maxY);
                        }
                    }
                }
            },

            drawHelpLine = function (x1, y1, x2, y2) {
                paper.line(x1, y1, x2, y2).attr({class: settings.helpLine.class});
            },

            getCoordY = function (value) {
                var _settings = settings.axis.y,
                    coordinate;

                coordinate =
                    (_settings.titles.max() - value)
                    / _settings.titles.step
                    * _settings.titles.length;

                coordinate += _settings.padding;

                return coordinate;
            },

            getCoordX = function (value) {
                var _settings = settings.axis.x,
                    coordinate;

                if (!value) value = 1;

                coordinate = Math.round(Math.log10(value) * _settings.titles.length());
                coordinate += _settings.padding;

                return coordinate;
            },

            init = function (selector) {
                paper = Snap(selector);

                drawYAxis();
                drawXAxis();

            };


        this.line = function (dataset, attrs) {
            if (typeof attrs === 'undefined') attrs = {};
            if (!attrs.hasOwnProperty('class')) attrs.class = settings.line.class;

            dataset.forEach(function (point, i, arr) {
                var _attrs = point.attrs || {},
                    x = getCoordX(point.x),
                    y = getCoordY(point.y);

                if (!_attrs.hasOwnProperty('class')) _attrs.class = settings.line.point.class;
                if (!_attrs.hasOwnProperty('size')) _attrs.size = settings.line.point.size;

                //paper.circle(x, y, _attrs.size).attr({class: _attrs.class});

                if (i != 0) {
                    var start = arr[i - 1],
                        _x = getCoordX(start.x),
                        _y = getCoordY(start.y);

                    paper.line(_x, _y, x, y).attr({class: attrs.class});
                }
            });
        };

        this.setTitles = function (xAxis, yAxis) {
            paper.text(
                settings.axis.y.titles.name.padding,
                getCoordY(0),
                yAxis
            ).attr({class: settings.axis.y.titles.name.class, transform: 'r-90'});

            paper.text(
                (getCoordX(settings.axis.x.titles.max()) + settings.axis.x.padding) / 2,
                getCoordY(-settings.axis.y.titles.max()) + settings.axis.x.titles.name.padding,
                xAxis
            ).attr({class: settings.axis.x.titles.name.class});
        };

        init(selector);
    }

    this.Graph = Graph;

}).call(this, window, document);
