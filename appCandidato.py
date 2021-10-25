from flask import request, session, redirect, url_for, flash, Blueprint,current_app
from flask.templating import render_template
from werkzeug.security import generate_password_hash, check_password_hash
from cs50 import SQL
import random, string
from flask_mail import Mail, Message

appCandidato = Blueprint('appCandidato', __name__)

db_candidatos = SQL("sqlite:///candidatos.db")
db_solicitacao = SQL("sqlite:///solicitacao.db")


@appCandidato.route("/")
def index():
    return render_template("cadastroCandidato/index.html")

#caso o candidato tentou acessar uma pagina sem ter acessado a pagina anterior antes FALTA ADICIONAR NOVAS
@appCandidato.route("/success")
@appCandidato.route("/informacoes_adicionais")
@appCandidato.route("/formacao")
@appCandidato.route("/confirmar")
@appCandidato.route("/codigo_verificacao")
def index_redirect():
    return redirect(url_for('appCandidato.index'))

@appCandidato.route("/verificaCPF", methods =["POST"])
def verificaCPF():
    formulario = request.form
    if(formulario.get("cpf")):

        cpfs = db_candidatos.execute("SELECT cpf,email,id FROM candidato")
        #itera sobre todos os cpfs regristrados no banco e verifica se ja existe
        for cpf in cpfs:
            if (check_password_hash(cpf["cpf"], formulario["cpf"])):
                #caso o cpf ja exista, retorna para a pagina inicial e exibe uma mensagem
                email_=''
                email = cpf["email"]

                for char in range(len(email)):
                    if (email[char] == '@'or email[char] == '.' or char == 0 or char == 1):
                        email_ = email_ + email[char]
                    else:
                        email_ = email_ + '*'
                session["verificacao"] = {'email':cpf["email"],'email_':email_,  "codigo": rand_pass(6),'id':cpf["id"]}

                return redirect(url_for('appCandidato.codigo_verificacao'), code=307)
        session["cpf"] = formulario.get("cpf")
        return redirect(url_for('appCandidato.dados_candidato'),code=307)

    return render_template("cadastroCandidato/verificaCPF.html")

@appCandidato.route("/dados_candidato", methods =["POST"])
def dados_candidato():
    #caso o canditado tenha voltado a pagina
    if(session.get("formulario_candidato",None)):
        formulario_candidato = session.get("formulario_candidato",None)
        return render_template("cadastroCandidato/dados_candidato.html",formulario_candidato = formulario_candidato)
    
    return render_template("cadastroCandidato/dados_candidato.html")


@appCandidato.route("/formacao", methods =["POST"])
def formacao():
    #define o formulario candidato caso a pagina de candidato tenha sido a anterior
    if(request.form.get("nome")):
        formulario_candidato = request.form
        session["formulario_candidato"] = formulario_candidato

    if(session.get("formulario_formacao",None)):
        formulario_formacao = session.get("formulario_formacao",None)
        return render_template("cadastroCandidato/formacao.html",formulario_formacao = formulario_formacao)
    
    return render_template("cadastroCandidato/formacao.html")


@appCandidato.route("/informacoes_adicionais", methods =["POST"])
def informacoes_adicionais():
    print(request.form)
    #define o formulario formação caso a pagina de formação tenha sido a anterior
    if(request.form.get("formulario_formacao")):
        formulario_formacao = request.form
        session["formulario_formacao"] = formulario_formacao

    if(session.get("formulario_informacoes_adicionais",None)):
        formulario_informacoes_adicionais = session.get("formulario_informacoes_adicionais",None)
        return render_template("cadastroCandidato/informacoes_adicionais.html", formulario_informacoes_adicionais = formulario_informacoes_adicionais)
    
    return render_template("cadastroCandidato/informacoes_adicionais.html")

