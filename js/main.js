(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    var animationStarted = false;

    window.addEventListener('scroll', function() {
        var element = document.querySelector('.estatistica');
        var position = element.getBoundingClientRect();
    
        // Se a parte relevante da página estiver visível e a animação ainda não foi iniciada
        if (position.top < window.innerHeight && position.bottom >= 0 && !animationStarted) {
            // Iniciar a animação
            animateValue("years", 0, 7, 2000); // Ajuste o terceiro parâmetro para uma duração maior
            animateValue("families", 0, 118, 2000); // Deixe a duração padrão para o segundo
            animateValue("partners", 0, 20, 2000); // Ajuste o terceiro parâmetro para uma duração maior
    
            // Definir a variável de controle como true para evitar reiniciar a animação
            animationStarted = true;
        }
    });
    
    function animateValue(id, start, end, duration) {
        var obj = document.getElementById(id);
        var range = end - start;
        var current = start;
        var startTime = null;
    
        function updateNumber(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = timestamp - startTime;
            var increment = Math.ceil((range * progress) / duration);
            current = start + increment;
    
            obj.innerHTML = "<span class='plus-sign'>+</span>" + current;
    
            if (progress < duration) {
                requestAnimationFrame(updateNumber);
            } else {
                obj.innerHTML = "<span class='plus-sign'>+</span>" + end;
            }
        }
    
        requestAnimationFrame(updateNumber);
    }
    
    
  
    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
        dots: true,
        nav: false,
    });
    
})(jQuery);

function filterElements(categoria) {
    const elements = document.querySelectorAll(".elemento");

    elements.forEach((element) => {
        element.classList.remove("show");
        if ((categoria === "Todos") || element.classList.contains(categoria)) {
            element.classList.add("show");
        }
    });
}

filterElements('Todos');
