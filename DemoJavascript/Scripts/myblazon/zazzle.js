var myblazon;
(function (exports) {

    var zazzle =
    {
        RecalculateZazzleParamsJS: function (showMyName, showMyValues, firstName, lastName, w1, w2, w3, allqav, allqavcs, allqavsep, qav2, rqav) {

            if (!showMyName) {
                firstName = " ";
                lastName = " ";
            }

            if (!showMyValues) {
                zazzle.RecalculateZazzleURL(" ", " ", " ", " ", " ", " ", " ", " ", firstName, lastName);
            } else {
                zazzle.RecalculateZazzleURL(w1, w2, w3, allqav, allqavcs, allqavsep, qav2, rqav, firstName, lastName);
            }


        },

        RecalculateZazzleURL: function (w1, w2, w3, allqav, allqavcs, allqavsep, qav2, rqav, firstName, lastName, zazzleURLJS, zazzleURLJSv) {
            var urlS = zazzleURLJS.replace('$allqavcs', allqavcs).replace('$allqavsep', allqavsep);
            urlS = urlS.replace('$w1', w1).replace('$w2', w2).replace('$w3', w3).replace('$allqav', allqav);
            urlS = urlS.replace('$2qav', qav2).replace('$rqav', rqav);
            urlS = urlS.replace('$yn', firstName + ' ' + lastName).replace('$fn', firstName).replace('$ln', lastName);


            var urlSv = zazzleURLJSv.replace('$allqavcs', allqavcs).replace('$allqavsep', allqavsep);
            urlSv = urlSv.replace('$w1', w1).replace('$w2', w2).replace('$w3', w3).replace('$allqav', allqav);
            urlSv = urlSv.replace('$2qav', qav2).replace('$rqav', rqav);
            urlSv = urlSv.replace('$yn', firstName + ' ' + lastName).replace('$fn', firstName).replace('$ln', lastName);

            urlS = urlS.replace(/&amp;/g, '&');
            urlSv = urlSv.replace(/&amp;/g, '&');

            $('#hrefS1').attr('href', urlS);
            $('#hrefS2').attr('href', urlS);
            $('#hrefO1').attr('href', urlSv);
            $('#hrefO2').attr('href', urlSv);
        },



        ShowHideZazzleParams: function (type, showMyName, showMyValues, newName, urlAction) {
            var dataString = 'showMyName=' + (showMyName ? 'true' : 'false') + '&showMyVals=' + (showMyValues ? 'true' : 'false') + '&newName=' + newName;

            $.ajax({
                type: "GET",
                async: true,
                url: urlAction,
                data: dataString,
                success: function (response) {
                    var resp = JSON.parse(response); //console.log($(element).attr('onclick'));
                    if (type == 'S') {

                        location.href = resp[0];
                    }
                    if (type == 'O') {

                        location.href = resp[1];
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("error");

                }

            });
        }

    };
    exports.zazzle = zazzle;

})(myblazon = window.myblazon || {});