@appCandidato.route("/confirmar", methods =["POST"])
def confirmar():
    formulario_candidato = session.get("formulario_candidato",None)
    formulario_formacao = session.get("formulario_formacao",None)
    cpf = session.get("cpf",None)
    formulario_informacoes_adicionais = request.form
    session["formulario_informacoes_adicionais"] = formulario_informacoes_adicionais

    print(formulario_formacao)
    #criando uma lista com o numero de formações adicionadas
    numero_formacao = ""
    if(formulario_formacao.get("linhas_formacao")):
        for i in range(int(formulario_formacao.get("linhas_formacao"))):
            numero_formacao = numero_formacao + str(i)
    
    #criando uma lista com o numero de experiências adicionadas
    numero_experiencia = ""
    if(formulario_formacao.get("linhas_experiencia")):
        for i in range(int(formulario_formacao.get("linhas_experiencia"))):
            numero_experiencia = numero_experiencia + str(i)

    numero_cargo = ""
    if(formulario_informacoes_adicionais.get("linhas_cargo")):
        for i in range(int(formulario_informacoes_adicionais.get("linhas_cargo"))):
            numero_cargo = numero_cargo + str(i) 
            #PROVAVELMENTE VAI TER QUE MUDAR ESSE LAÇO ACIMA DEPOIS

    return render_template("cadastroCandidato/confirmar.html",cpf=cpf, formulario_informacoes_adicionais = formulario_informacoes_adicionais, formulario_candidato = formulario_candidato, formulario_formacao = formulario_formacao, numero_formacao = numero_formacao, numero_experiencia = numero_experiencia, numero_cargo = numero_cargo)


@appCandidato.route("/success", methods =["POST"])
def success():
    formulario_candidato = session.get("formulario_candidato",None)
    formulario_formacao = session.get("formulario_formacao",None)
    formulario_informacoes_adicionais = session.get("formulario_informacoes_adicionais",None)
    
    cpf_hash = generate_password_hash(session.get("cpf",None), method='sha256')
    db_candidatos.execute('INSERT INTO candidato(cpf, nome, email, sexo, estado_civil, data_nascimento, telefone, cep, dias_disponiveis, turno_disponivel, disponibilidade_viagens, renumeracao_pretendida) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', cpf_hash, formulario_candidato["nome"], formulario_candidato["email"], int(formulario_candidato["sexo"]), int(formulario_candidato["estado_civil"]), formulario_candidato["data_nascimento"], formulario_candidato["telefone"], formulario_candidato["cep"],int(formulario_informacoes_adicionais["dias_disponiveis"]),int(formulario_informacoes_adicionais["turno_disponivel"]),int(formulario_informacoes_adicionais["disponibilidade_viagens"]),int(formulario_informacoes_adicionais["renumeracao_pretendida"]))
    primary_id = db_candidatos.execute("SELECT id FROM candidato")[-1]["id"]

    if(formulario_formacao.get("linhas_formacao")):
        numero_formacao = int(formulario_formacao.get("linhas_formacao"))
    else:
        numero_formacao = 0
    
    if(formulario_formacao.get("linhas_experiencia")):
        numero_experiencia = int(formulario_formacao.get("linhas_experiencia"))
    else:
        numero_experiencia = 0

    if(formulario_formacao.get("numero_habilidades")):
        numero_habilidades = int(formulario_formacao.get("numero_habilidades"))
    else:
        numero_habilidades=0

    for i in range(numero_formacao):
        count = str(i)
        db_candidatos.execute('INSERT INTO formacao(id_candidato, curso, instituicao, nivel, inicio, terminio_formacao, situacao) VALUES(?,?,?,?,?,?,?)', (primary_id), formulario_formacao["curso"+count],formulario_formacao["instituicao"+count], formulario_formacao["nivel"+count], formulario_formacao["inicio"+count], formulario_formacao["terminio_formacao"+count], int(formulario_formacao["situacao"+count]))

    for i in range(numero_experiencia):
        count = str(i)
        db_candidatos.execute('INSERT INTO experiencia(id_candidato, empresa, cargo, ano_inicio_experiencia, ano_fim_experiencia , descricao_experiencia) VALUES(?,?,?,?,?,?)', (primary_id), formulario_formacao["empresa"+count], formulario_formacao["cargo"+count], formulario_formacao["ano_inicio_experiencia"+count],formulario_formacao["ano_fim_experiencia"+count], formulario_formacao["descricao_experiencia"+count])

    for i in range(numero_habilidades):
        count = str(i)
        db_candidatos.execute("INSERT INTO habilidade(id_candidato, tag) VALUES(?,?)", (primary_id), formulario_formacao["habilidade"+count])

    if(formulario_informacoes_adicionais.get("linhas_cargo")):
        numero_cargo = int(formulario_informacoes_adicionais.get("linhas_cargo"))
    else:
        numero_cargo = 0

    for i in range(numero_cargo):
        count = str(i)
        db_candidatos.execute('INSERT INTO cargo_pretendido(id_candidato, descricao_cargo) VALUES(?,?)', (primary_id),  formulario_informacoes_adicionais["cargo"+count])

    if(formulario_informacoes_adicionais.get("categoria")):
        db_candidatos.execute('INSERT INTO cnh(id_candidato, categoria) VALUES(?,?)', (primary_id),  formulario_informacoes_adicionais["categoria"])

    if(formulario_informacoes_adicionais.get("descricao_pcd")):
        db_candidatos.execute('INSERT INTO deficiencia(id_candidato, descricao_pcd, laudo, observacoes_pcd) VALUES(?,?,?,?)', (primary_id), formulario_informacoes_adicionais["descricao_pcd"], formulario_informacoes_adicionais["laudo"],formulario_informacoes_adicionais["observacoes_pcd"])
    
    session.clear()
    return render_template("cadastroCandidato/success.html")


