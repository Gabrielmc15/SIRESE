function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        document.getElementById("div_" + this.id).appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          if ((arr[i].toUpperCase().search(val.toUpperCase()) > 0) || (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase())) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML =  arr[i].substr(0, val.length);
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
        
    });
  }
  
/*An array containing all the country names in the world:*/
var instituicoes = ["FAMA - FACULDADE ATENAS MARANHENSE","FAMA - FACULDADE ATENAS MARANHENSE DE IMPERATRIZ","FABEA - FACULDADE BRASILEIRA DE ESTUDOS AVANÇADOS","UNIBALSAS - FACULDADE DE BALSAS","FACEMA - FACULDADE DE CIÊNCIAS E TECNOLOGIA DO MARANHÃO","FACSÃOLUÍS - FACULDADE DE CIÊNCIAS HUMANAS E SOCIAIS APLICADAS","FEBAC - FACULDADE DE EDUCAÇÃO DE BACABAL","FEST - FACULDADE DE EDUCAÇÃO SANTA TEREZINHA","FAESF - FACULDADE DE EDUCAÇÃO SÃO FRANCISCO","FACIMP - FACULDADE DE IMPERATRIZ","FACULDADE DE TECNOLOGIA INESUL DO MARANHÃO","FAP - FACULDADE DO BAIXO PARNAÍBA","FACEM - FACULDADE DO ESTADO DO MARANHÃO","FACAM-MA - FACULDADE DO MARANHÃO","FAI - FACULDADE DO VALE DO ITAPECURÚ","FAEME - FACULDADE EVANGÉLICA DO MEIO NORTE","FSJ - FACULDADE MARANHENSE SÃO JOSÉ DOS COCAIS","FACULDADE PITÁGORAS DE SÃO LUIZ","CESSF - FACULDADE SANTA FÉ","CEST - FACULDADE SANTA TEREZINHA","IESMA - INSTITUTO DE ENSINO SUPERIOR DO SUL DO MARANHÃO","IESF - INSTITUTO DE ENSINO SUPERIOR FRANCISCANO","IESM - INSTITUTO DE ENSINO SUPERIOR MÚLTIPLO","IESMA - INSTITUTO DE ESTUDOS SUPERIORES DO MARANHÃO","IFMA - INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO MARANHÃO","IFES - INSTITUTO FLORENCE DE ENSINO SUPERIOR","IMEC - INSTITUTO MARANHENSE DE ENSINO E CULTURA","UNDB - UNIDADE DE ENSINO SUPERIOR DOM BOSCO","UNICEUMA - UNIVERSICADE DO CEUMA","UEMA - UNIVERSIDADE ESTADUAL DO MARANHÃO","UFMA - UNIVERSIDADE FEDERAL DO MARANHÃO","UNIVERSIDADE VIRTUAL DO ESTADO DO MARANHÃO"];
var cursos = ['ADMINISTRAÇÃO','ADMINISTRAÇÃO DE EMPRESAS','ADMINISTRAÇÃO PÚBLICA','AGENTE COMUNITÁRIO DE SAÚDE E ENDEMIAS','AGROCOMPUTAÇÃO','AGROINDÚSTRIA','AGRONEGÓCIO','AGRONOMIA','AGROPECUÁRIA','ALIMENTOS','ANÁLISE DE DADOS','ANÁLISE E DESENVOLVIMENTO DE SISTEMAS','ANDRAGOGIA','ARQUITETURA E URBANISMO','ARTES','ARTES VISUAIS','ARTES VISUAIS - PROGRAMA SEGUNDA LICENCIATURA','ASSESSORIA EXECUTIVA DIGITAL','AUDITORIA EM SAÚDE','AUTOMAÇÃO INDUSTRIAL','BANCO DE DADOS','BIBLIOTECONOMIA','BIG DATA E INTELIGÊNCIA ANALÍTICA','BIOLOGIA','BIOMEDICINA','BLOCKCHAIN','CIÊNCIA DA COMPUTAÇÃO','CIÊNCIA DA RELIGIÃO','CIÊNCIA DE DADOS','CIÊNCIA DE DADOS E BIG DATA','CIÊNCIA DE DADOS E INTELIGÊNCIA ARTIFICIAL','CIÊNCIA ECONÔMICA','CIÊNCIA E TECNOLOGIA DE ALIMENTOS','CIÊNCIA POLÍTICA','CIÊNCIAS','CIÊNCIAS AERONÁUTICAS','CIÊNCIAS AGRÁRIAS','CIÊNCIAS - BIOLOGIA','CIÊNCIAS BIOLÓGICAS','CIÊNCIAS CONTÁBEIS','CIÊNCIAS DA COMPUTAÇÃO','CIÊNCIAS DA NATUREZA','CIÊNCIAS DA RELIGIÃO','CIÊNCIAS DE DADOS E ANÁLISE DE COMPORTAMENTO','CIÊNCIAS ECONÔMICAS','CIÊNCIAS EXATAS','CIÊNCIAS - FÍSICA','CIÊNCIAS HUMANAS','CIÊNCIAS HUMANAS - FILOSOFIA','CIÊNCIAS HUMANAS - GEOGRAFIA','CIÊNCIAS HUMANAS - HISTÓRIA','CIÊNCIAS HUMANAS - SOCIOLOGIA','CIÊNCIAS IMOBILIÁRIAS','CIÊNCIAS JURÍDICAS E SOCIAIS','CIÊNCIAS - MATEMÁTICA','CIÊNCIAS NATURAIS','CIÊNCIAS NATURAIS - BIOLOGIA','CIÊNCIAS NATURAIS - FÍSICA','CIÊNCIAS NATURAIS - QUÍMICA','CIÊNCIAS POLÍTICAS','CIÊNCIAS - QUÍMICA','CIÊNCIAS SOCIAIS','COACH DIGITAL','COACHING E DESENVOLVIMENTO HUMANO','COACHING E MENTORING','CODING','COMÉRCIO EXTERIOR','COMPUTAÇÃO','COMPUTAÇÃO E INFORMÁTICA','COMUNICAÇÃO INSTITUCIONAL','COMUNICAÇÃO SOCIAL','COMUNICAÇÃO SOCIAL - JORNALISMO','COMUNICAÇÃO SOCIAL - PUBLICIDADE E PROPAGANDA','COMUNICAÇÃO SOCIAL - RADIALISMO','COMUNICAÇÃO SOCIAL - RELAÇÕES PÚBLICAS','CONSTRUÇÃO DE EDIFÍCIOS','CONTROLE DE OBRAS','COZINHA CONTEMPORÂNEA','DANÇA','DATA SCIENCE','DEFESA CIBERNÉTICA','DEFESA MÉDICA HOSPITALAR','DESENVOLVIMENTO DE APLICATIVOS PARA DISPOSITIVOS MÓVEIS','DESIGN','DESIGN DE ANIMAÇÃO','DESIGN DE GAMES','DESIGN DE INTERIORES','DESIGN DE MODA','DESIGN DE PRODUTO','DESIGN EDITORIAL','DESIGN EDUCACIONAL','DESIGN GRÁFICO','DIGITAL SECURITY','DIREITO','EDUCAÇÃO DO CAMPO','EDUCAÇÃO DO CAMPO - CIÊNCIAS AGRÁRIAS','EDUCAÇÃO ESPECIAL','EDUCAÇÃO FÍSICA','EDUCADOR SOCIAL','ELETRÔNICA INDUSTRIAL','ELETROTÉCNICA INDUSTRIAL','EMBELEZAMENTO E IMAGEM PESSOAL','EMPREENDEDORISMO','EMPREENDEDORISMO DIGITAL','ENERGIAS RENOVÁVEIS','ENFERMAGEM','ENFERMAGEM E OBSTETRÍCIA','ENGENHARIA AEROESPACIAL','ENGENHARIA AGRÍCOLA','ENGENHARIA AGRONÔMICA','ENGENHARIA AMBIENTAL','ENGENHARIA AMBIENTAL E SANITÁRIA','ENGENHARIA CIVIL','ENGENHARIA DA COMPUTAÇÃO','ENGENHARIA DE ALIMENTOS','ENGENHARIA DE COMPUTAÇÃO','ENGENHARIA DE CONTROLE E AUTOMAÇÃO','ENGENHARIA DE PESCA','ENGENHARIA DE PETRÓLEO','ENGENHARIA DE PRODUÇÃO','ENGENHARIA DE SOFTWARE','ENGENHARIA ELÉTRICA','ENGENHARIA ELETRÔNICA','ENGENHARIA GEOLÓGICA','ENGENHARIA INDUSTRIAL ELÉTRICA','ENGENHARIA INDUSTRIAL MECÂNICA','ENGENHARIA MECÂNICA','ENGENHARIA MECATRÔNICA','ENGENHARIA QUÍMICA','ENSINO RELIGIOSO','ESTATÍSTICA','ESTÉTICA','ESTÉTICA E COSMÉTICA','ESTÉTICA E COSMETOLOGIA','ESTÉTICA E IMAGEM PESSOAL','EVENTOS','FARMÁCIA','FILMMAKER','FILOSOFIA','FILOSOFIA - PROGRAMA SEGUNDA LICENCIATURA','FÍSICA','FISIOTERAPIA','FONOAUDIOLOGIA','FORMAÇÃO DE DOCENTES PARA A EDUCAÇÃO BÁSICA','FORMAÇÃO DE OFICIAIS BOMBEIRO MILITAR','FORMAÇÃO DE OFICIAIS (CCSA)','FORMAÇÃO PEDAGÓGICA PARA GRADUADOS','FORMAÇÃO PEDAGÓGICA PARA GRADUADOS NÃO LICENCIADOS','FORMAÇÃO PEDAGÓGICA PARA PORTADORES DE ENSINO SUPERIOR','FORMAÇÃO PEDAGÓGICA PARA PORTADORES DE ENSINO SUPERIOR - LETRAS','FOTOGRAFIA','GAME DESIGN','GASTRONOMIA','GEOGRAFIA','GEOGRAFIA - PROGRAMA SEGUNDA LICENCIATURA','GEOPROCESSAMENTO','GERONTOLOGIA','GERONTOLOGIA - BEM-ESTAR E EDUCAÇÃO','GERONTOLOGIA - CUIDADO AO IDOSO','GESTÃO AMBIENTAL','GESTÃO COMERCIAL','GESTÃO DA INOVAÇÃO','GESTÃO DA PRODUÇÃO INDUSTRIAL','GESTÃO DA QUALIDADE','GESTÃO DA SEGURANÇA E DEFESA CIBERNÉTICA','GESTÃO DAS ORGANIZAÇÕES DO TERCEIRO SETOR','GESTÃO DAS RELAÇÕES ELETRÔNICAS','GESTÃO DA TECNOLOGIA DA INFORMAÇÃO','GESTÃO DA TECNOLOGIA EDUCACIONAL','GESTÃO DE AGRONEGÓCIOS','GESTÃO DE CIDADES INTELIGENTES','GESTÃO DE CIDADES INTELIGENTES E SUSTENTÁVEIS','GESTÃO DE COOPERATIVAS','GESTÃO DE EVENTOS','GESTÃO DE INVENTÁRIO EXTRAJUDICIAL','GESTÃO DE INVESTIMENTOS','GESTÃO DE LOJAS E PONTOS DE VENDAS','GESTÃO DE MARKETING','GESTÃO DE MÍDIAS DIGITAIS','GESTÃO DE MÍDIAS SOCIAIS','GESTÃO DE NEGÓCIOS DIGITAIS','GESTÃO DE NEGÓCIOS E INOVAÇÃO','GESTÃO DE PARTIDOS POLÍTICOS','GESTÃO DE PROCESSOS EDUCACIONAIS','GESTÃO DE PRODUÇÃO INDUSTRIAL','GESTÃO DE RECURSOS HUMANOS','GESTÃO DE RESÍDUOS DE SERVIÇOS DE SAÚDE','GESTÃO DE SAÚDE PÚBLICA','GESTÃO DE SEGURANÇA PRIVADA','GESTÃO DE SERVIÇOS JURÍDICOS','GESTÃO DE SERVIÇOS JURÍDICOS E NOTARIAIS','GESTÃO DE SERVIÇOS JURÍDICOS','GESTÃO DE SISTEMAS DE INFORMAÇÃO','GESTÃO DESPORTIVA E DE LAZER','GESTÃO DE STARTUPS','GESTÃO DE STARTUPS E EMPREENDEDORISMO DIGITAL','GESTÃO DE TURISMO','GESTÃO DO AGRONEGÓCIO','GESTÃO DO E-COMMERCE E SISTEMAS LOGÍSTICOS','GESTÃO DO TRÂNSITO E MOBILIDADE URBANA','GESTÃO E EMPREENDEDORISMO','GESTÃO EMPREENDEDORA','GESTÃO EMPREENDEDORA DE SERVIÇOS','GESTÃO EM VIGILÂNCIA EM SAÚDE','GESTÃO ESTRATÉGICA EMPRESARIAL','GESTÃO FINANCEIRA','GESTÃO GLOBAL TRADING: NEGÓCIOS','GESTÃO HOSPITALAR','GESTÃO INDUSTRIAL DE SIDERURGIA','GESTÃO LEGISLATIVA','GESTÃO PORTUÁRIA','GESTÃO PÚBLICA','HISTÓRIA','HISTÓRIA - PROGRAMA SEGUNDA LICENCIATURA','HOTELARIA','INFORMÁTICA','INSTRUMENTAÇÃO CIRÚRGICA','INTERDISCIPLINAR EM CIÊNCIA E TECNOLOGIA','INTERDISCIPLINAR EM EDUCAÇÃO NO CAMPO','INTERDISCIPLINAR EM ESTUDOS AFRICANOS E AFRO-BRASILEIROS','INTERNET DAS COISAS','INVESTIGAÇÃO E PERÍCIA CRIMINAL','INVESTIGAÇÃO FORENSE E PERÍCIA CRIMINAL','INVESTIGAÇÃO PROFISSIONAL','JOGOS DIGITAIS','JORNALISMO','JORNALISMO DIGITAL','LETRAS','LETRAS - ALEMÃO','LETRAS COM PORTUGUÊS E ESPANHOL','LETRAS - ESPANHOL','LETRAS - INGLÊS','LETRAS - LIBRAS','LETRAS - LIBRAS - LÍNGUA PORTUGUESA','LETRAS - LÍNGUA INGLESA','LETRAS - LÍNGUA PORTUGUESA','LETRAS - LÍNGUA PORTUGUESA E LIBRAS','LETRAS - PORTUGUÊS','LETRAS - PORTUGUÊS E ESPANHOL','LETRAS - PORTUGUÊS E FRANCÊS','LETRAS - PORTUGUÊS E INGLÊS','LETRAS PORTUGUÊS E INGLÊS','LETRAS - PORTUGUÊS E JAPONÊS','LICENCIATURA INTERCULTURAL INDÍGENA','LICENCIATURA PLENA EM MATÉRIAS ESPECÍFICAS DO ENSINO MÉDIO','LINGUAGENS E CÓDIGOS - LÍNGUA PORTUGUESA','LINGUAGENS E CÓDIGOS - MÚSICA','LOGÍSTICA','MANUTENÇÃO INDUSTRIAL','MARKETING','MARKETING DIGITAL','MATEMÁTICA','MATEMÁTICA - PROGRAMA SEGUNDA LICENCIATURA','MECATRÔNICA AUTOMOTIVA','MEDIAÇÃO','MEDICINA','MEDICINA VETERINÁRIA','MÍDIAS DIGITAIS','MINERAÇÃO','MODA','MUSEOLOGIA','MÚSICA','NEGÓCIOS DIGITAIS','NEGÓCIOS IMOBILIÁRIOS','NORMAL SUPERIOR','NUTRIÇÃO','OCEANOGRAFIA','ODONTOLOGIA','ÓPTICA E OPTOMETRIA','PEDAGOGIA','PEDAGOGIA DA TERRA','PEDAGOGIA EM EDUCAÇÃO PROFISSIONAL E TECNOLÓGICA','PETRÓLEO E GÁS','PODOLOGIA','PRÁTICAS INTEGRATIVAS E COMPLEMENTARES','PROCESSOS ESCOLARES','PROCESSOS GERENCIAIS','PROCESSOS QUÍMICOS','PRODUÇÃO AUDIOVISUAL','PRODUÇÃO CERVEJEIRA','PRODUÇÃO CULTURAL','PRODUÇÃO DE CERVEJA','PRODUÇÃO DE CONTEÚDOS DIGITAIS','PRODUÇÃO MULTIMÍDIA','PRODUÇÃO PUBLICITÁRIA','PROGRAMA DE FORMAÇÃO DE PROFESSORES DA EDUCAÇÃO BÁSICA - PEDAGOGIA','PROGRAMA ESPECIAL DE FORMAÇÃO DE DOCENTE','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA - ARTE EDUCAÇÃO','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA - BIOLOGIA','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA DE DOCENTES','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA DE DOCENTES - BIOLOGIA','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA DE DOCENTES - FILOSOFIA','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA DE DOCENTES - FÍSICA','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA DE DOCENTES - GEOGRAFIA','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA DE DOCENTES - HISTÓRIA','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA DE DOCENTES - MATEMÁTICA','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA DE DOCENTES - PORTUGUÊS','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA DE DOCENTES - QUÍMICA','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA PARA FORMADORES DE EDUCAÇÃO PROFISSIONAL','PROGRAMA ESPECIAL DE FORMAÇÃO PEDAGÓGICA - PORTUGUÊS','PROJETOS MECÂNICOS','PSICOLOGIA','PSICOMOTRICIDADE','PSICOPEDAGOGIA','PUBLICIDADE','PUBLICIDADE E PROPAGANDA','QUALIDADE DE VIDA NA CONTEMPORANEIDADE','QUÍMICA','QUÍMICA INDUSTRIAL','QUÍMICA - PROGRAMA SEGUNDA LICENCIATURA','RADIOLOGIA','REDES DE COMPUTADORES','RELAÇÕES INTERNACIONAIS','RELAÇÕES PÚBLICAS','SANEAMENTO AMBIENTAL','SAÚDE COLETIVA','SECRETARIADO','SECRETARIADO EXECUTIVO','SECRETARIADO EXECUTIVO - BILÍNGUE','SECRETARIADO EXECUTIVO TRILÍNGUE','SEGUNDA LICENCIATURA EM PEDAGOGIA','SEGUNDA LICENCIATURA EM PEDAGOGIA PARA PROFESSORES EM EXERCÍCIO NA EDUCAÇÃO BÁSICA PÚBLICA','SEGURANÇA ALIMENTAR','SEGURANÇA DA INFORMAÇÃO','SEGURANÇA NO TRABALHO','SEGURANÇA NO TRÂNSITO','SEGURANÇA PRIVADA','SEGURANÇA PÚBLICA','SERVICE DESIGN','SERVIÇOS JUDICIAIS','SERVIÇOS JUDICIAIS E NOTARIAIS','SERVIÇOS JURÍDICOS','SERVIÇOS JURÍDICOS','SERVIÇOS JURÍDICOS E NOTARIAIS','SERVIÇOS NOTARIAIS E JURÍDICOS','SERVIÇO SOCIAL','SERVIÇOS PENAIS','SERVIÇOS PREVIDENCIÁRIOS','SERVIÇOS REGISTRAIS E NOTARIAIS','SISTEMA DE INFORMAÇÃO','SISTEMAS DE INFORMAÇÃO','SISTEMAS PARA INTERNET','SOCIOLOGIA','SOCIOLOGIA - PROGRAMA SEGUNDA LICENCIATURA','STREAMING PROFISSIONAL','TEATRO','TÉCNICAS PARA ACOMPANHAMENTO TERAPÊUTICO','TÉCNICAS PARA TELEMEDICINA','TECNOLOGIA DA INFORMAÇÃO EM WEB-DESIGNER','TECNOLOGIAS EDUCACIONAIS','TEOLOGIA','TEOLOGIA: DOUTRINA CATÓLICA','TEOLOGIA PASTORAL','TERAPIA OCUPACIONAL','TERAPIAS INTEGRATIVAS E COMPLEMENTARES','TRADUÇÃO','TURISMO','VAREJO DIGITAL','VISAGISMO E TERAPIAS CAPILARES','WEB DESIGNER','ZOOTECNIA']
var cargos_disponiveis = ["ADMINISTRADOR","ADVOGADO","AJUDANTE DE ELETRICISTA DE AUTOS","AJUDANTE DE MECANICO","AJUDANTE GERAL","AJUDANTE GERAL DE MANUTENCAO","AJUDANTE GERAL DE TURNO","ANALISTA CONTABIL","ANALISTA DE SISTEMAS","ANALISTA DE SUPORTE","ANALISTA FINANCEIRO","APLICADOR DE HERBICIDAS","ARQUITETO","ASCENSORISTA","ASSES.DIRETORIA","ASSIST.TEC. ADMINISTRATIVO","ASSISTENTE ADMINISTRATIVO","ASSISTENTE CONTABIL","ASSISTENTE DE MANUTENCAO","ASSISTENTE DE OPERACOES","ASSISTENTE SOCIAL","ASSISTENTE TEC. DE OPERACOES","ASSISTENTE TECNICO","AUX. DE ELET. DE MANUTENCAO","AUX. DE ENFERM. DO TRABALHO","AUXILIAR ADMINISTRATIVO","AUXILIAR DE AMBULATORIO","AUXILIAR DE COMPRAS","AUXILIAR DE INFORMATICA","AUXILIAR DE LABORATORIO","AUXILIAR DE LIMPEZA","AUXILIAR DE TOPOGRAFIA","AUXILIAR OPERACIONAL","CHEFE DE TURMA","CONS.ADMINISTR.","CONS.FISCAL","CONTADOR","CONTADOR PLENO","CONTADOR SENIOR","COORD. TECNICO ADMINISTRAT.","COORDENADOR DE PROJETOS","COORDENADOR DE REPORTAGEM","DESENHISTA DE ARTES GRAFICAS","DIR. JURIDICO","DIR. OPERACOES","DIRETOR PRESIDENTE","ECONOMISTA","ECONOMISTA PLENO","ECONOMISTA SENIOR","ELETRICISTA DE AUTOS","ELETRICISTA DE MANUTENCAO","ENCANADOR","ENFERMEIRO","ENGENHEIRO","ENGENHEIRO DE SEGURANCA DO TRABALHO","ENGENHEIRO PLENO","ENGENHEIRO SENIOR","ESTAGIARIO - NIVEL SUPERIOR","ESTAGIARIO - NIVEL TECNICO","FISCAL DE ESTACIONAMENTO","FISCAL DE LIMPEZA","FISCAL DE OBRAS","FISCAL DE TURMA","MECANICO","MECANICO DE AR CONDICIONADO","MECANICO ESPECIALIZADO","MEDICO DO TRABALHO","MOTORISTA","OFICIAL DE MANUTENCAO","OPERADOR DE BOMBA","OPERADOR DE CARRO LAMA","OPERADOR DE EDITORACAO ELETRONICA","OPERADOR DE EQUIPAMENTOS","OPERADOR DE MAQUINAS PESADAS","PEDREIRO","PEDREIRO DE ACABAMENTO","PINTOR DE OBRAS","RECEPCIONISTA","SERVENTE DE OBRAS","SOLDADOR","SUPERVISOR ADMINISTRATIVO","SUPERVISOR CONTABIL","SUPERVISOR DE OPERACOES","SUPERVISOR FINANCEIRO","SUPERVISOR TECNICO","TEC. DE SEGURANCA DO TRAB.","TECNICO DE BATERIAS","TECNICO DE DESENVOLVIMENTO DE APLICACAO","TECNICO DE EDIFICACOES","TECNICO DE INFORMATICA JUNIOR","TECNICO DE INFORMATICA PLENO","TECNICO DE INFORMATICA SENIOR","TECNICO DE MANUTENCAO EM INFORMATICA","TECNICO EM ELETRONICA","TECNICO MANUT. TELEFONIA","TECNICO ORCAMENTISTA DE OBRAS","TELEFONISTA","TOPOGRAFO","TORNEIRO MECANICO","VIDRACEIRO","VIGIA","VIGIA DE TURNO","WEBDESIGNER"]
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
if (document.getElementById("instituicao"))
  autocomplete(document.getElementById("instituicao"), instituicoes);

if (document.getElementById("curso"))
  autocomplete(document.getElementById("curso"), cursos);

if (document.getElementById("cargo"))
  autocomplete(document.getElementById("cargo"), cargos_disponiveis);

if (document.getElementById("titulo"))
  autocomplete(document.getElementById("titulo"), cargos_disponiveis);

if (document.getElementById("cargo_search"))
  autocomplete(document.getElementById("cargo_search"), cargos_disponiveis);

if (document.getElementById("curso_search"))
  autocomplete(document.getElementById("curso_search"), cursos);
