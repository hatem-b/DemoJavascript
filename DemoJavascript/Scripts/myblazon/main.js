// MyBlazon JS lib - v0.1.0.0 (semver: 1.0.0-beta)
var myblazon;
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





    /** DesignBlazon / Index    **/

    /** Actions / Index    **/

    var actionsIndex =
    {
        saveShieldForDwl: function () {
            var helmet, crest, mantling, supporters, banner;
            helmet = crest = mantling = supporters = banner = false;

            if ($('#ohelmet').hasClass('active'))
                helmet = true;

            if ($('#ocrest').hasClass('active'))
                crest = true;

            if ($('#omantling').hasClass('active'))
                mantling = true;

            if ($('#osupporters').hasClass('active'))
                supporters = true;

            var dataString = 'helmet=' + helmet + '&crest=' + crest + '&mantling=' + mantling + '&supporters=' + supporters + '&banner=' + banner;

            return dataString;
        },

        dwlSD: function ($loading_img_sd, urlActionSave, urlActionDownload) {
            $loading_img_sd.show();

            var dataString = saveShieldForDwl();

            $.ajax({
                type: "POST",
                async: true,
                url: urlActionSave,
                data: dataString,
                success: function (response) {
                    $loading_img_sd.hide();
                    window.location.href = urlActionDownload;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $loading_img_sd.hide();
                }
            });
        },

        dwlHD: function ($loading_img_hd, urlActionSave, urlActionDownload) {
            $loading_img_hd.show();

            var dataString = saveShieldForDwl();

            $.ajax({
                type: "POST",
                async: true,
                url: urlActionSave,
                data: dataString,
                success: function (response) {
                    $loading_img_hd.hide();

                    window.location.href = urlActionDownload;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $loading_img_hd.hide();
                }
            });
        }
    };
    exports.actionsIndex = actionsIndex;

})(window.jQuery, window.myblazon = window.myblazon || {});