#função que gera um codigo de confirmação aleatório
def rand_pass(size):
    generate_pass = ''.join([random.choice( string.ascii_uppercase + string.ascii_lowercase + string.digits) for n in range(size)])

    return generate_pass

@appCandidato.route("/codigo_verificacao", methods =["POST"])
def codigo_verificacao():
    formulario = request.form
    #se eu estiver vindo da pagina index
    verificacao = session.get("verificacao", None)
    if(formulario.get("cpf") or formulario.get("reenviar")):
        mail = Mail(current_app)
        msg = Message('Grupo Dimensão - Codigo de Verificação de Candidato', sender = 'dimensaoselecao@gmail.com', recipients = [verificacao['email']])
        msg.body = "Seu Codigo de Verificação: " + verificacao['codigo']
        print("codigo:",verificacao['codigo'])
        #codigo para enviar o email(tirar comentario)
        mail.send(msg)

    #se eu estiver vindo dessa propria pagina
    if(formulario.get("codigo")):
        codigo_usuario = formulario.get("codigo")
        if(codigo_usuario == verificacao['codigo']):
            session.pop("verificacao", None)
            return redirect(url_for('appCandidato.atualizarInfo'), code=307)
        else:
            flash("Codigo Inválido")
    
    return render_template("cadastroCandidato/codigo_verificacao.html",verificacao = verificacao)


