// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('btn-buscar-cep').addEventListener('click', function() {
//         const xhttp = new XMLHttpRequest();
//         const cep = document.getElementById('cep').value;
//         const endpoint = `https://viacep.com.br/ws/${cep}/json`;


//         xhttp.open('GET', endpoint);
//         xhttp.send();

//     });
// });

$(document).ready(function() {
    $('#cep').mask('00000-000');

    $('#btn-buscar-cep').click(function() {
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;

        const btn = $(this);

        $(btn).find('i').addClass('d-none');
        $(btn).find('span').removeClass('d-none');
        $(btn).addClass('disabled');
        


        $.ajax(endpoint).done(function(response) {
            const logradouro = response.logradouro;
            const bairro = response.bairro;
            const cidade = response.localidade;
            const estado = response.uf;
            const endereco = `${logradouro}, ${bairro} - ${cidade}, ${estado}`;

            

            setTimeout(function() {
                $(btn).removeClass('disabled');
                $(btn).find('i').removeClass('d-none');
                $(btn).find('span').addClass('d-none');
                $('#endereco').val(endereco);
            }, 150)
            

        })

    })
});