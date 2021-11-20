'use strict';

$('#novo_cliente').on('click', function (e) {
    $('#clienteModal').modal('show');
    let form = document.getElementById('form_cliente');
    form.action = 'http://localhost:8000/api/v1/user';
    $('#_method').val('POST');
    $('#client_id').val(0);
});

const table = $('#tab_clientes').DataTable({
    "ajax": "http://localhost:8000/api/v1/user",
    "order": [],
    "columnDefs": [
        {
            "width": "30%",
            "targets": 0
        },
        {
            "width": "10%",
            "targets": [1, 2],
            "className": "text-center",
        },
        {
            "width": "10%",
            "targets": 5
        }, {
            "targets": 5,
            "width": "10%",
            "className": "text-center",
        },],
    "columns": [
        {"data": "nome"},
        {"data": "cpf"},
        {"data": "genero"},
        {"data": "email"},
        {"data": "tel_principal"},
        {
            "data": null,
            "defaultContent": "" +
                "<button type='button' class='btn-sm btn btn-warning'>Editar</button> " +
                "<button type='button' class='btn-sm btn btn-danger'>Excluir</button>",
            "orderable": false
        },

    ]
});

$('#tab_clientes tbody').on('click', 'button', function () {
    var data = table.row($(this).parents('tr')).data();

    let form = document.getElementById('form_cliente');
    form.action = 'http://localhost:8000/api/v1/user/' + data.id;

    if ($(this)[0].outerText == 'Editar') {
        $('#clienteModal').modal('show');
        $('#_method').val('PUT');
        $('#client_id').val(data.id);

        $.getJSON('http://localhost:8000/api/v1/user/' + data.id, function (cliente) {
            $('#nome').val(cliente.nome);
            $('#email').val(cliente.email);
            $('#cpf').val(cliente.cpf);
            $('#genero').val(cliente.genero);
            $('#tel_principal').val(cliente.tel_principal);
            $('#tel_recado').val(cliente.tel_recado);
            $('#cep').val(cliente.address.cep);
            $('#logradouro').val(cliente.address.logradouro);
            $('#numero').val(cliente.address.numero);
            $('#tipo').val(cliente.address.tipo);
            $('#bairro').val(cliente.address.bairro);
            $('#localidade').val(cliente.address.localidade);
            $('#uf').val(cliente.address.uf);
        });
    } else {
        $('#_method').val('DELETE');
        removercliente(form.action);
    }
});

$('#form_cliente').validate({
    onkeyup: function (element) {
        $(element).valid();
    },
    rules: {
        nome: {
            required: true,
            minlength: 10
        },
        cpf: {
            cpf: true,
            required: true,
            remote: {
                url: "http://localhost:8000/api/v1/user/chek/cpf",
                type: "get",
                data: {
                    cpf: function () {
                        return $('#cpf').val();
                    },
                    client_id: function () {
                        return $('#client_id').val();
                    }
                },
            }
        },
        email: {
            required: true,
            email: true,
            remote: {
                url: "http://localhost:8000/api/v1/user/chek/email",
                type: "get",
                data: {
                    email: function () {
                        return $('#email').val();
                    },
                    client_id: function () {
                        return $('#client_id').val();
                    }
                },
            }
        },
        genero: {
            required: true,
        },
        tel_principal: {
            required: true,
        },
        cep: {
            required: true,
        },
        logradouro: {
            required: true,
        },
        numero: {
            required: true,
        },
        tipo: {
            required: true,
        },
        bairro: {
            required: true,
        },
        localidade: {
            required: true,
        },
        uf: {
            required: true,
        },
    },
    messages: {
        nome: {
            required: "Por favor, informe o nome.",
            minlength: "O nome deve conter no mínimo 10 caracteres."
        },
        cpf: {
            required: "Por favor, informe o CPF corretamente.",
            cpf: 'CPF inválido.'
        },
        email: {
            required: "Por favor, informe o email."
        },
        genero: {
            required: "Por favor, o gênero."
        },
        tel_principal: {
            required: "Por favor, o telefone de contato."
        },
        cep: {
            required: "Por favor, informe o CEP."
        },
        logradouro: {
            required: "Por favor, informe o logradouro."
        },
        numero: {
            required: "Por favor, informe o número."
        },
        tipo: {
            required: "Por favor, informe o tipo de endereço."
        },
        bairro: {
            required: "Por favor, informe o bairro."
        },
        localidade: {
            required: "Por favor, informe a cidade."
        },
        uf: {
            required: "Por favor, informe o estado."
        },
    },
    submitHandler: function (form) {
        let url = $('#form_cliente').attr('action');
        let method = $('#_method').val();
        $.ajax({
            type: method,
            url: url,
            data: $('#form_cliente').serialize(),
            dataType: "json",
            success: function (data) {
                toastr.success('Informações salvas com sucesso!', 'Sucesso!', {timeOut: 3000});
                $('#tab_clientes').DataTable().ajax.reload(null, false);
                $("#form_cliente")[0].reset()
                $('.modal').modal('hide');
            },
            error: function (data) {
                toastr.error('Ocorreu um erro!', 'Erro!', {timeOut: 3000});
            }
        });
    }
});

function removercliente(url) {
    $.ajax({
        type: "POST",
        url: url,
        data: {_method: 'delete'},
        success: function (data) {
            toastr.success('Usuário removido com sucesso!', 'Sucesso!', {
                timeOut: 3000
            });
            $('#tab_clientes').DataTable().ajax.reload(null, false);
        },
        error: function (data) {
            toastr.error('Ocorreu um erro!', 'Erro!', {
                timeOut: 3000
            });
        }
    });
}

