function toggleContent(postId) {
    const post = document.getElementById(postId);
    const fullContent = post.querySelector('.full-content');
    const preview = post.querySelector('.preview'); // A prévia
    const toggleButton = post.querySelector('.btnFiltro'); // Botão "Ler Mais / Ler Menos"
    
    // Verifica se o conteúdo completo existe e se o botão também foi encontrado
    if (fullContent && toggleButton && preview) {
        if (fullContent.style.display === "none") {
            fullContent.style.display = "block";
            preview.style.display = "none"; // Esconde a prévia
            toggleButton.textContent = "Ler Menos"; // Muda o texto para "Ler Menos"
        } else {
            fullContent.style.display = "none";
            preview.style.display = "block"; // Exibe a prévia novamente
            toggleButton.textContent = "Ler Mais"; // Muda o texto para "Ler Mais"
        }
    }
}

// Este código adiciona o evento de clique ao botão "Ler Mais"
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addNewsForm');
    const modal = document.getElementById('addNewsModal');
    const modalInstance = new bootstrap.Modal(modal); // Cria a instância do modal com Bootstrap
    const openModalButton = document.querySelector('[data-bs-toggle="modal"][data-bs-target="#addNewsModal"]'); // Botão que abre o modal

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita o envio padrão do formulário

            // Obtém os valores dos campos do formulário
            const title = document.getElementById('newsTitle').value.trim();
            const content = document.getElementById('newsContent').value.trim();
            const author = document.getElementById('newsAuthor').value.trim();

            // Verifica se todos os campos foram preenchidos
            if (!title || !content || !author) {
                alert('Por favor, preencha todos os campos antes de enviar.');
                return;
            }

            // Cria uma nova postagem
            const postContainer = document.createElement('div');
            postContainer.classList.add('post');
            postContainer.id = title; 
            postContainer.innerHTML = `
                <h3>${title}</h3>
                <p><i class="bi bi-person-circle"></i> ${author}</p>
                <p class="preview">${content.substring(0, 100)}...</p>
                <p class="full-content" style="display: none;">${content}</p>
                <button class="btnFiltro" onclick="toggleContent('${title}')">Ler Mais</button>
            `;

            // Adiciona a nova postagem no container
            const newsContainer = document.querySelector('.contactComunidade');
            if (newsContainer) {
                newsContainer.appendChild(postContainer);
            } else {
                console.error('Elemento "contactComunidade" não encontrado.');
            }

            // Reseta os campos do formulário
            form.reset();

            // Fecha o modal usando a instância do Bootstrap
            modalInstance.hide();

            // Define o foco no botão que abriu o modal (ou outro elemento visível)
            if (openModalButton) {
                openModalButton.focus();
            }
        });
    } else {
        console.warn('Formulário "addNewsForm" não encontrado.');
    }
});
