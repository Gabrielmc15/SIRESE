
function validateFormIndex() {
  var data_nascimento = document.forms["formulario"]["data_nascimento"].value;
  if(!validateDate(data_nascimento)){
    $("#texto_data_nascimento").css('display', 'inline-block'); 
    $("#data_nascimento").focus();
    return false;
  }
  $("#button_proximo").prop("disabled",true);
}

function validateFormFormacao(){
  let inicio = document.forms["formulario"]["inicio"].value;
  let terminio_formacao = document.forms["formulario"]["terminio_formacao"].value;

  if(inicio != "" || terminio_formacao != ""){
    if(!compareData(inicio, terminio_formacao)){
      $("#texto_anos").css('display','inline-block');
      $("#inicio").focus();
      return false;
    }
  }

  var empty_formacao = false;
  $('#div_formacao input').each(function() {
    if ($(this).val() == '') {
      empty_formacao = true;
    }
  });
  if (!empty_formacao)
    addRow("formacao");
    
  var empty_experiencia = false;
  $('#div_experiencia input').each(function() {
    if ($(this).val() == '' && ($(this).prop("id") != "exp_ano_atual_checkbox")){
      empty_experiencia = true;
    }
  });
  
  if(!empty_experiencia)
    addRow("experiencia");

  $("#div_formacao input,#div_formacao select,#div_formacao textarea").each(function(){
    $(this).prop('disabled', true);
  });
  $("#div_experiencia input,#div_experiencia select,#div_experiencia textarea").each(function(){
    $(this).prop('disabled', true);
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
    $("input",this)[4].id = "descricao_experiencia" + (i).toString();
    $("input",this)[4].name = "descricao_experiencia" + (i).toString();
    
    i=i+1;
  ;})

  var linhas_formacao = document.getElementById("table_formacao").rows.length - 1;
  var linhas_experiencia = document.getElementById("table_experiencia").rows.length - 1;
  $("#table_formacao > tbody > tr:last-child").append("<input type='hidden' name='linhas_formacao' value="+ linhas_formacao +">");
  $("#table_experiencia > tbody > tr:last-child").append("<input type='hidden' name='linhas_experiencia' value="+ linhas_experiencia +">");
  
  document.getElementById("situacao").disabled = true;

  $("#div_tags_habilidade >  span > input").each(function(i=0){
    $(this).prop('id',"habilidade" + i.toString());
    $(this).prop('name',"habilidade" + i.toString());
    i=i+1
  });

  var numero_habilidades = $("#div_tags_habilidade > span > input").length;

  $("#div_tags_habilidade").append("<input type='hidden' name='numero_habilidades' value='"+numero_habilidades+"'>");

  $("#button_proximo").prop("disabled",true);
}

function validateFormInformacoesAdicionais(){
  $("#div_cargo input").each(function(){
    $(this).prop('disabled', true);
  });

  var empty_cargo = false;
  $('#div_cargo input').each(function() {
    if ($(this).val() == '') {
      empty_cargo = true;
    }
  });
  if(!empty_cargo)
    addRow("cargo");


  $("#table_cargo > tbody > tr> input").each(function(i=0){
    console.log($(this).prop("name"),":",$(this).prop("value"))
    $(this).prop('id',"cargo" + i.toString());
    $(this).prop('name',"cargo" + i.toString());
    i=i+1
  });  
  var linhas_cargo = document.getElementById("table_cargo").rows.length - 1;

  $("#div_deficiencia").append("<input type='hidden' name='linhas_cargo' value="+ linhas_cargo +">");
  $("#button_proximo").prop("disabled",true);
}

