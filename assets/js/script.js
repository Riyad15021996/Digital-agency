(function($) {
    'use strict'


    /*
    ========================================
        Preloader
    ========================================
    */
    $(window).on('load', function() {
        $('#preloader').delay(300).fadeOut('slow');
        $('body').delay(300).css({
            'overflow': 'visible',
        });
    });

    /* 
    =====================================================
        Start active menu
    ======================================================
    */

    var sections = jQuery('section'),
        nav = jQuery('nav'),
        nav_height = nav.outerHeight();

    jQuery(window).on('scroll', function() {
        var cur_pos = jQuery(this).scrollTop();

        sections.each(function() {
            var top = jQuery(this).offset().top - nav_height,
                bottom = top + jQuery(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                jQuery(this).addClass('active');
                nav.find('a[href="#' + jQuery(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    /* ===============================================
            AddClass menu js
       ===============================================
    */

    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 100) {
            $(".menu-area").addClass("shrinkheader");
        } else {
            $(".menu-area").removeClass("shrinkheader");
        }
    });


    /*
    ========================================
        counterup
    ========================================
    */

    $('.counts').countUp({
        'time': 3000,
        'delay': 10
    });

    /*
    ========================================
        Parallax
    ========================================
    */

    jarallax(document.querySelectorAll('.parallax'), {
        speed: 0.3,
    });


    /*
    ========================================
        Magnific Popup
    ========================================
    */

    $('.video-play-btn').magnificPopup({
        type: 'iframe',
    });

    /* Image Gallery */
    $('.images-gallery').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /*
    ========================================
        Work Isotoope
    ========================================
    */

    $('.imageloaded').imagesLoaded(function() {
        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-item',
            }
        });

        // filter items on button click
        $('.filter-button-group').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });

        // filter active class
        $('.filter-button-group button').on('click', function() {
            $(this).siblings('.active').removeClass('active');
            $(this).addClass('active');
        });
    });





    /* 
    ========================================
        slick slide
    ========================================
    */

    /* Hero Slider */
    function mainSlider() {
        var BasicSlider = $('.banner-slider');
        BasicSlider.on('init', function(e, slick) {
            var $firstAnimatingElements = $('.single-slide:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
        BasicSlider.slick({
            autoplay: false,
            autoplaySpeed: 10000,
            dots: false,
            fade: true,
            arrows: true,
            prevArrow: '<i class="las la-angle-left"></i>',
            nextArrow: '<i class="las la-angle-right"></i>',
            responsive: [
                { breakpoint: 767, settings: { dots: false, arrows: false } }
            ]
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function() {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();


    /* Skill Slider */
    $('.skill-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        prevArrow: '<i class="las la-angle-left"></i>',
        nextArrow: '<i class="las la-angle-right"></i>',
        autoplay: true,
        speed: 900,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    speed: 900,
                    arrows: false,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    speed: 900,
                    arrows: false,
                }
            }
        ]
    });

    /* Testimonial Slider */

    $('.testimonial-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        prevArrow: '<i class="las la-angle-left"></i>',
        nextArrow: '<i class="las la-angle-right"></i>',
        autoplay: true,
        speed: 900,
        verticalSwiping: false,
        swipe: true,
        swipeToSlide: true,
        vertical: true,
        autoplaySpeed: 3000,
        responsive: [{
            breakpoint: 991,
            settings: {
                arrows: false,
            }
        }],
    });



    /*
    ========================================
    Search Nav
    ========================================
    */

    if ($('.search-toggler').length) {
        $('.search-toggler').on('click', function() {
            $('.search-contents').toggleClass('show');
            return false;
        });
        $('.close-search').on('click', function() {
            $('.search-contents').removeClass('show');
            return false;
        });

    }

    /* 
    ========================================
        Wow Animation
    ========================================
    */

    new WOW().init();



    /* 
    ========================================
        Scroll To Top
    ========================================
    */

    $(document).ready(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        });

        //Click event to scroll to top
        $('.scrollToTop').click(function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });

    });

    /* 
    ========================================
        Fixed Footer
    ========================================
    */

    /* document.addEventListener(
        "DOMContentLoaded",
        function() {
            fullHeight();
        },
        true
    );

    function fullHeight() {
        var headerHeight = document.querySelector("header").clientHeight;
        var footerHeight = document.querySelector("footer").clientHeight;
        var headerFooter = headerHeight + footerHeight;
        var content = document.querySelector(".fixed-footer");
        content.style.minHeight = "calc( 100vh - " + headerFooter + "px )";
    } */


    /* 
    ========================================
        console error Avoid
    ========================================
    */
    // Avoid `console` errors in browsers that lack a console.
    (function() {
        var method;
        var noop = function() {};
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }());




})(jQuery);