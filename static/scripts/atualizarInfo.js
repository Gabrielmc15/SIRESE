
$(".modalBtn").each(function (){
    $(this).on("click", function(){
        var modal = document.getElementById(($(this).val()));  
        
        modal.style.display = "block";

        return false;  
    });
});


$(".close").each(function (){
    $(this).on('click',function(){
        $(".modal").css('display', 'none'); 
    });
});


function validadeFormCodigoVerificacao(){
    $("#reenviar_codigo").after("<input type='hidden' name='reenviar' value='sim'>");
    $("#formulario").submit();
}

function atualizaCandidato(){
    //colocar ids nas tds do candidato e atualizar elas com o valor dos inputs

    if (validaCandidato() == false){
        return false;
    }
    $("#td_nome").text($("#nome").val());
    $("#td_email").text($("#email").val());
    $("#td_telefone").text($("#telefone").val());
    $("#td_cep").text($("#cep").val());
    $("#td_sexo").text($("#sexo option:selected").text());
    $("#td_estado_civil").text($("#estado_civil option:selected").text());
    $("#td_data_nascimento").text($("#data_nascimento").val());
    $("#td_dias_disponiveis").text($("#dias_disponiveis option:selected").text());
    $("#td_turno_disponivel").text($("#turno_disponivel option:selected").text());
    $("#td_disponibilidade_viagens").text($("#disponibilidade_viagens option:selected").text());
    $("#td_renumeracao_pretendida").text($("#renumeracao_pretendida").val());
    $("#td_categoria").text($("#categoria option:selected").text());
    $("#td_descricao_pcd").text($("#descricao_pcd").val());
    $("#td_laudo").text($("#laudo option:selected").text());
    $("#td_observacoes_pcd").text($("#observacoes_pcd").val());

    $(".modal").css('display', 'none'); 
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validaCandidato(){
    var email = document.getElementById("email").value;
    if(!validateEmail(email)){
        $("#texto_email").css('display', 'inline-block'); 
        $("#email").focus(); 
        
        return false;
    }else{
        $("#texto_email").css('display', 'none'); 
    }

    if (document.getElementById("table_cargo").rows.length == 0){
        $("#texto_cargo").css('display', 'inline-block'); 
        $("#cargo").focus(); 
        return false;
    }else{
        $("#texto_cargo").css('display', 'none'); 
    }

    //checar se cep esta preenchido
    if($("#cep").inputmask('unmaskedvalue').length != 8){
        $("#texto_cep").css('display', 'inline-block'); 
        $("#cep").focus(); 
        return false;
    }else{
        $("#texto_cep").css('display', 'none'); 
    }

    //checar se telefone esta preenchido
    if($("#telefone").inputmask('unmaskedvalue').length != 11){
        $("#texto_telefone").css('display', 'inline-block'); 
        $("#telefone").focus(); 
        return false;
    }else{
        $("#texto_telefone").css('display', 'none'); 
    }

    if(!validateDate($("#data_nascimento").prop("value"))){
        $("#texto_data_nascimento").css('display', 'inline-block'); 
        $("#data_nascimento").focus(); 
        return false;
    }else{
        $("#texto_data_nascimento").css('display', 'none'); 
    }

    if($("#deficiencia_checkbox").prop("checked")){
        if(!$("#descricao_pcd").prop("value")){
            $("#texto_descricao_pcd").css('display', 'inline-block'); 
            $("#descricao_pcd").focus(); 
            return false;
        }else{
            $("#texto_descricao_pcd").css('display', 'none'); 
        }
        if(!$("#laudo").prop("value")){
            $("#texto_laudo").css('display', 'inline-block'); 
            $("#laudo").focus(); 
            return false;
        }else{
            $("#texto_laudo").css('display', 'none'); 
        }
    }
    
        
}

function setaselects(){
    var sexo = $("#td_sexo").text();
    $("#sexo option").filter(function() {
        return this.text == sexo; 
    }).attr('selected', true);

    var estado_civil = $("#td_estado_civil").text();
    $("#estado_civil option").filter(function() {
        return this.text == estado_civil; 
    }).attr('selected', true);

    var dias_disponiveis = $("#td_dias_disponiveis").text();
    $("#dias_disponiveis option").filter(function() {
        return this.text == dias_disponiveis; 
    }).attr('selected', true);

    var turno_disponivel = $("#td_turno_disponivel").text();
    $("#turno_disponivel option").filter(function() {
        return this.text == turno_disponivel; 
    }).attr('selected', true);

    //o texto nao vale para esse pois é um texto personalizado
    var disponibilidade_viagens = $("#td_disponibilidade_viagens").text();
    $("#disponibilidade_viagens option").filter(function() {
        return this.text == disponibilidade_viagens; 
    }).attr('selected', true);

    var categoria = $("#td_categoria").text();
    $("#categoria option").filter(function() {
        return this.text == categoria; 
    }).attr('selected', true);
    
    var descricao_pcd = $("#td_descricao_pcd").text();
    $("#descricao_pcd option").filter(function() {
        return this.text == descricao_pcd; 
    }).attr('selected', true);

    var laudo = $("#td_laudo").text();
    $("#laudo option").filter(function() {
        return this.text == laudo; 
    }).attr('selected', true);
}

setaselects();



function atualizaModal(modalId){
    //ModalId == nome do modal
    if(modalId == 'cargo'){
        var table = document.getElementById("table_cargo");
        $("#td_cargo_pretendido").empty();
        linha = "";
        for(var i = 0, row; row = table.rows[i]; i++){
            linha = linha + $("td", row).text() + " <br>"
        }
        $("#td_cargo_pretendido").append(linha);
        return true; 
    }
    if(modalId == "experiencia_"){
        var table = document.getElementById("table_experiencia");
    }else{
        var table = document.getElementById("table_"+modalId);
    }
    $("#div_"+modalId).empty();
    //Iterar sobre as linhas da tabela modalId
    for (var i = 1, row; row = table.rows[i]; i++) {
        if(modalId == 'formacao'){
            $("#div_"+modalId).append("<h5 class='mt-4 mb-3'><strong>"+i+"ª Formação</strong></h5><div class='card-body'><table id='tabela_"+modalId+""+i+"' class='table user-view-table m-0'><tbody></tbody></table></div>")
            //iterate trough columns
            for (var j = 0, col; col = row.cells[j]; j++) {
                // do something
                if(j == 0){
                    $("#tabela_"+modalId+""+i+" tbody").append("<tr></tr>")
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>Curso</td>");
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>"+row.cells[j].innerHTML+"</td>");
                }
                if(j == 1){
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").after("<tr></tr>")
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>Instituição</td>");
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>"+row.cells[j].innerHTML+"</td>");
                }
                if(j == 2){
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").after("<tr></tr>")
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>Nível</td>");
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>"+row.cells[j].innerHTML+"</td>");                
                }
                if(j == 3){
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").after("<tr></tr>")
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>Situação</td>");
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>"+row.cells[j].innerHTML+"</td>");
                }
                if(j == 4){
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").after("<tr></tr>")
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>Início / Términio</td>");
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>"+row.cells[j].innerHTML+" - "+row.cells[j+1].innerHTML+"</td>");
                }
            }
        }
        if(modalId == 'experiencia_'){
            $("#div_"+modalId).append("<h5 class='mt-4 mb-3'><strong>"+i+"ª Experiencia</strong></h5><div class='card-body'><table id='tabela_"+modalId+""+i+"' class='table user-view-table m-0'><tbody></tbody></table></div>")
            //iterate trough columns
            for (var j = 0, col; col = row.cells[j]; j++) {
                // do something
                if(j == 0){
                    $("#tabela_"+modalId+""+i+" tbody").append("<tr></tr>")
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>Empresa</td>");
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>"+row.cells[j].innerHTML+"</td>");
                }
                if(j == 1){
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").after("<tr></tr>")
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>Cargo</td>");
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>"+row.cells[j].innerHTML+"</td>");
                }
                if(j == 2){
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").after("<tr></tr>")
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>Inicio</td>");
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>"+row.cells[j].innerHTML+"</td>");
                }
                if(j == 3){
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").after("<tr></tr>")
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>Fim</td>");
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>"+row.cells[j].innerHTML+"</td>");
                }
                if(j == 4){
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").after("<tr></tr>")
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>Descrição</td>");
                    $("#tabela_"+modalId+""+i+" > tbody > tr:last-child").append("<td>"+row.cells[j].innerHTML+"</td>");                
                }
            }
        }
        
    }   
    $(".modal").css('display', 'none');  
}

//função que deixa os dados obtidos no formulario prontos para serem inseridos no banco
function organizarDados(){

    $("#cargo_exp").prop('disabled', true)
    $("#cargo").prop('disabled', true)
    $("#curso").prop('disabled', true)
    $("#instituicao").prop('disabled', true)
    $("#inicio").prop('disabled', true)
    $("#terminio_formacao").prop('disabled', true)
    $("#empresa").prop('disabled', true)
    $("#ano_inicio_experiencia").prop('disabled', true)
    $("#ano_fim_experiencia").prop('disabled', true)
    $("#descricao_experiencia").prop('disabled', true)
    //se tiver vazio disebla obsercacoes_pcd
    if (!$("#observacoes_pcd").prop("value")){
        $("#observacoes_pcd").prop('disabled', true)
    }

    //organizando os nomes e ids das tabelas de cargos, formaçao e experiencia
    $("#table_cargo > tbody > tr> input").each(function(i=0){
        $(this).prop('id',"cargo_pretendido" + i.toString());
        $(this).prop('name',"cargo_pretendido" + i.toString());
        i=i+1
    });


    $("#table_formacao > tbody > tr").each(function(i=0){
        $("input",this)[0].id = "curso" + i.toString();
        $("input",this)[0].name = "curso" + i.toString();

        $("input",this)[1].id = "instituicao" + i.toString();
        $("input",this)[1].name = "instituicao" + i.toString();

        $("input",this)[2].id = "nivel" + i.toString();
        $("input",this)[2].name = "nivel" + i.toString();

        $("input",this)[3].id = "situacao" + i.toString();
        $("input",this)[3].name = "situacao" + i.toString();

        $("input",this)[4].id = "inicio" + i.toString();
        $("input",this)[4].name = "inicio" + i.toString();

        $("input",this)[5].id = "terminio_formacao" + i.toString();
        $("input",this)[5].name = "terminio_formacao" + i.toString();

        i=i+1;
    });

    $("#table_experiencia > tbody > tr").each(function(i=0){
        $("input",this)[0].id = "empresa" + i.toString();
        $("input",this)[0].name = "empresa" + i.toString();

        $("input",this)[1].id = "cargo" + i.toString();
        $("input",this)[1].name = "cargo" + i.toString();

        $("input",this)[2].id = "ano_inicio_experiencia" + i.toString();
        $("input",this)[2].name = "ano_inicio_experiencia" + i.toString();

        $("input",this)[3].id = "ano_fim_experiencia" + i.toString();
        $("input",this)[3].name = "ano_fim_experiencia" + i.toString();

        $("input",this)[4].id = "descricao_experiencia" + i.toString();
        $("input",this)[4].name = "descricao_experiencia" + i.toString();
        i=i+1;
    });

    var numero_cargo_pretendido = document.getElementById("table_cargo").rows.length;
    var numero_formacao = document.getElementById("table_formacao").rows.length -1;
    var numero_experiencia = document.getElementById("table_experiencia").rows.length -1;

    $("#ModalExperiencias").after("<input type='hidden' name='numero_cargo' value='"+numero_cargo_pretendido+"'>")
    $("#ModalExperiencias").after("<input type='hidden' name='numero_formacao' value='"+numero_formacao+"'>")
    $("#ModalExperiencias").after("<input type='hidden' name='numero_experiencia' value='"+numero_experiencia+"'>")
}

function addCargoPretendido(tableID){
    var linhas = document.getElementById("table_"+tableID).rows.length;
    
    if($("#table_"+tableID).css('display') == 'none')
      $("#table_"+tableID).css('display', 'inline-table');
    if($("#div_table_"+tableID).css('display') == 'none')
      $("#div_table_"+tableID).css('display', 'inline-table');
  
    if (!($("#table_"+tableID+" > tbody").length))
        $("#table_"+tableID+" > thead").after( "<tbody></tbody>" );
    $("#table_"+tableID+" > tbody").append('<tr></tr>');
    
    $("#div_"+tableID+" input,#div_"+tableID+" select").each(function() {
        $("#table_"+tableID+" > tbody > tr:last-child").append("<td>" + $(this).val()+ "</td>");

        $("#table_"+tableID+" > tbody > tr:last-child").append("<input type='hidden' name="+$(this).attr("name")+"_pretendido"+linhas+" value='"+ $(this).val() +"'>");
    });
    
    $('#clear_' + tableID + '_button').css('display', 'inline-table'); 
  
    $("#div_"+tableID+" input").each(function() {
      $(this).prop('value', "");
      $(this).prop('required', false);
    });
  
    $('#add_' + tableID + '_button').prop('disabled', true);
}
