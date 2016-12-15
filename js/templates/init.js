/*global App, Backbone*/

App.Templates = App.Templates || {};

(function () {
    'use strict';

    App.Templates.Init = '\
    <label>Виберіть кількість ланок:</label> \
    <select id="links-selector"> \
        <option <%= (App.Config.links === 2) ? "selected" : "" %>>2</option> \
        <option <%= (App.Config.links === 3) ? "selected" : "" %>>3</option> \
        <option <%= (App.Config.links === 4) ? "selected" : "" %>>4</option> \
    </select> \
    <button class="next">Готово</button> \
    ';

})();
