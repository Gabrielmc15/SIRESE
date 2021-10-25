function validadeFormProcesso(idButton){
    if(idButton == "processo_aprovado_button" && confirm("Tem certeza que deseja aprovar este processo?") ){
        document.getElementById("processo_aprovado").disabled = false;
    }else if(idButton == "processo_recusado_button" && confirm("Tem certeza que deseja recusar este processo?")){
        document.getElementById("processo_recusado").disabled = false;
    }else if(idButton == "definir_processo_button"){
        document.getElementById("definir_processo").disabled = false;
    }

    document.getElementById("formulario").submit()
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