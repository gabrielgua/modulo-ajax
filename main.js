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
        
        


        fetch(endpoint).then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const logradouro = json.logradouro;
            const bairro = json.bairro;
            const cidade = json.localidade;
            const estado = json.uf;
            
            const endereco = `${logradouro}, ${bairro} - ${cidade}, ${estado}`;
            
            setTimeout(() => {
                $('#endereco').val(endereco);
            }, 150);

            
        })
        .catch((error) => {
            

        })
        .finally(() => {
            setTimeout(() => {
                $(btn).removeClass('disabled');
                $(btn).find('i').removeClass('d-none');
                $(btn).find('span').addClass('d-none');
            }, 150);
        });
    })


    $('#form-pedido').submit((e) => {
        e.preventDefault();
        if ($('#nome').val().length == 0) {
            throw new Error('Nome é obrigatório');
        }
    })
});