function show(divID){
  if (divID != "cargo"){
    $("#div_"+divID+" input,#div_"+divID+" select,#div_"+divID+" textarea").each(function(){
      disabled = $(this).prop("disabled");
      $(this).prop('disabled', disabled ? false : true);
      $(this).prop('value', "")
      $(this).prop('required', true)
    })
    $("#table_"+divID).css("display", "none");
    $("#add_"+divID+"_button").prop('disabled', true);
    $("#table_"+divID+" > tbody").remove(); 
  }else{
    $("#div_table_"+divID).css("display", "none");
    $("#table_"+divID+" > tbody").remove(); 
    $("#div_cargo input,#div_cargo textarea ").prop('required', true);
    $('#clear_' + divID + '_button').css('display', 'none'); 
  }
}

function ShowDeficiencia(deficiencia_checkbox) {
  var div_deficiencia = document.getElementById("div_deficiencia");
  document.getElementById("descricao_pcd").value = "";
  document.getElementById("laudo").value = "" 
  document.getElementById("observacoes_pcd").value = "" 

  document.getElementById("descricao_pcd").required = deficiencia_checkbox.checked ? true : false;
  document.getElementById("laudo").required = deficiencia_checkbox.checked ? true : false;

  div_deficiencia.style.display = deficiencia_checkbox.checked ? "block" : "none";
}

function addRow(tableID) {
  var linhas = document.getElementById("table_"+tableID).rows.length;
  if(tableID == "formacao"){
    let inicio = document.getElementById("inicio").value;
    let terminio_formacao = document.getElementById("terminio_formacao").value;

    if(!compareData(inicio, terminio_formacao)){
      $("#texto_anos").css('display','inline-block');
      $("#inicio").focus();
      return false;
    }else{
      $("#texto_anos").css('display','none');
    }
  }
  
  if($("#table_"+tableID).css('display') == 'none')
    $("#table_"+tableID).css('display', 'inline-table');  
  if($("#div_table_"+tableID).css('display') == 'none')
    $("#div_table_"+tableID).css('display', 'inline-table');

  if (!($("#table_"+tableID+" > tbody").length))
    $("#table_"+tableID+" > thead").after( "<tbody></tbody>" );
  $("#table_"+tableID+" > tbody").append('<tr></tr>');
  $("#div_"+tableID+" input,#div_"+tableID+" select,#div_"+tableID+" textarea").each(function() {

    if($(this).attr("name") == "situacao"){
      if($(this).val() == "0")
        $("#table_"+tableID+" > tbody > tr:last-child").append("<td style='text-align:center'>Completo</td>");
      if($(this).val() == "1")
        $("#table_"+tableID+" > tbody > tr:last-child").append("<td style='text-align:center'>Cursando</td>");
      if($(this).val() == "2")
        $("#table_"+tableID+" > tbody > tr:last-child").append("<td style='text-align:center'>Trancado</td>");
    }else{
      if(tableID =='cargo'){
        $("#table_"+tableID+" > tbody > tr:last-child").append("<td style='text-align:center'>" + $(this).val()+ "<span style='text-align:left' class='close' onclick='removeRow(this)'>&times;</span></td>");
      }else { 
        if(!($(this).prop("checked") == false && $(this).prop("id") == "exp_ano_atual_checkbox")){
          $("#table_"+tableID+" > tbody > tr:last-child").append("<td style='text-align:center'>" + $(this).val()+ "</td>");
        }
      }
    }
    if(!($(this).prop("checked") == false && $(this).prop("id") == "exp_ano_atual_checkbox")){
      $("#table_"+tableID+" > tbody > tr:last-child").append("<input type='hidden' name="+$(this).attr("name")+linhas+" value='"+ $(this).val() +"'>");
    }
  }); 
  
  if(tableID == "formacao"){
    document.getElementById("situacao").value = "";
    document.getElementById("situacao").required = false;
    document.getElementById("nivel").value = "";
    document.getElementById("nivel").required = false;
  }

  if(tableID == "cargo")
    $('#clear_' + tableID + '_button').css('display', 'inline-table'); 

  $("#div_"+tableID+" input,#div_"+tableID+" select,#div_"+tableID+" textarea").each(function() {
    $(this).prop('value', "");
    $(this).prop('required', false);
  }); 
  
  $("#exp_ano_atual_checkbox").prop("value","-");

  $('#add_' + tableID + '_button').prop('disabled', true); 
}

