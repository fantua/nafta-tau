App.Templates = App.Templates || {};

(function () {
    'use strict';

    App.Templates.Step_1 = '<svg height="400px" width="980px"> \
        <line x1="50" y1="100" x2="150" y2="100" class="line" /> \
        <polyline points="150,90 150,110 180,100 150,90" class="triangle" /> \
         \
        <circle cx="195" cy="100" r="15" class="circle" /> \
        <line x1="185" y1="90" x2="205" y2="110" class="line" /> \
        <line x1="208" y1="90" x2="185" y2="110" class="line test" /> \
         \
        <g id="sections"></g> \
        \
        <line x1="<%= 210 + 160 * App.Config.links %>" y1="100" x2="950" y2="100" class="line" id="test" /> \
        <polyline points="950,90 950,110 980,100 950,90" class="triangle" /> \
         \
        <line x1="900" y1="100" x2="900" y2="320" class="line" /> \
        <line x1="900" y1="320" x2="195" y2="320" class="line" /> \
        <line x1="195" y1="320" x2="195" y2="145" class="line" /> \
        <polyline points="185,145 195,115 205,145 185,145" class="triangle" /> \
        </svg>\
        <button class="next">Готово</button>';

})();
