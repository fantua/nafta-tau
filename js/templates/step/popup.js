App.Templates = App.Templates || {};

(function () {
    'use strict';

    App.Templates.Popup = '<div class="modal fade" id="popup"> \
        <div class="modal-dialog"> \
        <div class="modal-content"> \
            <form role="form"> \
            <div class="modal-header"> \
                <button type="button" class="close" data-dismiss="modal">\
                    <span aria-hidden="true">&times;</span><span class="sr-only">Закрити</span> \
                    </button> \
                <h4 class="modal-title">Сконфігуруйте ланку W<%= id %></h4> \
            </div> \
            <div class="modal-body"> \
                <div class="radio"> \
                    <label> \
                        <input type="radio" name="Type" value="1" required> \
                        <img src="img/w_1.gif"> \
                    </label> \
                </div> \
                <div class="radio"> \
                    <label> \
                        <input type="radio" name="Type" value="2"> \
                        <img src="img/w_2.gif"> \
                    </label> \
                </div> \
                <div class="radio"> \
                    <label> \
                        <input type="radio" name="Type" value="3"> \
                        <img src="img/w_3.gif"> \
                    </label> \
                </div> \
                <div class="radio"> \
                    <label> \
                        <input type="radio" name="Type" value="4"> \
                        <img src="img/w_4.gif"> \
                    </label> \
                </div> \
                <div id="data" class="form-inline"></div> \
            </div> \
            <div class="modal-footer"> \
                <button type="submit" class="btn btn-primary">Готово</button> \
            </div> \
            </form> \
        </div> \
        </div> \
    </div>';

})();
