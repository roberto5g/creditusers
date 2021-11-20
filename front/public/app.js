
$.validator.addMethod("cpf", function (value, element) {
    value = jQuery.trim(value);
    value = value.replace('.', '');
    value = value.replace('.', '');
    var cpf = value.replace('-', '');
    while (cpf.length < 11) cpf = "0" + cpf;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (var i = 0; i < 11; i++) {
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    var x;
    if ((x = b % 11) < 2) {
        a[9] = 0
    } else {
        a[9] = 11 - x
    }
    b = 0;
    c = 11;
    for (var y = 0; y < 10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) {
        a[10] = 0;
    } else {
        a[10] = 11 - x;
    }
    var retorno = true;
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;
    return this.optional(element) || retorno;
}, "Informe um CPF válido");

toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "showDuration": "4000",
    "hideDuration": "1000",
    "timeOut": "4000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

$('#cpf').mask('000.000.000-00', {
    reverse: true
});

$('.telefone').blur(function (event) {
    if ($(this).val().length == 15) { // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
        $(this).mask('(00) 00000-0009');
    } else {
        $(this).mask('(00) 0000-00009');
    }
});

$('.modal').on('hidden.bs.modal', function () {
    $("#form_cliente")[0].reset()
    $('input').each(function () {
        $(this).removeClass('error');
    });
    $('select').each(function () {
        $(this).removeClass('error');
    });
    var cadastro = $('#form_cliente').validate();
    cadastro.resetForm();
});