var myblazon;
(function (exports) {

    var ui = {

        InitializeSlides: function ($slides) {
            $slides.slidesjs({

                pagination: {
                    active: false,
                    effect: 'slide'
                },
                navigation: {
                    active: false,
                    effect: 'slide'
                },
                fadeSpeed: 2000,
                slideSpeed: 2000,
                play: 5000,
                pause: 2500,
                hoverPause: true,
                autoHeight: false,
                start: 1,
            });
        }


    };
    exports.ui = ui;

})(myblazon = window.myblazon || {});