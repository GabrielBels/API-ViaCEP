$(document).ready(() => {
    $("#cep").focus(); // iniciando com foco no CEP
    $("#cep").focusout(() => { // quando o foco sair do CEP executará a function
        let cep = $("#cep").val();
        if (cep !== "" && cep.length == 8) { // enquanto não tiver com os 8 dígitos preenchidos não fará a verificação
            let url = `https://viacep.com.br/ws/${cep}/json/` // url padrão do viacep passando a variavel cep como parte da url

            $.ajax({ // requisição via ajax
                url: url,
                type: "get",
                dataType: "json",
                success: (data) => {
                    if (!data.erro) { // se não tiver erros na resposta da requisição
                        $("#alert").html(""); // limpa o campo de erros, para apagar erros anteriores
                        
                        // limpa todos os campos de endereço para inserir o novo
                        $("#logradouro").val(""); 
                        $("#numero").val("");
                        $("#complemento").val("");
                        $("#bairro").val("");
                        $("#cidade").val("");
                        $("#estado").val("");

                        // insere cada dado em seu respectivo campo
                        $("#logradouro").val(data.logradouro);
                        $("#complemento").val(data.complemento);
                        $("#bairro").val(data.bairro);
                        $("#cidade").val(data.localidade);
                        $("#estado").val(data.uf);

                        // campos que não poderão ser alterados caso retorne com sucesso a requisição do viacep
                        $("#logradouro").attr("readonly", "")
                        $("#bairro").attr("readonly", "")
                        $("#cidade").attr("readonly", "")
                        $("#estado").attr("readonly", "")

                        // foco no numero para o usuario nao precisar apertar tab
                        $("#numero").focus();
                    } else {
                        // caso de erro exibirá uma msg acima do input de cep
                        $("#alert").html("");
                        $("#alert").append("<p>Não foi possível localizar o CEP.</p>")    
                        
                        $("#logradouro").removeAttr("readonly")
                        $("#bairro").removeAttr("readonly")
                        $("#cidade").removeAttr("readonly")
                        $("#estado").removeAttr("readonly")

                        // limpa todos os campos que podem ter valores anteriores
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
            // caso tenha menos de 8 digitos no cep
            alert("Preencha o CEP.")
            
            // limpa os campos de resultados anteriores
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
    
    $('#estado').keyup(function () {
        $(this).val(this.value.replace(/\d/g, '')) // Estado apenas com letras
    });

    $('#cep').keyup(function () {
        $(this).val(this.value.replace(/\D/g, '')) // Só permitir numéricos no CEP
    });
});
