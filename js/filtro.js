function filterElements(categoria) {
    const elements = document.querySelectorAll(".elemento");
    let encontrou = false;

    elements.forEach((element) => {
        if (categoria === "Todos" || element.classList.contains(categoria)) {
            element.style.display = "flex";
            encontrou = true;
        } else {
            element.style.display = "none";
        }
    });

    // Exibe ou oculta a mensagem de ong não cadastrada
    const mensagemVazia = document.getElementById("mensagemVazia");
    if (encontrou) {
        mensagemVazia.style.display = "none";
    } else {
        mensagemVazia.style.display = "block";
    }
}

filterElements('Todos');

// Alert cadastrar ong
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addOngForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('A ONG foi enviada com sucesso! Assim que validarmos os dados, iremos acrescentá-la aqui na página. Obrigada pela contribuição!');
        form.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addOng'));
        modal.hide(); 
    });
});