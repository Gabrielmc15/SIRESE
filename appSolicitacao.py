from flask import request, Blueprint, url_for,session
from flask.templating import render_template
from cs50 import SQL
from werkzeug.utils import redirect

db_candidatos = SQL("sqlite:///candidatos.db")
db_solicitacao = SQL("sqlite:///solicitacao.db")


appSolicitacao = Blueprint('appSolicitacao', __name__)


@appSolicitacao.route("/adm")
def adm():
    vaga_aguardando_aprovacao = db_solicitacao.execute("SELECT * FROM vaga WHERE status=?;",0)
    vaga_iniciado = db_solicitacao.execute("SELECT * FROM vaga WHERE status=?;", 1)
    vaga_em_andamento = db_solicitacao.execute("SELECT * FROM vaga WHERE status=?;", 2)
    vaga_concluido = db_solicitacao.execute("SELECT * FROM vaga WHERE status=?;", 3)
    vaga_cancelado = db_solicitacao.execute("SELECT * FROM vaga WHERE status=?;", 4)

    return render_template("cadastroVaga/adm.html", vaga_aguardando_aprovacao = vaga_aguardando_aprovacao, vaga_iniciado = vaga_iniciado, vaga_em_andamento = vaga_em_andamento, vaga_concluido = vaga_concluido, vaga_cancelado = vaga_cancelado )


@appSolicitacao.route("/adm", methods =["POST"])
def adm_post():
    formulario = request.form

    if(formulario.get("definir_processo")):
        session["processo_selecionado"] = formulario["definir_processo"]
        return redirect(url_for("appSolicitacao.etapas_processo"))
    

    return redirect(url_for("appSolicitacao.adm"))


@appSolicitacao.route("/add_processo")
def add_processo():
    return render_template("cadastroVaga/add_processo.html")

