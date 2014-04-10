var myblazon;
(function (exports) {

    var http = {
        get: function (url, data) {
            return $.ajax({
                url: url,
                data: data,
                type: 'GET'
            });
        },
        post: function (url, data) {
            return $.ajax({
                url: url,
                data: data,
                type: 'POST'
            });
        }
    };

    exports.http = http;

})(myblazon = window.myblazon || {});