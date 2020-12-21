$(document).ready(() => {
    $("#cep").focus();
    $("#cep").focusout(() => {
        let cep = $("#cep").val();
        cep = cep.replace("-", "");
        if (cep !== "" && cep.length == 8) {
            let url = `https://viacep.com.br/ws/${cep}/json/`

            $.ajax({
                url: url,
                type: "get",
                dataType: "json",
                success: (data) => {
                    if (!data.erro) {
                        $("#alert").html("");
                        $("#logradouro").val("");
                        $("#numero").val("");
                        $("#complemento").val("");
                        $("#bairro").val("");
                        $("#cidade").val("");
                        $("#estado").val("");

                        $("#logradouro").val(data.logradouro);
                        $("#complemento").val(data.complemento);
                        $("#bairro").val(data.bairro);
                        $("#cidade").val(data.localidade);
                        $("#estado").val(data.uf);

                        $("#logradouro").attr("readonly", "")
                        $("#bairro").attr("readonly", "")
                        $("#cidade").attr("readonly", "")
                        $("#estado").attr("readonly", "")

                        $("#numero").focus();
                    } else {
                        $("#alert").html("");
                        $("#alert").append("<p>Não foi possível localizar o CEP.</p>")    

                        $("#logradouro").val("");
                        $("#numero").val("");
                        $("#complemento").val("");
                        $("#bairro").val("");
                        $("#cidade").val("");
                        $("#estado").val("");
                    }
                }
            })
        } else {
            alert("Preencha o CEP.")
            
            $("#logradouro").val("");
            $("#numero").val("");
            $("#complemento").val("");
            $("#bairro").val("");
            $("#cidade").val("");
            $("#estado").val("");
            $("#cep").focus();
        }
    });

    $('#numero').keyup(function () {
        $(this).val(this.value.replace(/\D/g, '')) // Só permite numéricos no numero da casa
    });

    $('#cep').keyup(function () {
        $(this).val(this.value.replace(/\D/g, '')) // Só permitir numéricos no CEP
    });
});