function checkButton(buttonID){
  $('#div_' + buttonID + ' input,#div_' + buttonID + ' select,#div_' + buttonID + ' textarea').on("change keyup", function(){
    var empty = false;
    $('#div_' + buttonID + ' input,#div_' + buttonID + ' select,#div_' + buttonID + ' textarea').each(function() {
      if ($(this).val() == '' && ($(this).prop("id") != "exp_ano_atual_checkbox")) {
          empty = true;
      }
    });
    if(buttonID == "formacao"){
      if (document.getElementById("situacao").value == ""){
        empty = true;
      }
    }
    $('#add_' + buttonID + '_button').prop('disabled', empty ? true : false);  
  })
}

function checkformacao(){
  var empty = false;
  $('#div_formacao input').each(function() {
    if ($(this).val() == '') {
      empty = true;
    }
  });
  if ($("#situacao").val() == "1" || $("#situacao").val() == "2"){
    $("#previsao_terminio_text").css('display', 'inline-block');
  }else{
    $("#previsao_terminio_text").css('display', 'none');
  }
  $('#add_formacao_button').prop('disabled', empty ? true : false);  
}

checkButton("formacao");
checkButton("experiencia")
checkButton("cargo")

function TestaCPF(strCPF) {
  strCPF = strCPF.replace(/[^0-9]+/g, "");
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") 
    return false;
  if (strCPF == "11111111111") 
    return false;
  if (strCPF == "22222222222") 
    return false;
  if (strCPF == "33333333333") 
    return false;
  if (strCPF == "44444444444") 
    return false;
  if (strCPF == "55555555555") 
    return false;
  if (strCPF == "66666666666") 
    return false;
  if (strCPF == "77777777777") 
    return false;
  if (strCPF == "88888888888") 
    return false;
  if (strCPF == "99999999999") 
    return false;

  for (i=1; i<=9; i++) 
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  
    Resto = 0;

  if (Resto != parseInt(strCPF.substring(9, 10)) ) 
    return false;

  Soma = 0;
  for (i = 1; i <= 10; i++) 
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);

  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  
    Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) 
    return false;

  return true;
}

$('#cpf').on("change", function(){
  if(TestaCPF($("#cpf").val())){
    //cpf válido
    $("#texto_cpf").css('display', 'none');
    $("#button_proximo").css("margin-top", "3.5%"); 
  }else{
    //cpf inválido
    $("#texto_cpf").css('display', 'inline-block'); 
    $("#button_proximo").css("margin-top", "-2%"); 
  }
})

function validateDate(data) {

  var dtArray = data.split("-");
  if (dtArray == null)
    return false;

  var dtYear= dtArray[0];
  var dtMonth = dtArray[1];
  var dtDay = dtArray[2];

  var data_atual = new Date();
  ano_atual = data_atual.getFullYear();

  if (dtMonth < 1 || dtMonth > 12)
    return false;
  else if (dtDay < 1 || dtDay> 31)
    return false;
  else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31)
    return false;
  else if (dtMonth == 2){
    var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
    if (dtDay> 29 || (dtDay ==29 && !isleap))
      return false;
  }
  if (dtYear < 1930 || dtYear >= ano_atual-14)
    return false;
  return true;
}

function compareData(data1, data2){
  var dtArray1 = data1.split("-");
  if (dtArray1 == null)
    return false;

  var dtArray2 = data2.split("-");
  if (dtArray2 == null)
    return false;
  
  var data_atual = new Date();
  ano_atual = data_atual.getFullYear();

  var dtYear1 = dtArray1[0];
  var dtYear2 = dtArray2[0];

  if (dtYear2 < dtYear1)
    return false;

  if (dtYear1 <= 1950 || dtYear1 > ano_atual+25)
    return false;

  return true;
}

$('#data_nascimento').on("change", function(){
  if(validateDate($('#data_nascimento').val()))
    $("#texto_data_nascimento").css('display', 'none');
  else
    $("#texto_data_nascimento").css('display', 'inline-block'); 
})

