$(document).ready(function() {
    $('#cep').mask('00000-000');

    $('#cep').on('input', (e) => {
        const cepLength = 9;
        const cep = e.target.value;

        if (cep.length == cepLength) {
            const endpoint = `https://viacep.com.br/ws/${cep}/json`;
            resetInput();

            fetch(endpoint)
                .then((response) => response.json())
                .then((json) => {
                    if (json.erro) {
                        isLoading();
                        setTimeout(() => {
                            $('#cep').addClass('is-invalid');
                            doneLoading();
                            error();
                        }, 500);
                    
                        return;
                    }

                    const endereco = json.logradouro;
                    const bairro = json.bairro;
                    const cidade = json.localidade;
                    const uf = json.uf;
                    
                    isLoading();
                    
                    setTimeout(() => {
                        $('#endereco').val(endereco);
                        $('#bairro').val(bairro);
                        $('#cidade').val(cidade);
                        $('#uf').val(uf);


                        doneLoading();
                        success();

                    }, 500);
                });
        }
    })
});

function resetInput() {
    $('#cep').removeClass('is-invalid');
    $('#i-valid').addClass('d-none');
    $('#i-error').addClass('d-none');
    $('#i-search').removeClass('d-none');

}

function isLoading() {
    $('#cep').prop('disabled', true);
    $('#i-search').addClass('d-none');
    $('#cep-icon').find('span').removeClass('d-none');
}

function doneLoading() {
    $('#cep').prop('disabled', false);
    $('#cep-icon').find('span').addClass('d-none');
} 

function success() {
    $('#i-valid').removeClass('d-none');
}

function error() {
    $('#i-error').removeClass('d-none');
}