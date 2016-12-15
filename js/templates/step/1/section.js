App.Templates = App.Templates || {};

(function () {
    'use strict';

    App.Templates.Section = '<% var x1 = 50 + n * 160, x2 = x1 + 50 %>\
            <line x1="<%= x1 %>" y1="100" x2="<%= x2 %>" y2="100" class="line" /> \
            <polyline points="<%= x2 %>,90 <%= x2 %>,110 <%= x2 + 30 %>,100 <%= x2 %>,90" class="triangle" /> \
            <g class="link" data-id="<%= n %>"> \
                <rect x="<%= x2 + 30 %>" y="80" width="80" height="40" class="rect <% if (App.Links[n]) { %>selected<% } %>" /> \
                <text x="<%= x2 + 60 %>" y="105" class="text">W<%= n %></text>\
            </g>\
            <% if (App.Links[n]) { %> \
                <line x1="<%= x2 + 70 %>" y1="150" x2="<%= x2 + 70 %>" y2="120" class="line" /> \
                <polyline points="<%= x2 + 65 %>,150 <%= x2 + 75 %>,150 <%= x2 + 70 %>,160 <%= x2 + 65 %>,150" class="triangle" /> \
                <image \
                    x="<%= x2 %>" \
                    y="160" \
                    width="<%= App.Links[n].get("Helper").image.width %>" \
                    height="<%= App.Links[n].get("Helper").image.height %>"\
                    xlink:href="img/w_<%= App.Links[n].get("Type") %>.gif" \
                /> \
                <text x="<%= x2 %>" y="210" class="text"> \
                    K: <%= App.Links[n].get("K") %> \
                    <% if (App.Links[n].get("T")) { %> T: <%= App.Links[n].get("T") %> <% } %> \
                    w: <%= App.Links[n].get("w") %> \
                </text> \
            <% } %>';

})();
