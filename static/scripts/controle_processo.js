function validadeFormProcesso(idButton){
    if(idButton.id == "processo_aprovado_button" && confirm("Tem certeza que deseja aprovar este processo?") ){
        document.getElementById("processo_aprovado").disabled = false;
        document.getElementById("processo_aprovado").value = idButton.value;
        document.getElementById("formulario").submit()
    }else if(idButton.id == "processo_recusado_button" && confirm("Tem certeza que deseja recusar este processo?")){
        document.getElementById("processo_recusado").disabled = false;
        document.getElementById("processo_recusado").value = idButton.value;
        document.getElementById("formulario").submit()
    }

    
}

function transformarData(data){
    var dtArray = data.split("-");
    if (dtArray == null)
      return false;
  
    var dtYear= dtArray[0];
    var dtMonth = dtArray[1];
    var dtDay = dtArray[2];
    
    return (dtDay + "/" + dtMonth + "/" + dtYear);
}

lista_vaga = JSON.parse(document.getElementById("lista_vaga").innerHTML.replace(/'/g, '"'));

function mostraProcesso(processoID){
    $("#processo_selecionado tbody").remove();
    var data = transformarData(lista_vaga[processoID]['data'])
    var motivo;
    var sexo;
    var turno;
    var horario_de_trabalho;
    if (lista_vaga[processoID]['motivo'] == 0){
        motivo = "Aumento de Quadro";
    }else if(lista_vaga[processoID]['motivo'] == 1){
        motivo = "Estagio";
    }else if(lista_vaga[processoID]['motivo'] == 2){
        motivo = "Serviço Temporário";
    }else if(lista_vaga[processoID]['motivo'] == 3){
        motivo = "Substituição de Colaborador";
    }else if(lista_vaga[processoID]['motivo'] == 4){
        motivo = "Cumprimento de Cota";
    }else if(lista_vaga[processoID]['motivo'] == 5){
        motivo = "Outro";
    }
    
    if (lista_vaga[processoID]['sexo'] == 0){
        sexo = "Indiferente";
    }else if(lista_vaga[processoID]['sexo'] == 1){
        sexo = "Masculino";
    }else if(lista_vaga[processoID]['sexo'] == 2){
        sexo = "Feminino";
    }

    if (lista_vaga[processoID]['turno'] == 0){
        turno = "Indiferente";
    }else if(lista_vaga[processoID]['turno'] == 1){
        turno = "Diurno";
    }else if(lista_vaga[processoID]['turno'] == 2){
        turno = "Noturno";
    }

    if (lista_vaga[processoID]['horario_de_trabalho'] == 0){
        horario_de_trabalho = "Indiferente";
    }else if(lista_vaga[processoID]['horario_de_trabalho'] == 1){
        horario_de_trabalho = "Segunda a Sexta";
    }else if(lista_vaga[processoID]['horario_de_trabalho'] == 2){
        horario_de_trabalho = "Segunda a Sábado";
    }
    else if(lista_vaga[processoID]['horario_de_trabalho'] == 2){
        horario_de_trabalho = "Escala";
    }

    $("#processo_selecionado").append("<tbody><tr><td>Cargo Solicitado:</td><td>"+lista_vaga[processoID]['cargo']+"</td></tr><tr><td><nobr>Gestor Solicitante</nobr></td><td>"+lista_vaga[processoID]['gestor']+"</td></tr><tr><td>Setor Solicitante:</td><td>"+lista_vaga[processoID]['setor']+"</td></tr><tr><td><nobr>Data da Solicitação:</nobr></td><td>"+data+"</td></tr><tr><td>Motivo:</td><td>"+motivo+"</td><tr>  <td>Justificativa:</td>  <td>"+lista_vaga[processoID]['justificativa']+"</td></tr><tr>  <td>Nº de Vagas:</td>  <td>"+lista_vaga[processoID]['numero_de_vagas']+"</td></tr><tr><td>Sexo:</td><td>"+sexo+"</td><tr><td><nobr>Empresa Contratante:</nobr></td>  <td>"+lista_vaga[processoID]['empresa_contratante']+"</td></tr><tr>  <td><nobr>Local de Trabalho:</nobr></td>  <td>"+lista_vaga[processoID]['local']+"</td></tr><tr>  <td>Turno:</td><td>"+turno+"</td><tr>  <td>Horario de Trabalho:</td> <td>"+horario_de_trabalho+"</td><tr>  <td><nobr>Renumeração Proposta:</nobr></td>  <td>R$ "+lista_vaga[processoID]['renumeracao_proposta']+"</td></tr><tr><td colspan='2' style='text-align:center;'><nobr><button style='margin-right:2%' type='button' id='processo_aprovado_button' value='"+lista_vaga[processoID]['id']+"' onclick='validadeFormProcesso(this)' class='btn'>Aprovar Processo</button><button type='button' id='processo_recusado_button' value='"+lista_vaga[processoID]['id']+"' onclick='validadeFormProcesso(this)' class='btn'>Recusar Processo</button></nobr></td></tr></tbody>")
}


$(".modalBtn").each(function (){
    $(this).on("click", function(){
        console.log($(this).val()-1);
        var modal = document.getElementById("myModal");  
        
        modal.style.display = "block";
        mostraProcesso($(this).val()-1);
        return false;  
    });
});

var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    var modal = document.getElementById("myModal");  
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById("myModal");  
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

