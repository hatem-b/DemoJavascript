// MyBlazon JS lib - v0.1.0.0 (semver: 1.0.0-beta)
var myBlazon;
(function ($, exports) {
    var popup = {
        activate: function ($popup) {
            if (!$popup || !$popup.length) { return; }

        },
        deactivate: function ($popup) {

        },
        show: function (id) {
            var $popup = $("#" + id);

            if ($popup.length === 0) {
                console.log("Can't show unknown popup");
                return;
            }
            $popup.addClass('in');
            $popup.fadeIn();
        },
        hide: function (id) {
            var $popup = $("#" + id);

            if ($popup.length === 0) {
                console.log('Unknown popup');
                return;
            }

            $popup.fadeOut();
        }
    };

    exports.popup = popup;

    $(document).ready(function () {
        $(".popup-opener").click(function (event) {
            event.preventDefault();
            var popupId = $(this).data('popup');
            if (!popupId) { return; }
            myBlazon.popup.show(popupId);
        });
        $('.popup-closer').click(function (event) {
            event.preventDefault();
            myBlazon.popup.hide($(this).closest('.popup').attr('id'));
            return false;
        });
    });

})(window.jQuery, window.myBlazon = window.myBlazon || {});