@appCandidato.route("/atualizarInfo", methods =["POST"])
def atualizarInfo():
    #POSSIVEIS BUGS: AJEITAR A VIZUALIZAÇÃO DA TABELA DE DEFICIENCIA, VERIFICAR VIZUALIZAÇÃO MOBILE
    formulario = request.form
    if(formulario.get("id_candidato")):
        flash('Dados Atualizados com Sucesso.')
        id_candidato = formulario.get("id_candidato")
    
        nome = formulario.get("nome")
        email = formulario.get("email")
        sexo = formulario.get("sexo")
        estado_civil = formulario.get("estado_civil")
        data_nascimento = formulario.get("data_nascimento")
        telefone = formulario.get("telefone")
        cep = formulario.get("cep")
        dias_disponiveis = formulario.get("dias_disponiveis")
        turno_disponivel = formulario.get("turno_disponivel")
        disponibilidade_viagens = formulario.get("disponibilidade_viagens")
        renumeracao_pretendida = formulario.get("renumeracao_pretendida")

        db_candidatos.execute("UPDATE candidato SET nome=?,email=?,sexo=?,estado_civil=?,data_nascimento=?,telefone=?,cep=?,dias_disponiveis=?,turno_disponivel=?,disponibilidade_viagens=?,renumeracao_pretendida=? WHERE id=?",nome,email,sexo,estado_civil,data_nascimento,telefone,cep,dias_disponiveis,turno_disponivel,disponibilidade_viagens,renumeracao_pretendida,id_candidato)

        #se atualizou PCD
        db_candidatos.execute("DELETE FROM deficiencia WHERE id_candidato=?",int(id_candidato))
        if(formulario.get("descricao_pcd")):
            descricao_pcd = formulario.get("descricao_pcd")
            laudo = formulario.get("laudo")
            if(formulario.get("observacoes_pcd")):
                observacoes_pcd = formulario.get("observacoes_pcd")
                db_candidatos.execute("INSERT INTO deficiencia(id_candidato,descricao_pcd,laudo,observacoes_pcd) VALUES(?,?,?,?)",id_candidato,descricao_pcd,laudo,observacoes_pcd)
            else:
                db_candidatos.execute("INSERT INTO deficiencia(id_candidato,descricao_pcd,laudo,observacoes_pcd) VALUES(?,?,?,?)",id_candidato,descricao_pcd,laudo,"")         

        #se atualizou a cnh
        db_candidatos.execute("DELETE FROM cnh WHERE id_candidato=?",int(id_candidato))
        if(formulario.get("categoria")):
            categoria = formulario.get("categoria")
            db_candidatos.execute("INSERT INTO cnh(id_candidato,categoria) VALUES(?,?)",id_candidato,categoria)

        #se atualizou os cargos pretendidos
        db_candidatos.execute("DELETE FROM cargo_pretendido WHERE id_candidato=?",int(id_candidato))
        if(int(formulario.get("numero_cargo")) > 0):
            for i in range(int(formulario.get("numero_cargo"))):
                cargo_pretendido = formulario.get("cargo_pretendido"+str(i))

                db_candidatos.execute("INSERT INTO cargo_pretendido(id_candidato,descricao_cargo) VALUES(?, ?)", int(id_candidato),cargo_pretendido)

        #se atualizou as formacoes
        db_candidatos.execute("DELETE FROM formacao WHERE id_candidato=?",int(id_candidato))
        if(int(formulario.get("numero_formacao")) > 0):
            for i in range(int(formulario.get("numero_formacao"))):
                curso = formulario.get("curso"+str(i))
                instituicao = formulario.get("instituicao"+str(i))
                nivel = formulario.get("nivel"+str(i))
                situacao = formulario.get("situacao"+str(i))
                inicio = formulario.get("inicio"+str(i))
                terminio_formacao =formulario.get("terminio_formacao"+str(i))

                db_candidatos.execute("INSERT INTO formacao(id_candidato,curso,instituicao,nivel,inicio,terminio_formacao,situacao) VALUES(?,?,?,?,?,?,?)",int(id_candidato),curso,instituicao,nivel,inicio,terminio_formacao,int(situacao))

        #se atualizou as experiencias
        db_candidatos.execute("DELETE FROM experiencia WHERE id_candidato=?",int(id_candidato))   
        if(int(formulario.get("numero_experiencia")) > 0):
            for i in range(int(formulario.get("numero_experiencia"))):    
                empresa = formulario.get("empresa"+str(i))
                cargo = formulario.get("cargo"+str(i))
                ano_inicio_experiencia = formulario.get("ano_inicio_experiencia"+str(i))
                ano_fim_experiencia = formulario.get("ano_fim_experiencia"+str(i))
                descricao_experiencia = formulario.get("descricao_experiencia"+str(i))

                db_candidatos.execute("INSERT INTO experiencia(id_candidato,empresa,cargo,ano_inicio_experiencia,ano_fim_experiencia,descricao_experiencia) VALUES(?,?,?,?,?,?)",int(id_candidato),empresa,cargo,ano_inicio_experiencia,ano_fim_experiencia,descricao_experiencia)

    if(formulario.get("id")):
        id_candidato = formulario["id"]

    #id_candidato=16
    candidato = db_candidatos.execute("SELECT * FROM candidato  WHERE id= ?", id_candidato)
    cargo_pretendido = db_candidatos.execute("SELECT * FROM cargo_pretendido  WHERE id_candidato=?", id_candidato)
    cnh = db_candidatos.execute("SELECT * FROM cnh  WHERE id_candidato=?", id_candidato)
    deficiencia = db_candidatos.execute("SELECT * FROM deficiencia  WHERE id_candidato=?", id_candidato)
    experiencia = db_candidatos.execute("SELECT * FROM experiencia  WHERE id_candidato=?", id_candidato)
    formacao = db_candidatos.execute("SELECT * FROM formacao  WHERE id_candidato=?", id_candidato)
    habilidade = db_candidatos.execute("SELECT * FROM habilidade  WHERE id_candidato=?", id_candidato)

    return render_template("cadastroCandidato/atualizarInfo.html", candidato = candidato, cargo_pretendido = cargo_pretendido, cnh=cnh, deficiencia = deficiencia, experiencia = experiencia, formacao = formacao, habilidade=habilidade)