function adicionarNaTabelaExp(){
  lista_experiencias = JSON.parse(document.getElementById("lista_experiencias").innerHTML.replace(/'/g, '"'));
  console.log(lista_experiencias)
  for(var linha = 0; linha < parseInt(lista_experiencias["linhas_formacao"]); linha++){
    document.getElementById("curso").value = lista_experiencias["curso"+(parseInt(linha))];
    document.getElementById("instituicao").value = lista_experiencias["instituicao"+(parseInt(linha))];
    document.getElementById("nivel").value = lista_experiencias["nivel"+(parseInt(linha))];
    document.getElementById("situacao").value = lista_experiencias["situacao"+(parseInt(linha))];
    document.getElementById("inicio").value = lista_experiencias["inicio"+(parseInt(linha))];
    document.getElementById("terminio_formacao").value = lista_experiencias["terminio_formacao"+(parseInt(linha))];
    addRow("formacao");
    attRow("formacao");
  }
  for(var linha = 0; linha < parseInt(lista_experiencias["linhas_experiencia"]); linha++){
    document.getElementById("empresa").value = lista_experiencias["empresa"+(parseInt(linha))];
    document.getElementById("cargo_exp").value = lista_experiencias["cargo"+(parseInt(linha))];
    document.getElementById("ano_inicio_experiencia").value = lista_experiencias["ano_inicio_experiencia"+(parseInt(linha))];
    console.log(lista_experiencias["ano_fim_experiencia"+(parseInt(linha))]);
    document.getElementById("ano_fim_experiencia").value = lista_experiencias["ano_fim_experiencia"+(parseInt(linha))];
    document.getElementById("descricao_experiencia").value = lista_experiencias["descricao_experiencia"+(parseInt(linha))];
    addRow("experiencia");
    attRow("experiencia");
  }
  //adiciona habilidades aqui
  for(var linha=0; linha < parseInt(lista_experiencias['numero_habilidades']); linha++){
    $("#div_tags_habilidade").append("<span><button type='button' class='taghabilidade btn btnContac' style='border-radius: 2.5rem;margin-right:2%;margin-bottom: 2%;'>"+lista_experiencias['habilidade'+linha]+"<span onclick='removeTag(this)' style='text-align:right;font-size: 20px; padding-left:4px;' class='close'>&times;</span></button><input type='hidden' name='habilidadeX' value='"+lista_experiencias['habilidade'+linha]+"'></span>");
  }
}

if(document.getElementById("lista_experiencias")){
  if(document.getElementById("lista_experiencias").innerHTML)
    adicionarNaTabelaExp();
}

function adicionarNaTabelaInfoAdd(){
  lista_informacoes_adicionais = JSON.parse(document.getElementById("lista_informacoes_adicionais").innerHTML.replace(/'/g, '"'));
  console.log(lista_informacoes_adicionais)
  for(var linha = 0; linha < parseInt(lista_informacoes_adicionais["linhas_cargo"]); linha++){
    document.getElementById("cargo").value = lista_informacoes_adicionais["cargo"+(parseInt(linha))];
    addRow("cargo");
  }
}

if(document.getElementById("lista_informacoes_adicionais")){
  if(document.getElementById("lista_informacoes_adicionais").innerHTML)
    adicionarNaTabelaInfoAdd();
}

function removeRow(valueBotao){
  $(valueBotao).parent().parent().remove();
}

function attRow(table){
  $("#table_"+table+" > tbody > tr:last-child").append("<th style='font-weight: normal;text-align: center;'><button type='button' onclick='removeRow(this)' class='btn'><i class='fa fa-times'></i></button></th>");
}

$(document).ready(function () { 
  $("#colaborador_checkbox").on("click",function(){
    if($(this).prop("checked")){
      $("#empresa").after("<select class='form-control' required='' id='empresa' name='empresa' ><option disabled selected value=''>Selecionar</option><option value='Empresa1'>Empresa1</option><option value='Empresa2'>Empresa2</option><option value='Empresa3'>Empresa3</option><option value='Empresa4'>Empresa4</option><option value='Empresa5'>Empresa5</option><option value='Empresa6'>Empresa6</option></select>")
      $("#empresa").remove();
    }else{
      $("#empresa").after("<input class='form-control' autocomplete='off' required='' id='empresa' name='empresa' placeholder='Empresa' type='text' size='10'></input>")
      $("#empresa").remove();
    }
  });

  $("#experiencia_checkbox").on("click", function(){
    if($(this).prop("checked")){
      $("#p_colaborador").css("display","block");
    }else{
      $("#p_colaborador").css("display","none");

    }
  });

  $("#cpf").inputmask({
    mask: ['999.999.999-99'],
    showMaskOnFocus: false, 
    showMaskOnHover: false,
    placeholder: '_',
    removeMaskOnSubmit: true
  });

  $("#telefone").inputmask({
    mask: ['(99) 99999-9999'],
    showMaskOnFocus: false, 
    showMaskOnHover: false,
    placeholder: '_',
    removeMaskOnSubmit: true,
  });

  $("#cep").inputmask({
    mask: ['99999-999'],
    showMaskOnFocus: false, 
    showMaskOnHover: false,
    removeMaskOnSubmit: true,
    placeholder: '_'
  });

  $("#renumeracao_pretendida").inputmask('decimal', {
    showMaskOnFocus: false, 
    showMaskOnHover: false,
    radixPoint:",",
    groupSeparator: ".",
    autoGroup: true,
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
    rightAlign: false,
    removeMaskOnSubmit: true,
    'prefix': 'R$ ',
    onBeforeMask: function (value, opts) {
      return value;
    }
  });

});

$("#add_habilidade_button").on("click",function(){
  if($("#habilidade").prop("value") != "" ){
    $("#div_tags_habilidade").append("<div><a class='taghabilidade' style='margin-left:2%;cursor: pointer;' onclick='removeTag(this)'>"+$("#habilidade").prop("value")+"</a><input type='hidden' name='habilidadeX' value='"+$("#habilidade").prop('value')+"'></div>");
    $("#habilidade").prop("value","");
  }else{
    alert("campo em branco!");
  }
  $("#habilidade").focus();

});

$('#habilidade').on('keypress', function (e) {
  if(e.which === 13){
    event.preventDefault();

    //Disable textbox to prevent multiple submit
    $(this).attr("disabled", "disabled");
    //Do Stuff, submit, etc..
    if($("#habilidade").prop("value") != "" ){
      $("#div_tags_habilidade").append("<span><button type='button' class='taghabilidade btn btnContac' style='border-radius: 2.5rem;margin-right:2%;margin-bottom: 2%;'>"+$("#habilidade").prop("value")+"<span onclick='removeTag(this)' style='text-align:right;font-size: 20px; padding-left:4px;' class='close'>&times;</span></button><input type='hidden' name='habilidadeX' value='"+$("#habilidade").prop('value')+"'></span>");
      $("#habilidade").prop("value","");
    }else{
      alert("campo em branco!");
    }
    //Enable the textbox again if needed.
    $(this).removeAttr("disabled");
    $("#habilidade").focus();
  }
});

function removeTag(tag){
  $(tag).parent().parent().remove()
}

$("#exp_ano_atual_checkbox").on("click", function(){
  if($(this).prop("checked")== true){
    $("#ano_fim_experiencia").remove();  
    $("#texto_ano_saida").remove();
    $("#span_ano_saida").remove();
  }else if($(this).prop("checked")== false){
    $("#ano_inicio_experiencia").after("<span id='texto_ano_saida'>Ano de Saída: </span><span id='span_ano_saida' style='color:rgb(207, 27, 27);'>*</span> <input class='form-control' required type='number' id='ano_fim_experiencia' name='ano_fim_experiencia'>")
  }
});