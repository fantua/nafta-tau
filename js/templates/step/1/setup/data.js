App.Templates = App.Templates || {};

(function () {
    'use strict';

    App.Templates.Data = '\
            <div class="form-group"> \
                <div class="input-group"> \
                    <div class="input-group-addon">K<sub><%= type %></sub>:</div> \
                    <input class="form-control" name="K" type="number" step="0.0001" placeholder="Введіть дані" required autofocus> \
                </div> \
            </div> \
            <% if (type > 2) { %> \
            <div class="form-group"> \
                <div class="input-group"> \
                    <div class="input-group-addon">T<sub><%= type %></sub>:</div> \
                    <input class="form-control" name="T" type="number" step="0.0001" placeholder="Введіть дані" required> \
                </div> \
            </div> \
            <% } %> \
            <div class="form-group"> \
                <div class="input-group"> \
                    <div class="input-group-addon">W:</div> \
                    <select class="form-control" name="w"> \
                        <% for (var i = App.Config.w.min; i <= App.Config.w.max; ++i) { %> \
                        <option value="<%= i %>"><%= i %></option> \
                        <% } %> \
                    </select> \
                </div>\
            </div>';

})();
