function validateFormAdm(linha_escolhida){
    console.log(linha_escolhida)
    $("#processo_escolhido").remove(); 
    $("#div_numero_processo").append("<input id='processo_escolhido' name='processo_escolhido' type='hidden' value='"+linha_escolhida+"'>")
    this.form.submit();
}


if(document.getElementById("add_processo")){
    if(document.getElementById("data")){
        var data_atual = new Date();
        ano_atual = data_atual.getFullYear();
        mes_atual = data_atual.getMonth();
        if(mes_atual < 10)
            mes_atual = "0"+(mes_atual+1)
        dia_atual = data_atual.getDate();

        document.getElementById("data").value = ano_atual+"-"+mes_atual+"-"+dia_atual;
    }
}

function editaTabela(){
    edicao_tabela.style.display = edicao_checkbox.checked ? "block" : "none";
}

$("#edicao_tabela label input").on("change keyup keydown",function (){
    $("#processos_table > thead").remove(); 
    $("#processos_table").append( "<thead></thead>" );
    $("#processos_table > thead").append( "<tr></tr>" );
    
    $("#edicao_tabela label input").each(function(){
        if($(this).is(":checked")){
            if($(this).val() == "id")
                $("#processos_table > thead > tr").append("<th><nobr>Nº do Processo</nobr></th>");
            if($(this).val() == "gestor")
                $("#processos_table > thead > tr").append("<th><nobr>Gestor Solicitante</nobr></th>");
            if($(this).val() == "setor")
                $("#processos_table > thead > tr").append("<th><nobr>Setor</nobr></th>");
            if($(this).val() == "data")
                $("#processos_table > thead > tr").append("<th><nobr>Data da Solicitação</nobr></th>");
            if($(this).val() == "motivo")
                $("#processos_table > thead > tr").append("<th>Motivo</th>");
            if($(this).val() == "justificativa")
                $("#processos_table > thead > tr").append("<th>Justificativa</th>");
            if($(this).val() == "cargo")
                $("#processos_table > thead > tr").append("<th><nobr>Cargo Solicitado</nobr></th>");
            if($(this).val() == "numero_de_vagas")
                $("#processos_table > thead > tr").append("<th>Vagas(s)</th>");
            if($(this).val() == "sexo")
                $("#processos_table > thead > tr").append("<th>Sexo</th>");
            if($(this).val() == "empresa_contratante")
                $("#processos_table > thead > tr").append("<th><nobr>Empresa</nobr></th>");
            if($(this).val() == "local")
                $("#processos_table > thead > tr").append("<th><nobr>Local de Trabalho</nobr></th>");
            if($(this).val() == "turno")
                $("#processos_table > thead > tr").append("<th><nobr>Turno</nobr></th>");
            if($(this).val() == "horario_de_trabalho")
                $("#processos_table > thead > tr").append("<th><nobr>Horario</nobr></th>");
            if($(this).val() == "renumeracao_proposta")
                $("#processos_table > thead > tr").append("<th><nobr>Renumeração</nobr></th>");
        }
    });

    //$("#processos_table > thead > tr").append("<th><nobr>Candidato Interesasdo</nobr></th>");
    //$("#processos_table > thead > tr").append("<th><nobr>Mais Informações</nobr></th>");

    lista_vaga = JSON.parse(document.getElementById("lista_vaga").innerHTML.replace(/'/g, '"'));
    lista_cargo_pretendido = JSON.parse(document.getElementById("lista_cargo_pretendido").innerHTML.replace(/'/g, '"'));
    
    $("#processos_table > tbody").remove(); 
    $("#processos_table > thead").after( "<tbody></tbody>" );
    var match = false;
    for(var i=0; i<lista_vaga.length;i++){
        /*
        //codido para verificar se ha candidatos interessados na vaga
        match = false;
        for(var cargo in lista_cargo_pretendido){
            if(lista_vaga[i]["cargo"] == lista_cargo_pretendido[cargo]["descricao_cargo"]){
                match = true;
            }
        }
        */
        $("#processos_table > tbody").append("<tr id='row"+i+"'></tr>");
        $("#edicao_tabela label input").each(function(){
            if($(this).is(":checked")){
                if($(this).val() == "status"){
                    if(lista_vaga[i][$(this).val()] == 0)
                        $("#processos_table > tbody > tr:last-child").append("<td style='text-align:center;'><nobr><i class='fa fa-circle' style='color:darkorange;'></i></nobr></td>"); 
                    if(lista_vaga[i][$(this).val()] == 1)
                        $("#processos_table > tbody > tr:last-child").append("<td style='text-align:center;'><nobr><i class='fa fa-circle' style='color:dodgerblue;'></i></nobr></td>");
                    if(lista_vaga[i][$(this).val()] == 2)
                        $("#processos_table > tbody > tr:last-child").append("<td style='text-align:center;'><nobr><i class='fa fa-circle' style='color:lightgreen;'></i></nobr></td>");
                    if(lista_vaga[i][$(this).val()] == 3)
                        $("#processos_table > tbody > tr:last-child").append("<td style='text-align:center;'><nobr><i class='fa fa-circle' style='color:green;'></i></nobr></td>");
                    if(lista_vaga[i][$(this).val()] == 4)
                        $("#processos_table > tbody > tr:last-child").append("<td style='text-align:center;'><nobr><i class='fa fa-circle' style='color:darkred;'></i></nobr></td>");
                }else{
                    $("#processos_table > tbody > tr:last-child").append("<td><nobr>" + lista_vaga[i][$(this).val()] + "</nobr></td>");
                }
            }
        });

        /*
        //segunda parte do codido para verificar se ha candidatos interessados na vaga
        if(match){
            $("#processos_table > tbody > tr:last-child").append("<td><nobr>Sim</nobr></td>");
        }else{
            $("#processos_table > tbody > tr:last-child").append("<td><nobr>Não</nobr></td>");
        }*/

        //$("#processos_table > tbody > tr:last-child").append("<td style='text-align: center;'><nobr> <input type='submit' value='...' name='"+i+"'> </nobr></td>");
        //$("#processos_table > tbody > tr:last-child").append("</tr><input id='"+i+"' onclick='validateFormAdm(this.name)' type='submit' value='...' name='"+lista_vaga[i]["id"]+"'>");
        $("#processos_table > tbody > tr:last-child").append("<button id='"+i+"' name='"+lista_vaga[i]["id"]+"' onclick='validateFormAdm(this.name);' class='btn'><i class='fa fa-search'></i></button>");

        
    }
});
