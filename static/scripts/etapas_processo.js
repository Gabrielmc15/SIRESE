function addPergunta(idBotao){
    etapa = document.getElementById(idBotao).value

    var pergunta = parseInt(document.getElementById("etapa"+etapa+"numero_perguntas").value) + 1
    

    
    $("#"+idBotao).before("<div id='idetapa"+etapa+"pergunta"+pergunta+"' class='form-inline pergunta'><input style='width: 74%;margin-right:0.5%' class='form-control' required type='text' name='pergunta"+pergunta+"etapa"+etapa+"' id='pergunta"+pergunta+"etapa"+etapa+"' value='' placeholder='Pergunta Nº "+pergunta+"'><select style='width: 24%;' required class='form-control' id='tipo_pergunta"+pergunta+"etapa"+etapa+"' name ='tipo_pergunta"+pergunta+"etapa"+etapa+"'><option disabled selected value=''>Tipo de Resposta</option><option value='0'>Texto</option><option value='1'>Texto Grande</option><option value='2'>Multipla Escolha</option><option value='2'>Caixa de Seleção</option></select>")
    
    document.getElementById("etapa"+etapa+"numero_perguntas").value = pergunta

    if (pergunta > 1){
        document.getElementById("botao_remove_pergunta_etapa"+etapa).disabled = false;
    }else{
        document.getElementById("botao_remove_pergunta_etapa"+etapa).disabled = true;
    }
}


function removePergunta(idBotao){
    var etapa = document.getElementById(idBotao).value;
    var pergunta = document.getElementById("etapa"+etapa+"numero_perguntas").value;
    
   
    if(document.getElementById("idetapa"+etapa+"pergunta"+pergunta) && pergunta > 1){
        document.getElementById("idetapa"+etapa+"pergunta"+pergunta).remove();
        document.getElementById("etapa"+etapa+"numero_perguntas").value = pergunta -1;
    }

    if (pergunta > 2){
        document.getElementById("botao_remove_pergunta_etapa"+etapa).disabled = false;
    }else{
        document.getElementById("botao_remove_pergunta_etapa"+etapa).disabled = true;
    }
}

function addEtapa(){
    var numero_etapas = parseInt(document.getElementById("numero_etapas").value) +1;

    $("#idetapa"+(numero_etapas-1)).after("<div id='idetapa"+numero_etapas+"'><p><h4><strong>Etapa Nº "+numero_etapas+"</strong></h4></p><input type='hidden' id='etapa"+numero_etapas+"numero_perguntas' name='etapa"+numero_etapas+"numero_perguntas' value='0'><button class='btn' id='botao_add_pergunta_etapa"+numero_etapas+"' value="+numero_etapas+" onclick='addPergunta(this.id); return false' style='float: right; margin-right: 1%;'><i class='fa fa-plus'></i></button><button class='btn' id='botao_remove_pergunta_etapa"+numero_etapas+"' disabled value="+numero_etapas+" onclick='removePergunta(this.id); return false' style='float: right;margin-right:1%;'><i class='fa fa-minus'></i></button></div>");
    addPergunta('botao_add_pergunta_etapa'+numero_etapas+'')

    document.getElementById("numero_etapas").value = numero_etapas;

    if(numero_etapas>1){
        document.getElementById("botao_remove_etapa").disabled = false;
    }else{
        document.getElementById("botao_remove_etapa").disabled = true;
    }
}

function removeEtapa(){
    var numero_etapas = parseInt(document.getElementById("numero_etapas").value);

    if(numero_etapas<=2){
        document.getElementById("botao_remove_etapa").disabled = true;
    }

    if(numero_etapas > 1){
        document.getElementById("idetapa"+numero_etapas).remove();
        document.getElementById("numero_etapas").value = numero_etapas-1;
    }
}

function validateFormEtapasProcesso(){
    document.getElementById("cargo_search").disabled=true;
    document.getElementById("curso_search").disabled=true;
    document.getElementById("renumeracao_search").disabled=true;
    document.getElementById("sexo_search").disabled=true;
    document.getElementById("estado_civil_search").disabled=true;
    document.getElementById("dias_search").disabled=true;
    document.getElementById("turno_search").disabled=true;
    document.getElementById("disponibilidade_viagens_search").disabled=true;

    var contador_numero_selecionados = 0;
    $("#tabela_seleciondados > tbody > tr input").each(function(){
        $(this).attr('name', "candidato_selecionado"+contador_numero_selecionados);
        $(this).attr('id', "candidato_selecionado"+contador_numero_selecionados);
        contador_numero_selecionados++;
    });
}