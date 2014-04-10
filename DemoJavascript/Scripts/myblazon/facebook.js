var myblazon;
(function (exports) {

    var facebook =
    {
        InitAsync: function (app_Id) {
            FB.init({
                appId: app_Id,
                status: true,
                cookie: true,
                xfbml: true,
                oauth: true,
                fileUpload: true
            });
            FB.Canvas.setSize({ height: 600 });
            window.setTimeout("FB.Canvas.setAutoGrow(100)", 500);
            FB.Canvas.setSize({ height: 600 });
            FB.Canvas.scrollTo(0, 0);
            var permsNeeded = ['user_birthday', 'user_hometown', 'user_location'];
        },

        LoadAsync: (function (d) {
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document)),

        OpenPopup: function (href, $popup, hasUserLikedApp, needForceUser2LikeApp) {
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
        },

        setFBProfilePictureVerifyPermissions : function (imgUrl) {
        var permsNeeded = ['publish_stream'];//'user_photos'
        FB.api('/me/permissions', function (response) {
            var permsArray = response.data[0];

            var permsToPrompt = [];
            for (var i in permsNeeded) {
                if (permsArray[permsNeeded[i]] == null) {
                    permsToPrompt.push(permsNeeded[i]);
                }
            }

            if (permsToPrompt.length > 0) {
                promptForPerms(permsToPrompt, imgUrl, '');

            } else {
                setFBProfilePicture(imgUrl);
            }
        });

    },

        setFBProfilePicture : function (imgUrl) {

        imgUrl = '@Helpers.FBMyBlazonSiteURL' + imgUrl;
        FB.api('/me/photos', 'post', { message: 'This is my awesome shield created with the MyBlazon Facebook application!', url: imgUrl }, function (response) {
            if (!response || response.error) {
                alert('Error occurred: ' + response.error.message);
            } else {
                var uploaded_photo_id = response.id;
                FB.api('/' + uploaded_photo_id, function (response) {
                    if (!response || response.error) {
                        alert('Error occurred: ' + response.error.message);

                    } else {
                        var link = response.link + '&makeprofile=1&makeuserprofile=1';
                        window.open(link, '');
                    }
                });
            }
        });
    },

    // Re-prompt user for missing permissions
        promptForPerms : function (perms, imgUrl, quality) {
        FB.login(function (response) {
            if (response.authResponse) {

                FB.api('/me/permissions', function (response) {
                    var permsArray = response.data[0];
                    for (var i in perms) {
                        if (permsArray[perms[i]] == null) {
                            return false;
                        }
                    }
                    if (imgUrl != '')
                        setFBProfilePicture(imgUrl);
                    else {
                        //save the user email address
                        FB.api('/me', function (me) {
                            updateUserEmail(me.email, quality);

                        });
                    }
                    return true;
                });
            } else {
                return false;
            }
        }, { scope: perms.join(',') });
        },

     DoPost2MyBlazonPage : function(msg) {
        FB.api('/450112368380126/feed', 'post', { message: msg }, function (response) {//450112368380126--> id for page www.facebook.com/Myblazon
            if (!response || response.error) {
            } else {
                var posted_message_id = response.id;
            }
        });
    }


    };
    exports.facebook = facebook;

})(myblazon = window.myblazon || {});