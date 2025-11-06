/*
Template: 4K Star - Entertainment HTML5 Template
Author: potenzaglobalsolutions

NOTE: This file contains all scripts for the actual Template.
*/

/*================================================
[  Table of contents  ]
================================================

:: Menu
:: Sticky
:: Tooltip
:: Like
:: Addicon
:: Bookmark
:: Counter
:: Countdown
:: Owl carousel
:: Magnific Popup
:: Datetimepicker
:: Search
:: Pricing Tabs
:: Swiper slider
:: Single Slider
:: Back to Top
:: PieChart

======================================
[ End table content ]
======================================*/
//POTENZA var

(function ($) {
    "use strict";
    var POTENZA = {};

    // Predefined Variables
    var $window = $(window),
        $document = $(document),
        $body = $('body'),
        $countdownTimer = $('.countdown'),
        $pieChart = $('.round-chart'),
        $counter = $('.counter');
    //Check if function exists
    $.fn.exists = function () {
        return this.length > 0;
    };


    // Menu
    POTENZA.dropdownmenu = function () {
        if ($('.navbar').exists()) {
            $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
                if (!$(this).next().hasClass('show')) {
                    $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
                }
                var $subMenu = $(this).next(".dropdown-menu");
                $subMenu.toggleClass('show');
                $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
                    $('.dropdown-submenu .show').removeClass("show");
                });
                return false;
            });
        }
    };

    //  Sticky
    POTENZA.isSticky = function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 150) {
                $('.header-sticky').addClass('is-sticky');
            } else {
                $('.header-sticky').removeClass('is-sticky');
            }
        });
    };

    //  Tooltip
    POTENZA.Tooltip = function () {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }

    // Like
    POTENZA.like = function () {
        $(".like").click(function () {
            $(this).toggleClass("active");
        });
    }

    // Addicon
    POTENZA.addicon = function () {
        $(".add-icon").click(function () {
            $(this).toggleClass("active");
        });
    }

    // Addicon
    POTENZA.bookmark = function () {
        $(".bookmark").click(function () {
            $(this).toggleClass("active");
        });
    }

    //  Counter
    POTENZA.counters = function () {
        var counter = jQuery(".counter");
        if (counter.length > 0) {
            $counter.each(function () {
                var $elem = $(this);
                $elem.appear(function () {
                    $elem.find('.timer').countTo();
                });
            });
        }
    };

    //  Countdown
    POTENZA.countdownTimer = function () {
        if ($countdownTimer.exists()) {
            $countdownTimer.downCount({
                date: '12/25/2023 12:00:00', // Month/Date/Year HH:MM:SS
                offset: -4
            });
        }
    }

    //  Owl carousel
    POTENZA.carousel = function () {
        var owlslider = jQuery("div.owl-carousel");
        if (owlslider.length > 0) {
            owlslider.each(function () {
                var $this = $(this),
                    $items = ($this.data('items')) ? $this.data('items') : 1,
                    $loop = ($this.attr('data-loop')) ? $this.data('loop') : true,
                    $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
                    $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
                    $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : false,
                    $autospeed = ($this.attr('data-autospeed')) ? $this.data('autospeed') : 5000,
                    $smartspeed = ($this.attr('data-smartspeed')) ? $this.data('smartspeed') : 1000,
                    $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
                    $space = ($this.attr('data-space')) ? $this.data('space') : 30,
                    $stagePadding = ($this.attr('data-stage-padding')) ? $this.data('stage-padding') : 0,
                    $animateOut = ($this.attr('data-animateOut')) ? $this.data('animateOut') : false;
                $(this).owlCarousel({
                    loop: $loop,
                    items: $items,
                    responsive: {
                        0: {
                            items: $this.data('xx-items') ? $this.data('xx-items') : 1
                        },
                        480: {
                            items: $this.data('xs-items') ? $this.data('xs-items') : 1
                        },
                        768: {
                            items: $this.data('sm-items') ? $this.data('sm-items') : 2
                        },
                        980: {
                            items: $this.data('md-items') ? $this.data('md-items') : 3
                        },
                        1200: {
                            items: $this.data('lg-items') ? $this.data('lg-items') : 4
                        },
                        1300: {
                            items: $this.data('xl-items') ? $this.data('xl-items') : 5
                        },
                        1400: {
                            items: $items
                        }

                    },
                    dots: $navdots,
                    autoplayTimeout: $autospeed,
                    stagePadding: $stagePadding,
                    smartSpeed: $smartspeed,
                    autoHeight: $autohgt,
                    margin: $space,
                    nav: $navarrow,
                    navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
                    autoplay: $autoplay,
                    autoplayHoverPause: true
                });
            });
        }
    }

    // helper to read translateX from transform string (matrix or matrix3d)
    function parseTranslateX(transform) {
        if (!transform || transform === 'none') return 0;
        const m = transform.match(/matrix(3d)?\((.+)\)/);
        if (!m) return 0;
        const vals = m[2].split(',').map(s => parseFloat(s.trim()));
        return (m[1] === '3d') ? (vals[12] || 0) : (vals[4] || 0);
    }

    function clampPeekCarousels() {
        $('.owl-carousel.peek-effect').each(function () {
            const $carousel = $(this);
            const $stage = $carousel.find('.owl-stage');
            const $outer = $carousel.find('.owl-stage-outer');
            if (!$stage.length || !$outer.length) return;

            // real widths
            const stageContentWidth = $stage[0].scrollWidth || $stage.outerWidth(true);
            const outerWidth = $outer[0].getBoundingClientRect().width;

            // data-stage-padding (numeric)
            const padding = parseInt($carousel.data('stage-padding') || 0, 10) || 0;

            // If you used .owl-carousel.peek-effect .owl-stage-outer { margin-left: -50px; }
            // read that margin so we compensate. This should be the absolute value.
            const outerStyleMarginLeft = parseInt($outer.css('margin-left')) || 0;
            const leftOffset = Math.abs(outerStyleMarginLeft); // e.g. 50

            // compute max negative translate allowed
            // explanation: stageContentWidth - outerWidth = how much content can be scrolled
            // Owl adds padding on both sides, so add `padding`. Since we've visually shifted left
            // by `leftOffset`, subtract it so the allowed translate is further right.
            let maxTranslate = -(stageContentWidth - outerWidth - 80);
            // if content fits, no negative translate needed
            if (stageContentWidth <= outerWidth) maxTranslate = 0;

            // read current transform
            const currentTransform = window.getComputedStyle($stage[0]).transform;
            const tx = parseTranslateX(currentTransform);

            // small rounding safety
            const txRounded = Math.round(tx);
            const maxRounded = Math.round(maxTranslate);

            // clamp: if current is more negative (smaller) than allowed, set to allowed
            if (txRounded < maxRounded) {
                $stage.css('transform', `translate3d(${maxRounded}px, 0px, 0px)`);
            }

            // also ensure we don't drift positively past 0
            if (txRounded > 0) {
                $stage.css('transform', 'translate3d(0px, 0px, 0px)');
            }
        });
    }

    // run after init + on translate/resized (cover all moves)
    $(document).ready(function () {
        // slight delay to ensure owl has initialized
        setTimeout(clampPeekCarousels, 50);

        $('.owl-carousel.peek-effect')
            .on('initialized.owl.carousel translated.owl.carousel refreshed.owl.carousel resized.owl.carousel', function () {
                clampPeekCarousels();
            });

        // also on window resize (just in case)
        $(window).on('resize', function () {
            clampPeekCarousels();
        });
    });


    // Magnific Popup
    POTENZA.mediaPopups = function () {
        if ($(".popup-single").exists() || $(".popup-gallery").exists() || $('.modal-onload').exists() || $(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
            if ($(".popup-single").exists()) {
                $('.popup-single').magnificPopup({
                    type: 'image'
                });
            }
            if ($(".popup-gallery").exists()) {
                $('.popup-gallery').magnificPopup({
                    delegate: 'a.portfolio-img',
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    mainClass: 'mfp-img-mobile',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    }
                });
            }
            if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
                $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }
            var $modal = $('.modal-onload');
            if ($modal.length > 0) {
                $('.popup-modal').magnificPopup({
                    type: 'inline'
                });
                $(document).on('click', '.popup-modal-dismiss', function (e) {
                    e.preventDefault();
                    $.magnificPopup.close();
                });
                var elementTarget = $modal.attr('data-target');
                setTimeout(function () {
                    $.magnificPopup.open({
                        items: {
                            src: elementTarget
                        },
                        type: "inline",
                        mainClass: "mfp-no-margins mfp-fade",
                        closeBtnInside: !0,
                        fixedContentPos: !0,
                        removalDelay: 500
                    }, 0)
                }, 1500);
            }
        }
    }

    // Datetimepicker
    POTENZA.datetimepickers = function () {
        if ($('.datetimepickers').exists()) {
            $('#datetimepicker-01, #datetimepicker-02').datetimepicker({
                format: 'L'
            });
            $('#datetimepicker-03, #datetimepicker-04').datetimepicker({
                format: 'LT'
            });
        }
    };

    //  Search
    POTENZA.searchbox = function () {
        if ($("#search").exists()) {
            $('a[href="#search"]').on('click', function (event) {
                event.preventDefault();
                $('#search').addClass('open');
                $('#search > form > input[type="search"]').focus();
            });
            $('#search, #search button.close').on('click keyup', function (event) {
                if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
                    $(this).removeClass('open');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Pricing Tabs
    POTENZA.pricingtabs = function () {
        jQuery('.pricing-tab-switcher').on('click', function () {
            jQuery(this).toggleClass('active');
            jQuery('.pricing-price').toggleClass('change-pricing-price');
        });
    }

    // Swiper slider
    POTENZA.swiperAnimation = function () {
        var siperslider = jQuery(".swiper-container");
        if (siperslider.length > 0) {
            var swiperAnimation = new SwiperAnimation();
            var swiper = new Swiper(".swiper-container", {
                direction: "horizontal",
                effect: "fade",
                loop: false,
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                on: {
                    init: function () {
                        swiper.update();
                        setTimeout(() => {
                            swiperAnimation.init(this).animate();
                        }, 100);
                    },
                    slideChange: function () {
                        swiperAnimation.init(this).animate();
                    }
                }
            });
        }
    };

    // POTENZA.swiperAnimation = function () {
    //     var siperslider = jQuery(".swiper-container");
    //     if (siperslider.length > 0) {
    //         var swiperAnimation = new SwiperAnimation();
    //         var swiper = new Swiper(".swiper-container", {
    //             init: true,
    //             direction: "horizontal",
    //             effect: "fade",
    //             loop: true,
    //             keyboard: {
    //                 enabled: true,
    //                 onlyInViewport: true
    //             },
    //             // Navigation arrows
    //             navigation: {
    //                 nextEl: '.swiper-button-next',
    //                 prevEl: '.swiper-button-prev',
    //             },
    //             pagination: {
    //                 el: '.swiper-pagination',
    //                 clickable: true,
    //             },
    //             on: {
    //                 init: function () {
    //                     swiper.update();
    //                     setTimeout(() => {
    //                         swiperAnimation.init(this).animate();
    //                     }, 100);
    //                 },
    //                 // slideChange: function () {
    //                 //     swiperAnimation.init(this).animate();
    //                 // }
    //             }
    //         });
    //     }
    // }

    // Single Slider
    POTENZA.singleslider = function () {
        if ($(".single-slide-thumb")[0]) {
            var swiper = new Swiper(".single-slide-thumb", {
                slidesPerView: '1',
                spaceBetween: 0,
                loop: false,
                freeMode: true,
                breakpoints: {
                    575: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 4,
                    },
                },
            });
            var swiper2 = new Swiper(".single-slide", {
                slidesPerView: 1,
                centeredSlides: true,
                loop: false,
                loopedSlides: 4,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                thumbs: {
                    swiper: swiper,
                },
            });
        }
    }

    //  Back to top
    POTENZA.goToTop = function () {
        var $goToTop = $('#back-to-top');
        $goToTop.hide();
        $window.scroll(function () {
            if ($window.scrollTop() > 100) $goToTop.fadeIn();
            else $goToTop.fadeOut();
        });
        $goToTop.on("click", function () {
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
    }

    // PieChart
    POTENZA.pieChart = function () {
        if ($pieChart.exists()) {
            $pieChart.each(function () {
                var $elem = $(this),
                    pieChartSize = $elem.attr('data-size') || "60",
                    pieChartAnimate = $elem.attr('data-animate') || "2000",
                    pieChartWidth = $elem.attr('data-width') || "4",
                    pieChartColor = $elem.attr('data-color') || "#ffffff",
                    pieChartTrackColor = $elem.attr('data-trackcolor') || "rgba(0,0,0,0.10)";
                $elem.find('span, i').css({
                    'width': pieChartSize + 'px',
                    'height': pieChartSize + 'px',
                    'line-height': pieChartSize + 'px'
                });
                $elem.appear(function () {
                    $elem.easyPieChart({
                        size: Number(pieChartSize),
                        animate: Number(pieChartAnimate),
                        trackColor: pieChartTrackColor,
                        lineWidth: Number(pieChartWidth),
                        barColor: pieChartColor,
                        scaleColor: false,
                        lineCap: 'square',
                        onStep: function (from, to, percent) {
                            $elem.find('span.percent').text(Math.round(percent));
                        }
                    });
                });
            });
        }
    }

    //  POTENZA Window load and functions

    //Window load functions
    $window.on("load", function () {
        POTENZA.pieChart();
    });
    //Document ready functions
    $document.ready(function () {
        POTENZA.isSticky(),
            POTENZA.Tooltip(),
            POTENZA.like(),
            POTENZA.addicon(),
            POTENZA.bookmark(),
            POTENZA.counters(),
            POTENZA.countdownTimer(),
            POTENZA.carousel(),
            POTENZA.mediaPopups(),
            POTENZA.pricingtabs(),
            POTENZA.datetimepickers(),
            POTENZA.swiperAnimation(),
            POTENZA.singleslider(),
            POTENZA.searchbox(),
            POTENZA.goToTop();
    });
})(jQuery);
