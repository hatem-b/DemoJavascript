var myblazon;
(function (exports) {

    var helpers =
    {
        dot2num: function (dot) {
            var d = dot.split('.');
            return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
        },

        num2dot: function (num) {
            var d = num % 256;
            for (var i = 3; i > 0; i--) {
                num = Math.floor(num / 256);
                d = num % 256 + '.' + d;
            }
            return d;
        }



    };
    exports.helpers = helpers;

})(myblazon = window.myblazon || {});