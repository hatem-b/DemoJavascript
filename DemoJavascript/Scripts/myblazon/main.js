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


$.validator.setDefaults({
    ignore: '',
    submitHandler: function () {

        if ($("#etape").valid()) {

            document.forms["etape"].submit();
            return false;
        }
    }
});

//DesignBlazon Index
$(document).ready(function () {

    //preload images
    Image1 = new Image(141, 60)
    Image1.src = "/images/crea-bouton-suite-on.png"
    Image2 = new Image(141, 60)
    Image2.src = "/images/crea-bouton-avant-on.png"

    $("#etape").validate({
        errorPlacement: function (error, element) {
            if (element.attr('type') == 'hidden') {
                error.css({ 'color': 'red', 'width': '720px', 'display': 'block', 'text-align': 'center' }).insertAfter(element);
            } else {
                error.css({ 'color': 'red', 'width': 'auto', 'margin': '0px 0px 0px 320px' }).insertBefore(element.prev());
            }
        },
        rules: {
            value3: {
                required: true
            }


        },
        messages: {
            value3: {
                required: "Please select 3 values"
            }
        }
    });
    $('.value').click(function () {

        if ($(this).data('dontclick') == 1)
            return false;

        var nr_values = $('#container_values_chosen div').length;
        if(nr_values == 2)
            fillHiddenValueFields($(this).attr('id'));

        if (nr_values < 3) {
            $(this).fadeTo(1000, 0.2, function () {
                $(this).css("cursor", "default");
            });

            $(this).data('dontclick', 1);

            var value = $('<div>').attr({ 'class': 'added', 'id': $(this).attr('id') }).css('display', 'none').html($(this).html()).click(function () {
                var id = $(this).attr('id');
                emptyHiddenValueFields(); //clear hidden fields for the ids of the selected values
                $(this).animate({
                    opacity: 0,
                    width: '-=100',
                    'margin-right': '-10',
                    height: $(this).css('height')
                }, 1000, function () {
                    $(this).remove();

                });

                $('#' + id).fadeTo(1000, 1, function () {
                    $(this).css("cursor", "pointer");
                    $(this).data('dontclick', 0);
                });
            }).appendTo($('#container_values_chosen')).fadeIn(1000);

        }
    });
    $(".value").tooltipster();
});


    function emptyHiddenValueFields() {
        $('#value1').val('');
        $('#value2').val('');
        $('#value3').val('');
    }

function fillHiddenValueFields(value3) {
    var values = Array;
    var i = 0;
    $('#container_values_chosen div').each(function () {
        values[i++] = $(this).attr('id');
    });

    $('#value1').val(values[0]);
    $('#value2').val(values[1]);
    $('#value3').val(value3);		
}



