var myblazon;
(function (exports) {

    var facebook =
    {
        permsNeeded : ['user_birthday', 'user_hometown', 'user_location'],

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


        OpenPopup: function (href, $popup, hasUserLikedApp, needForceUser2LikeApp) {
            if (hasUserLikedApp == 'true') {
                location.href = href;
            } else if (needForceUser2LikeApp == 'true') {

                var window_Width = $(window).width();
                var popup_left = (window_Width - $popup.width()) / 2;
                $popup.css('left', popup_left);
                $popup.fadeIn();
                $popup.css({ 'z-index': '100', 'visibility': 'visible' });
            } else {
                location.href = href;
            }
        },

        setFBProfilePictureVerifyPermissions: function (siteUrl, imgUrl) {
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
                    facebook.promptForPerms(permsToPrompt, imgUrl, '');
                } else {
                    facebook.setFBProfilePicture(siteUrl, imgUrl);
                }
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
        promptForPerms: function (perms, siteUrl,imgUrl, quality) {
            FB.login(function (response) {
                if (response.authResponse) {

                    FB.api('/me/permissions', function (response) {
                        var permsArray = response.data[0];
                        for (var i in perms) {
                            if (permsArray[perms[i]] == null) {
                                return false;
                            }
                        }
                        if (imgUrl != '') {
                            facebook.setFBProfilePicture(siteUrl,imgUrl);
                        } else {
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

        DoPost2MyBlazonPage: function (msg) {
            FB.api('/450112368380126/feed', 'post', { message: msg }, function (response) {//450112368380126--> id for page www.facebook.com/Myblazon
                if (!response || response.error) {
                } else {
                    var posted_message_id = response.id;
                }
            });
        },


        feedTest : function()
        {
                FB.ui(
                  {
                      method: 'feed',
                      name: 'The Facebook SDK for Javascript',
                      caption: 'Bringing Facebook to the desktop and mobile web',
                      description: (
                         'A small JavaScript library that allows you to harness ' +
                         'the power of Facebook, bringing the user\'s identity, ' +
                         'social graph and distribution power to your site.'
                      ),
                      link: 'https://developers.facebook.com/docs/reference/javascript/',
                      picture: 'http://www.fbrell.com/public/f8.jpg'
                  },
                  function (response) {
                      if (response && response.post_id) {
                          alert('Post was published.');
                      } else {
                          alert('Post was not published.');
                      }
                  }
                );
        }


    };
    exports.facebook = facebook;

})(myblazon = window.myblazon || {});