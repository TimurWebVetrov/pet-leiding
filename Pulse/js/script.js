$(document).ready(function(){
    // Карусель
    $('.carousel__inner').slick({
        infinite: true, // - режим бесконечности прокрутки слайдов
        slidesToShow: 1, // - сколько показывает слайдов
        slidesToScroll: 1, // - скрол слайда
        autoplay: false, // - автопереключение слайдера
        autoplaySpeed: 2000, // -скорость автопереключение слайда
        speed: 1200, // - скорость переключение слайдов
        arrows: true, // - стрелочки слайда
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>', // - элементы 1-ой стрелки
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>', // - элементы 2-ой стрелки
        responsive: [ // - медиа правила на определенных промежутках
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,  // - промежуток
                settings: {  // - настройки
                    dots: true,
                    dotsClass:'slick-dots',
                    arrows: false,
                }
            }
        ]
        // dots: true - кружки под слайдом
        // adaptiveHeight: true - подстраивает высоту под картинки
        // fage: true - проявление картинки
        // cssEase: 'linear' - как проявляется картинка
    });
    // Табы
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    // Смена карты
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Модальные окна

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });
    // Валидация форм
    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
    // Маска телефона
    $('input[name=phone]').mask("+7 (999) 999-99-99");
    // Используем технологию Аджэкс для обработки запросов без перезагрузки браузера
    $('form').submit(function(e) {
        e.preventDefault();
        if(!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup
    // Появление скрола
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    // Плавный скролл
    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    // подключения управления для анимации
    new WOW().init();
});