@appSolicitacao.route("/add_processo", methods =["POST"])
def add_processo_post():
    formulario_cargo_disponivel = request.form

    db_solicitacao.execute('INSERT INTO vaga(status, gestor, setor, data, motivo, justificativa, cargo, numero_de_vagas, sexo, empresa_contratante, local, turno, horario_de_trabalho, renumeracao_proposta) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 0, formulario_cargo_disponivel["gestor_solicitante"],formulario_cargo_disponivel["setor_solicitante"],formulario_cargo_disponivel["data"], formulario_cargo_disponivel["motivo"], formulario_cargo_disponivel["justificativa"], formulario_cargo_disponivel["titulo"], int(formulario_cargo_disponivel["numero_vagas"]), int(formulario_cargo_disponivel["sexo"]), formulario_cargo_disponivel["empresa_contratante"], formulario_cargo_disponivel["local"], int(formulario_cargo_disponivel["turno"]), int(formulario_cargo_disponivel["horario_trabalho"]), int(formulario_cargo_disponivel["renumeracao"]))
    id_processo = db_solicitacao.execute("SELECT id FROM vaga")[-1]["id"]
    processo = db_solicitacao.execute("SELECT * FROM vaga WHERE id=?;",id_processo)[0]
    session["processo"] = processo

    return redirect(url_for("appSolicitacao.processo"))

@appSolicitacao.route("/processo", methods =["GET","POST"])
def processo():
    if(session.get("processo",None)):
        processo = session.get("processo",None)
        session.pop('processo', None)
        return render_template("cadastroVaga/processo.html",processo = processo )

    else:
        processo = db_solicitacao.execute("SELECT * FROM vaga WHERE id=?;",request.form["processo_escolhido"])[0]
    
    ids_candidatos = db_solicitacao.execute("SELECT id_candidato FROM candidato_solicitante WHERE id_vaga=?;",request.form["processo_escolhido"])
    candidatos_selecionados=[]
    candidatos_selecionados_cargo_pretendido=[]
    candidatos_selecionados_cnh=[]
    candidatos_selecionados_deficiencia=[]
    candidatos_selecionados_experiencia=[]
    candidatos_selecionados_formacao=[]
    for id_candidato in ids_candidatos:
        candidatos_selecionados.append(db_candidatos.execute("SELECT * FROM candidato WHERE id=?;", id_candidato['id_candidato']))
        candidatos_selecionados_cargo_pretendido.append(db_candidatos.execute("SELECT * FROM cargo_pretendido WHERE id_candidato=?;", id_candidato['id_candidato']))
        candidatos_selecionados_cnh.append(db_candidatos.execute("SELECT * FROM cnh WHERE id_candidato=?;", id_candidato['id_candidato']))
        candidatos_selecionados_deficiencia.append(db_candidatos.execute("SELECT * FROM deficiencia WHERE id_candidato=?;", id_candidato['id_candidato']))
        candidatos_selecionados_experiencia.append(db_candidatos.execute("SELECT * FROM experiencia WHERE id_candidato=?;", id_candidato['id_candidato']))
        candidatos_selecionados_formacao.append(db_candidatos.execute("SELECT * FROM formacao WHERE id_candidato=?;", id_candidato['id_candidato']))
    
    etapas = db_solicitacao.execute("SELECT * FROM etapa WHERE id_vaga=?;",request.form["processo_escolhido"]) 
    perguntas = []
    for etapa in etapas:
        perguntas.append(db_solicitacao.execute("SELECT * FROM pergunta WHERE id_etapa=?;",etapa['id']))

    return render_template("cadastroVaga/processo.html", candidatos_selecionados_formacao=candidatos_selecionados_formacao, candidatos_selecionados_experiencia=candidatos_selecionados_experiencia, candidatos_selecionados_deficiencia = candidatos_selecionados_deficiencia, candidatos_selecionados_cnh = candidatos_selecionados_cnh, processo = processo, perguntas = perguntas, candidatos_selecionados= candidatos_selecionados,candidatos_selecionados_cargo_pretendido = candidatos_selecionados_cargo_pretendido,  )


@appSolicitacao.route("/etapas_processo")
def etapas_processo():

    vaga =  db_solicitacao.execute("SELECT * FROM vaga")
    candidato_solicitante =  db_solicitacao.execute("SELECT * FROM candidato_solicitante")
    candidato = db_candidatos.execute("SELECT * FROM candidato")
    cargo_pretendido = db_candidatos.execute("SELECT * FROM cargo_pretendido")

    formacao = db_candidatos.execute("SELECT * FROM formacao")
    experiencia = db_candidatos.execute("SELECT * FROM experiencia")
    cnh = db_candidatos.execute("SELECT * FROM cnh")
    deficiencia = db_candidatos.execute("SELECT * FROM deficiencia")
    habilidade = db_candidatos .execute("SELECT * FROM habilidade")

    return render_template("cadastroVaga/etapas_processo.html",habilidade = habilidade, formacao = formacao, experiencia = experiencia, cnh = cnh, deficiencia = deficiencia, vaga = vaga, candidato_solicitante = candidato_solicitante, candidato = candidato, cargo_pretendido = cargo_pretendido)

@appSolicitacao.route("/etapas_processo", methods =["POST"])
def etapas_processo_post():
    formulario = request.form
    processo_selecionado = session.get("processo_selecionado",None)

    #adicionar nas tabelas de etapas e perguntas os dados obtidos
    for etapa in range(int(formulario["numero_etapas"])):
        db_solicitacao.execute("INSERT INTO etapa(id_vaga, ordem) VALUES(?,?)", processo_selecionado, etapa+1)
        id_etapa = db_solicitacao.execute("SELECT id FROM etapa")[-1]["id"]
        for pergunta in range(int(formulario["etapa"+str(etapa+1)+"numero_perguntas"])):
            db_solicitacao.execute("INSERT INTO pergunta (id_etapa, ordem, descricao_pergunta, tipo_pergunta) VALUES(?,?,?,?)",id_etapa , pergunta+1, formulario["pergunta"+str(pergunta+1)+"etapa"+str(etapa+1)], formulario["tipo_pergunta"+str(pergunta+1)+"etapa"+str(etapa+1)])
    
    #adicionar na tabela de candidato_selecionado os candidatos selecionados
    for candidato_selecionado in (range(int(formulario["numero_candidatos_selecionados"]))):
        db_solicitacao.execute("INSERT INTO candidato_solicitante (id_vaga,id_candidato) VALUES(?,?)",int(processo_selecionado) , int(formulario["candidato_selecionado"+str(candidato_selecionado)]))

    db_solicitacao.execute("UPDATE vaga SET status = 2 WHERE id=?", int(processo_selecionado))

    session.pop('processo_selecionado', None)
    return render_template("cadastroVaga/processo.html",processo = processo_selecionado)


@appSolicitacao.route("/controle_processo")
def controle_processo():
    vaga_aguardando_aprovacao = db_solicitacao.execute("SELECT * FROM vaga WHERE status=?;",0)

    return render_template("cadastroVaga/controle_processo.html", vaga_aguardando_aprovacao = vaga_aguardando_aprovacao)

@appSolicitacao.route("/controle_processo", methods=["POST"])
def controle_processo_post():
    formulario = request.form

    print(formulario)
    if (formulario.get("processo_aprovado")):
        db_solicitacao.execute("UPDATE vaga SET status = 1 WHERE id=?", formulario.get("processo_aprovado"))
        db_solicitacao.execute("INSERT INTO processo (id_vaga) VALUES (?)", formulario["processo_aprovado"])
        
    elif(formulario.get("processo_recusado")):
        db_solicitacao.execute("UPDATE vaga SET status = 4 WHERE id=?", formulario.get("processo_recusado"))
    
    return redirect(url_for("appSolicitacao.controle_processo"))
