function transformarEmObjeto(texto){
    return JSON.parse(texto)
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

var lista_candidato = transformarEmObjeto(document.getElementById("lista_candidato").innerHTML.replace(/'/g, '"'))

var lista_formacao = transformarEmObjeto(document.getElementById("lista_formacao").innerHTML.replace(/'/g, '"'))

var lista_experiencia = transformarEmObjeto(document.getElementById("lista_experiencia").innerHTML.replace(/'/g, '"'))

var lista_cargo_pretendido = transformarEmObjeto(document.getElementById("lista_cargo_pretendido").innerHTML.replace(/'/g, '"'))

var lista_cnh = transformarEmObjeto(document.getElementById("lista_cnh").innerHTML.replace(/'/g, '"'))

var lista_deficiencia = transformarEmObjeto(document.getElementById("lista_deficiencia").innerHTML.replace(/'/g, '"'))

var lista_habilidade = transformarEmObjeto(document.getElementById("lista_habilidade").innerHTML.replace(/'/g, '"'))

function carregarCandidatos(lista_candidato, lista_formacao, lista_experiencia, lista_cargo_pretendido, lista_cnh, lista_deficiencia, lista_habilidade){
    var candidato = {}  
    candidato = Object.assign(lista_candidato)
    for(var i=0 ; i<candidato.length ; i++){
        var atual=0;
        candidato[i].formacao = {}
        candidato[i].experiencia = {}
        candidato[i].cargo_pretendido = {}
        candidato[i].cnh = {}
        candidato[i].deficiencia = {}
        candidato[i].habilidade = {}
        
        for(var j=0 ; j<lista_formacao.length ; j++){
            if(lista_formacao[j]["id_candidato"] == candidato[i]["id"]){
                candidato[i].formacao[atual] = Object.assign(lista_formacao[j]);
                atual++;
            }  
        }
        atual = 0;
        for(var j=0 ; j<lista_experiencia.length ; j++){
            if(lista_experiencia[j]["id_candidato"] == candidato[i]["id"]){
                candidato[i].experiencia[atual] = Object.assign(lista_experiencia[j]);
                atual++;
            }
        }
        atual = 0;
        for(var j=0 ; j<lista_cargo_pretendido.length ; j++){
            if(lista_cargo_pretendido[j]["id_candidato"] == candidato[i]["id"]){
                candidato[i].cargo_pretendido[atual] = Object.assign(lista_cargo_pretendido[j]);
                atual++;
            }
        }
        atual = 0;
        for(var j=0 ; j<lista_cnh.length ; j++){
            if(lista_cnh[j]["id_candidato"] == candidato[i]["id"]){
                candidato[i].cnh[atual] = Object.assign(lista_cnh[j]);
                atual++;
            }
        }
        atual = 0;
        for(var j=0 ; j<lista_deficiencia.length ; j++){
            if(lista_deficiencia[j]["id_candidato"] == candidato[i]["id"]){
                candidato[i].deficiencia[atual] = Object.assign(lista_deficiencia[j]);
                atual++;
            }
        }
        atual = 0;
        for(var j=0 ; j<lista_habilidade.length ; j++){
            if(lista_habilidade[j]["id_candidato"] == candidato[i]["id"]){
                candidato[i].habilidade[atual] = Object.assign(lista_habilidade[j]);
                atual++;
            }
        }
    }
    return candidato;
}
candidato = carregarCandidatos(lista_candidato,lista_formacao, lista_experiencia, lista_cargo_pretendido, lista_cnh, lista_deficiencia, lista_habilidade);



function mostraCandidato(processoID){
    processoID--;
    $("#table_candidato_selecionado").empty();
    $("#table_candidato_selecionado").append("<table id='candidato_selecionado' class='table user-view-table m-0'></table>")

    var data = transformarData(candidato[processoID]['data_nascimento'])
    var dias_disponiveis;
    var sexo;
    var estado_civil;
    var turno_disponivel;
    var disponibilidade_viagens;

    $("#candidato_selecionado:last-child").append("<tbody><tr><td>Nome:</td><td>"+candidato[processoID]["nome"]+"</td></tr>")
    $("#candidato_selecionado:last-child").append("<tr><td>Email:</td><td>"+candidato[processoID]["email"]+"</td></tr>")
    $("#candidato_selecionado:last-child").append("<tr><td>Telefone:</td><td>"+candidato[processoID]["telefone"]+"</td></tr>")
    if(candidato[processoID]["sexo"] == 0){
        sexo = "Masculino";
    }else if(candidato[processoID]["sexo"] == 1){
        sexo = "Feminino";
    }
    $("#candidato_selecionado:last-child").append("<tr><td>Sexo:</td><td>"+sexo+"</td></tr>")
    if(candidato[processoID]["estado_civil"] == 0){
        estado_civil = "Solteiro";
    }else if(candidato[processoID]["estado_civil"] == 1){
        estado_civil = "Casado";0
    }else if(candidato[processoID]["estado_civil"] == 2){
        estado_civil = "Indiferente";
    }
    $("#candidato_selecionado:last-child").append("<tr><td>Estado Civil:</td><td>"+estado_civil+"</td></tr>")
    $("#candidato_selecionado:last-child").append("<tr><td>Nascimento:</td><td>"+data+"</td></tr>")
    if(candidato[processoID]["dias_disponiveis"] == 0){
        dias_disponiveis = "Segunda a Sexta";
    }else if(candidato[processoID]["dias_disponiveis"] == 1){
        dias_disponiveis = "Segunda a Sábado";
    }else if(candidato[processoID]["dias_disponiveis"] == 2){
        dias_disponiveis = "Escala";
    }
    $("#candidato_selecionado:last-child").append("<tr><td>Dias Disponíveis:</td><td>"+dias_disponiveis+"</td></tr>")
    if(candidato[processoID]["turno_disponivel"] == 0){
        turno_disponivel = "Diurno";
    }else if(candidato[processoID]["turno_disponivel"] == 1){
        turno_disponivel = "Noturno";
    }
    $("#candidato_selecionado:last-child").append("<tr><td><nobr>Turno Diponível:</nobr></td><td>"+turno_disponivel+"</td></tr>")
    if(candidato[processoID]["disponibilidade_viagens"] == 0){
        disponibilidade_viagens = "Possui Disponibilidade";
    }else if(candidato[processoID]["disponibilidade_viagens"] == 1){
        disponibilidade_viagens = "Não Possui Disponibilidade";
    }
    $("#candidato_selecionado:last-child").append("<tr><td><nobr>Viagens:</nobr></td><td>"+disponibilidade_viagens+"</td></tr>")
    $("#candidato_selecionado:last-child").append("<tr><td><nobr>Renumeração Pretendida:</nobr></td><td> R$ "+candidato[processoID]["renumeracao_pretendida"]+"</td></tr>")
    var row = "<tr><td><nobr>Cargo(s) Pretendido(s):</nobr></td><td>"
    for(cargo in candidato[processoID]["cargo_pretendido"]){
        row = row + candidato[processoID]["cargo_pretendido"][cargo]["descricao_cargo"] + " / ";
    }
    row = row +"</td></tr>";
    $("#candidato_selecionado:last-child").append(row)
    row = "<tr><td><nobr>Habilidades:</nobr></td><td>"
    for(habilidade in candidato[processoID]["habilidade"]){
        row = row + candidato[processoID]["habilidade"][habilidade]["tag"] + " / ";
    }
    row = row +"</td></tr>";
    $("#candidato_selecionado:last-child").append(row)
    if(candidato[processoID]["deficiencia"][0]){
        $("#candidato_selecionado:last-child").append("<tr><td><nobr>Deficiencia:</nobr></td><td>"+candidato[processoID]["deficiencia"][0]["descricao_pcd"]+"</td></tr>")
        var laudo;
        if(candidato[processoID]["deficiencia"][0]["laudo"] = 0){
            laudo = "Não Possui"
        }else if(candidato[processoID]["deficiencia"][0]["laudo"] = 1){
            laudo = "Possui"
        }
        $("#candidato_selecionado:last-child").append("<tr><td><nobr>Laudo:</nobr></td><td>"+laudo+"</td></tr>")

        if(candidato[processoID]["deficiencia"][0]["observacoes_pcd"] != ""){
            $("#candidato_selecionado:last-child").append("<tr><td><nobr>Observações:</nobr></td><td>"+candidato[processoID]["deficiencia"][0]["observacoes_pcd"]+"</td></tr>")
        }
        
    }else{
        $("#candidato_selecionado:last-child").append("<tr><td><nobr>Deficiencia:</nobr></td><td>Não Possui</td></tr>");
    }
   
    if(candidato[processoID]["formacao"][0]){
        $("#table_candidato_selecionado").append("</tbody></table>");
        $("#table_candidato_selecionado").append("<h4 class='mt-4 mb-3'><strong>Formações</strong></h4>");
        for(formacao in candidato[processoID]["formacao"]){
            
            $("#table_candidato_selecionado").append("<h5 class='mt-4 mb-3'><strong>"+(parseInt(formacao)+1)+"ª Formação</strong></h5>");
            $("#table_candidato_selecionado").append("<table id='"+(parseInt(formacao)+1)+"_formacao' class='table user-view-table m-0'><tbody><tr><td><nobr>Curso:</nobr></td><td>"+candidato[processoID]["formacao"][formacao]["curso"]+"</td></tr>")
            $("#"+(parseInt(formacao)+1)+"_formacao tbody:last-child").append("<tr><td><nobr>Instituição:</nobr></td><td>"+candidato[processoID]["formacao"][formacao]["instituicao"]+"</td></tr>")
            $("#"+(parseInt(formacao)+1)+"_formacao tbody:last-child").append("<tr><td><nobr>Nível:</nobr></td><td>"+candidato[processoID]["formacao"][formacao]["nivel"]+"</td></tr>")
            $("#"+(parseInt(formacao)+1)+"_formacao tbody:last-child").append("<tr><td><nobr>Início / Conclusão:</nobr></td><td>"+candidato[processoID]["formacao"][formacao]["inicio"]+ " - " + candidato[processoID]["formacao"][formacao]["terminio_formacao"]+"</td></tr>")
        }
    }
    
    if(candidato[processoID]["experiencia"][0]){
        $("#table_candidato_selecionado").append("</tbody></table>");
        $("#table_candidato_selecionado").append("<h4 class='mt-4 mb-3'><strong>Experiências</strong></h4>");
        for(experiencia in candidato[processoID]["experiencia"]){
            
            $("#table_candidato_selecionado").append("<h5 class='mt-4 mb-3'><strong>"+(parseInt(experiencia)+1)+"ª Experiência</strong></h5>");
            $("#table_candidato_selecionado").append("<table id='"+(parseInt(experiencia)+1)+"_experiencia' class='table user-view-table m-0'><tbody><tr><td><nobr>Cargo:</nobr></td><td>"+candidato[processoID]["experiencia"][experiencia]["cargo"]+"</td></tr>")
            $("#"+(parseInt(experiencia)+1)+"_experiencia tbody:last-child").append("<tr><td><nobr>Empresa:</nobr></td><td>"+candidato[processoID]["experiencia"][experiencia]["empresa"]+"</td></tr>")
            $("#"+(parseInt(experiencia)+1)+"_experiencia tbody:last-child").append("<tr><td><nobr>Descrição:</nobr></td><td>"+candidato[processoID]["experiencia"][experiencia]["descricao_experiencia"]+"</td></tr>")
            $("#"+(parseInt(experiencia)+1)+"_experiencia tbody:last-child").append("<tr><td><nobr>Entrada:</nobr></td><td>"+candidato[processoID]["experiencia"][experiencia]["ano_inicio_experiencia"]+"</td></tr>")
            $("#"+(parseInt(experiencia)+1)+"_experiencia tbody:last-child").append("<tr><td><nobr>Saída:</nobr></td><td>"+candidato[processoID]["experiencia"][experiencia]["ano_fim_experiencia"]+"</td></tr>")
        }
    }

    
    $("#candidato_selecionado:last-child").append("</table></tbody>")

}


function mostraModal(candidatoID){
    var modal = document.getElementById("myModal");  
    
    modal.style.display = "block";
    mostraCandidato(candidatoID);
    return false; 
}

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

$( document ).ready(function() {
    $("input[type=checkbox]").on("click",function(){
        var checkboxValue =$(this).prop("value");
        if($(this).prop("checked")){
            $("#tr_"+checkboxValue).css("background-color", "#53e97733")
        }else{
            $("#tr_"+checkboxValue).css("background-color", "#ffffff")
        }
    });
});
