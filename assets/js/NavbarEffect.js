$(document).ready(function () {
    // navbar background change when scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 5) {
            $('.header-nav-menu').addClass("header-nav-menu-toggle");
            $('.header-brand_logo').addClass("header-brand-toggle");
        } else {
            $('.header-nav-menu').removeClass("header-nav-menu-toggle");
            $('.header-brand_logo').removeClass("header-brand-toggle");
        }
    })
})