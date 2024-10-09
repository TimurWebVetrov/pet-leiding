$(document).ready(function(){
    $('.carousel__inner').slick({
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        sped: 1500,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.svg"></button>', // - элементы 1-ой стрелки
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.svg"></button>' // - элементы 2-ой стрелки
    });
});