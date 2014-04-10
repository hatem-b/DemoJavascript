var myblazon;
(function (exports) {

    var facebook =
    {
        
        OpenPopup: function (href, $popup) {
            if (hasUserLikedApp == 'true') {
                location.href = href;
            }
            else if (needForceUser2LikeApp == 'true') {

                var window_Width = $(window).width();
                var popup_left = (window_Width - $popup.width()) / 2;
                $popup.css('left', popup_left);
                $popup.fadeIn();
                $popup.css({ 'z-index': '100', 'visibility': 'visible' });
            }
            else {
                location.href = href;
            }
        }



    };
    exports.facebook = facebook;

})(myblazon = window.myblazon || {});