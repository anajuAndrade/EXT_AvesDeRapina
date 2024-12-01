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
        if (categoria === "Todos" || element.classList.contains(categoria)) {
            element.style.display = "flex"; // Torna visível (ajustado para flex se necessário)
        } else {
            element.style.display = "none"; // Oculta o elemento
        }
    });
}



filterElements('Todos');

// Verifique se o formulário está presente na página antes de adicionar o evento
document.addEventListener("DOMContentLoaded", () => {
    const voluntarioForm = document.querySelector('.voluntario-form');
    
    if (voluntarioForm) {
        voluntarioForm.addEventListener('submit', function(event) {
            var form = event.target;
            var valid = true;

            form.querySelectorAll('input[required], select[required]').forEach(function(input) {
                if (!input.value) {
                    valid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (!valid) {
                event.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            } else {
                alert('Formulário enviado com sucesso! Assim que surgir uma possibilidade, entraremos em contato.');
            }
        });
    } else {
        console.info("Nenhum formulário '.voluntario-form' encontrado nesta página.");
    }
});

// Botao mostrar mais comunidade
    function showFullContent(postId) {
        const post = document.getElementById(postId);
        const preview = post.querySelector('.preview');
        const fullContent = post.querySelector('.full-content');
        const button = post.querySelector('.btnFiltro');

        preview.style.display = 'none';
        fullContent.style.display = 'block';

        button.style.display = 'none';
    }
    
    // Função para adicionar a nova notícia
    document.getElementById('addNewsForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        // Captura os dados do formulário
        const title = document.getElementById('newsTitle').value;
        const author = document.getElementById('newsAuthor').value;
        const content = document.getElementById('newsContent').value;

        // Cria um novo ID para o post
        const newPostId = 'post' + (document.querySelectorAll('.post').length + 1);

        // Cria um novo post dinamicamente
        const postContainer = document.createElement('div');
        postContainer.classList.add('post');
        postContainer.id = newPostId;

        postContainer.innerHTML = `
            <h3>${title}</h3>
            <p>${author}</p>
            <p class="preview">${content.substring(0, 100)}...</p>
            <p class="full-content" style="display: none;">${content}</p>
            <button class="btnFiltro" onclick="toggleContent('${newPostId}')">Leia Mais</button>
        `;

        // Adiciona o novo post ao contêiner de posts
        document.querySelector('.contactComunidade').appendChild(postContainer);

        // Fecha o modal
        const modal = new bootstrap.Modal(document.getElementById('addNewsModal'));
        modal.hide();

        // Limpa os campos do formulário
        document.getElementById('addNewsForm').reset();
    });

    // Função para mostrar/ocultar o conteúdo completo e esconder o preview
    function toggleContent(postId) {
        const post = document.getElementById(postId);
        const fullContent = post.querySelector('.full-content');
        const preview = post.querySelector('.preview');
        const button = post.querySelector('.btnFiltro');

        // Verifica se o conteúdo está oculto e exibe ou oculta o conteúdo
        if (fullContent.style.display === 'none' || fullContent.style.display === '') {
            fullContent.style.display = 'block';
            preview.style.display = 'none'; // Esconde o preview quando mostrar o conteúdo completo
            button.textContent = 'Leia Menos';

            // Rolagem suave até o conteúdo completo
            window.scrollTo({
                top: fullContent.offsetTop - 20, // Ajuste a distância de rolagem se necessário
                behavior: 'smooth'
            });
        } else {
            fullContent.style.display = 'none';
            preview.style.display = 'block'; // Mostra o preview novamente
            button.textContent = 'Leia Mais';
        }
    }
