"use strict";

setTimeout(function(){
	if (!jQuery.isReady)
		alert('An error occured! Please refresh the page.');
}, 3000);

require.config({
	// cache-bust
	urlArgs: new Date().getTime().toString(),
	
	// import libraries
	paths: {
		// jQuery lib & plugins
		jquery: "lib/jquery.min",
		growl: "lib/jquery.growl",
		md5: "lib/jquery.md5.min",
		easing: "lib/jquery.easing",
		scrollTo: "lib/jquery.scrollTo-1.4.3.1.min"
	},
	
	// configure libraries
	shim: {
		jquery: {
			exports: "$"
		},
		md5: {
			deps: ['jquery']
		},
		growl: {
			deps: ['jquery']
		},
		scrollTo: {
			deps: ['jquery', 'easing']
		}
	}
});

// Load the main app modules to start the app
require(["jquery", "growl", "md5", "scrollTo"], function($) {

	//=================================================================== ERRORS
	$("img").error(function() {
		$(this).hide();
	}),

	//=================================================================== FORMS
    // Join form
    $('form#joinForm').on('submit', function(event) {
        event.preventDefault();
        var req = {};
        req.email = $(this).find('input[name=email]').val();
        console.log(req);
        $.post("/join", req, "json")
            .done(function(res) {
                if (res.ok === true) { //success
                    console.log("success");
                    $.growl.notice({ message: 'Thank you! You will hear from us very soon ;)' });
                    $('#joinInput').val("");
                } else { //error
                    console.log(res.message);
                    $.growl.warning({ message: res.message });
                }
            })
            .fail(function(xhr, textStatus, errorThrown) {
                console.log(xhr.responseText);
                $.growl.error({ message: xhr.responseText });
            });
    });

    // Login form
    $('form#loginForm').on('submit', function(event) {
        event.preventDefault();
        var req = {};
        req.email = $(this).find('input[name=email]').val();
        req.password = $.md5($(this).find('input[name=password]').val());
        console.log(req);
        $.post("/login", req, "json")
            .done(function(res) {
                if (res.ok === true) { //success
                    console.log("success");
                    $.growl.notice({ message: 'You are now logged in.' });
                    window.location.href = 'http://chat.roleswitch.com';
                } else { //error
                    console.log(res.message);
                    $.growl.warning({ message: res.message });
                }
            })
            .fail(function(xhr, textStatus, errorThrown) {
                console.log(xhr.responseText);
                $.growl.error({ message: xhr.responseText });
            });
    });

    //=================================================================== ANIMATIONS/EFFECTS
    // Get Started => Got To Top (Join input focus)
    $('.scrollToTop').click(function() {
        $.scrollTo($('#joinInput').offset().top - 60, {
            duration: 'slow',
            queue: false,
            onAfter: function() {
                $('#joinInput').focus();
            }
        });
    });

    /* Every time the window is scrolled ... */
    $(window).scroll(function() {

        /* Check the location of each desired element */
        $('.fade-in').each(function(i) {
            if ($(this).css('opacity') < 1) {

                var bottom_of_object = $(this).offset().top + $(this).height();
                var bottom_of_window = $(window).scrollTop() + $(window).height();

                /* If the object is completely visible in the window, fade it in */
                if (bottom_of_window > bottom_of_object) {
                    $(this).animate({
                        'opacity': '1'
                    }, 500);
                }
            }

        });

    });

    console.log("ready");
});