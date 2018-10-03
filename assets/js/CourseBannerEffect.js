import $ from 'jquery';
window.jQuery = $;
$(document).ready(function () {
    // coursesBanner slider
    var i = 1;
    var slides = $('.bannerCourse-feature'); // get list of slides
    var time = 4000; // set timer

    function changeSlide() {
        for (const slide of slides) { // reset to defaults before action
            setTimeout(() => // hide .card-circle
                $('.active .card-circle').css("visibility", "hidden"),
                3000)
            setTimeout(() => // remove 'active' class
                slide.classList.remove('active'),
                3000)

        }

        if (slides[i] !== undefined) {
            slides[i].classList.add('active'); // add class active to make slides slideIn
            setTimeout(circleOn, 1000); // play Neon effect after 1s
            slides[i].style.zIndex = "100"; // set z-index to make button clickable
        } else return

        if (i < slides.length - 1) { // condition for function
            i++;
        } else {
            i = 0;
        }

        setTimeout( // change slide after 4s
            changeSlide,
            time);
    }
    // NEON effect
    var counter = 1;

    function circleOn() {
        $('.active .card-circle').css("visibility", "visible");
        if (counter == 3) {
            $(this).stop();
            counter = 1;
        } else {
            setTimeout(circleOff, 100);
        }
    }

    function circleOff() {
        $('.active .card-circle').css("visibility", "hidden");
        setTimeout(circleOn, 100);
        counter++;
    }
    window.onload = changeSlide;
})