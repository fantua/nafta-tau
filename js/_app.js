
var canvas, context, points = [];

// Determine where the user clicked, I believe I pulled this from elsewhere on StackOverflow a while ago.
function getCursorPosition(e) {
    var mx, my;
    if (e.pageX || e.pageY) {
        mx = e.pageX;
        my = e.pageY;
    }
    else {
        mx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        my = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    mx -= canvas.offsetLeft;
    my -= canvas.offsetTop;
    return {x: mx, y: my};
}

// Once we have at least two points, draw a line between them.
function drawPath() {
    context.beginPath();
    for (var i = 0; i < points.length - 1; i++) {
        context.moveTo(points[i]['x'], points[i]['y']);
        context.lineTo(points[i+1]['x'], points[i+1]['y']);
        context.stroke();
    }
    context.closePath();
}

// Listen for clicks, and redraw the map when they occur.
function initPointCollection() {
    var move = false,
        movePath = context.beginPath();

    canvas.onclick = function(e) {
        var point = getCursorPosition(e);
        console.log(point);
        if (!points.length) {
            point.x = 28;
        } else if (points.length % 2) {
            point.y = points[points.length - 1].y;
        } else {
            point.x = points[points.length - 1].x;
        }


        points.push(point);

        if (points.length > 1) {
            drawPath();
        } else {
            move = true;
        }
    }

    canvas.addEventListener('mousemove', function (e) {
        if (move) {
            var point = getCursorPosition(e);

            context.beginPath();
            context.moveTo(points[points.length - 1]['x'], points[points.length - 1]['y']);
            context.lineTo(point.x, point.y);
            context.stroke();
            context.closePath();
        }
    }, false);
}

function init() {
    // Load up your image.  Don't attempt to draw it until we know it's been loaded.
    var mountain = new Image();
    mountain.onload = function() {
        context.drawImage(this, 0, 0);
        initPointCollection();
    }
    mountain.src = 'https://pp.vk.me/c628521/v628521889/2246e/XrvsU-mhedA.jpg';  // Replace with actual image.
}

// Should check if document has finished loading first, but I'm too lazy, especially without JQuery.
$(function () {
    //canvas = document.getElementById("canvas");
    //context = document.getElementById('canvas').getContext('2d');

    //init();


    var paper = Snap("#svg");

    var background = paper.image('img/simulator.png');
    var sigma, tp, k;
    var helpLine = null;
    var lines = [];

    var getCoords = function (x, y) {
        x -= paper.node.offsetLeft;
        y -= paper.node.offsetTop;

        return {x: x, y: y};
    };

    $('#submit').click(function () {
        tp = $('#tp').val();
        sigma = $('#sigma').val();
        sigma = 374 - ((sigma - 10) * 9.1);
        helpLine = paper.line(28, sigma, 28, sigma);
        helpLine.attr({class: 'help-line'});
    });

    paper.click(function (e, x, y) {
        var coords = getCoords(x, y);

        if (helpLine == null) {
            if (!lines.length) {
                coords.x = 28;
            }

            helpLine = paper.line(coords.x, coords.y, coords.x, coords.y);
            helpLine.attr({class: 'help-line'});
        } else {
            var line, _coords = helpLine.attr();

            line = paper.line(_coords.x1, _coords.y1, _coords.x2, _coords.y2);
            line.attr({class: 'line'});
            lines.push(line);

            helpLine.attr({x1: _coords.x2, y1: _coords.y2});

            if (lines.length == 3) {
                helpLine.remove();
                k = parseFloat(prompt('Введіть визначене за допомогою графіка значення K'));
                console.log(sigma, tp, k);
                console.log('Wзр = ', k * Math.PI / tp);
            }
        }

    });


    paper.mousemove(function (e, x, y) {
        if (helpLine && !helpLine.removed) {
            var coords = getCoords(x, y);

            if (lines.length % 2) {
                coords.x = helpLine.attr('x1');
            } else {
                coords.y = helpLine.attr('y1');
            }

            helpLine.attr({x2: coords.x, y2: coords.y});
        }
    })
});