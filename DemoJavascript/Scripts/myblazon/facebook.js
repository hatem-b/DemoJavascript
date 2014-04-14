var myblazon;
(function (exports) {

    var facebook =
    {
        permsNeeded: ['user_birthday', 'user_hometown', 'user_location'],

        InitLoadAsync: function (app_Id) {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: app_Id,
                    status: true,
                    cookie: true,
                    xfbml: true,
                    oauth: true,
                    fileUpload: true
                });
                FB.Event.subscribe('auth.authResponseChange', function (response) {
                    if (response.status === 'connected') {
                        console.log('Logged in');
                    } else {
                        FB.login();
                    }
                });
            };



            (function (d) {
                var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) { return; }
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
            }(document));
        },


        OpenPopup: function (urlAction, $popup, hasUserLikedApp, needForceUser2LikeApp) {
            if (hasUserLikedApp == 'true') {
                location.href = href;
            } else if (needForceUser2LikeApp == 'true') {

                var window_Width = $(window).width();
                var popup_left = (window_Width - $popup.width()) / 2;
                $popup.css('left', popup_left);
                $popup.fadeIn();
                $popup.css({ 'z-index': '100', 'visibility': 'visible' });
            } else {
                location.href = urlAction;
            }
        },

        VerifyFacebookLogin: function (tryLogin, success)
        {
            FB.getLoginStatus(function (response) {
                if (response.status === 'not_authorized' || response.status === 'unknown')
                {
                    if (tryLogin)
                    {
                        FB.login(function (response) {
                            if (response.authResponse) {
                                if (success && typeof success === "function") {
                                    success();
                                }
                            }
                        });
                    }
                    else { return false; }
                } 
                else if ((response.status === 'connected'))
                {
                    if (success && typeof success === "function") {
                        success();
                    }
                }
            });
        },

        setFBProfilePictureVerifyPermissions: function (siteUrl, imgUrl) {            
            facebook.VerifyFacebookLogin(true,function(){

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
                    facebook.promptForPerms(permsToPrompt, function () { facebook.setFBProfilePicture(siteUrl, imgUrl); });
                } else {
                    facebook.setFBProfilePicture(siteUrl, imgUrl);
                }
            });
        });
        },

        setFBProfilePicture: function (siteUrl, imgUrl) {

            imgUrl = siteUrl + imgUrl;
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
        promptForPerms: function (perms, callback) {
            FB.login(function (response) {
                if (response.authResponse) {

                    FB.api('/me/permissions', function (response) {
                        var permsArray = response.data[0];
                        for (var i in perms) {
                            if (permsArray[perms[i]] == null) {
                                return false;
                            }
                        }
                        
                        if (callback && typeof callback === "function")
                        {
                            callback();
                        }
                        return true;
                    });
                } else {
                    return false;
                }
            }, { scope: perms.join(',') });
        },


        Share: function (shieldID, $loading_img_share, siteUrl, fbAppUrl, urlAction) {
            $loading_img_share.show();

            $.ajax({
                type: "GET",
                async: true,
                url: urlAction,
                success: function (response) {
                    $loading_img_share.hide();

                    var currentDate = new Date();
                    var imgURL = siteUrl + '../orna.ashx?blazonid=' + shieldID + '&w=250&f=png' + '&d=' + currentDate.getTime(); //add current date in parameter to force FB to take and display the new image, not the cached one
                    
                    FB.getLoginStatus(function (response) {
                        if (response.status === 'not_authorized' || response.status === 'unknown') {
                            FB.login(function (response) {
                                if (response.authResponse) {
                                    FB.ui({ method: 'feed', name: 'MyBlazon on Facebook', link: fbAppUrl, picture: imgURL, caption: 'Enable the noble you!', description: 'I\'ve just created my personal Shield with MyBlazon.', message: 'Create your personal Coat of Arms!' }); return false;
                                }
                            }, { scope: 'publish_stream' });

                        } else
                            if ((response.status === 'connected')) {
                                FB.ui({ method: 'feed', name: 'MyBlazon on Facebook', link: fbAppUrl, picture: imgURL, caption: 'Enable the noble you!', description: 'I\'ve just created my personal Shield with MyBlazon.', message: 'Create your personal Coat of Arms!' }); return false;
                            }
                    });
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $loading_img_share.hide();
                }

            });
        }


    };
    exports.facebook = facebook;

})(myblazon = window.myblazon || {});