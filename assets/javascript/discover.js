/*****************************
SLIDESHOW
*****************************/
var appendNumber = 4;
var prependNumber = 1;
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
$(".prepend-2-slides").on('click', function (e) {
    e.preventDefault();
    swiper.prependSlide([
        '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>',
        '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>'
    ]);
});
$(".prepend-slide").on('click', function (e) {
    e.preventDefault();
    swiper.prependSlide('<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>');
});
$(".append-slide").on('click', function (e) {
    e.preventDefault();
    swiper.appendSlide('<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>');
});
$(".append-2-slides").on('click', function (e) {
    e.preventDefault();
    swiper.appendSlide([
        '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>',
        '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>'
    ]);
});