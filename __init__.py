from flask import Flask,redirect,url_for


def create_app():
    app = Flask(__name__)
    teste = 'zyzpcweusclkavyj'
    app.config['SECRET_KEY'] = 'secret-key-goes-here'
    app.static_folder = 'static'

    from appCandidato import appCandidato as appCandidato_blueprint
    app.register_blueprint(appCandidato_blueprint)

    from appSolicitacao import appSolicitacao as appSolicitacao_blueprint
    app.register_blueprint(appSolicitacao_blueprint)


    app.config['MAIL_SERVER']='smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = 'dimensaoselecao@gmail.com'
    app.config['MAIL_PASSWORD'] = teste
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True
    
    return app

if __name__ == "__main__":
    app = create_app()

    @app.errorhandler(404)
    def page_not_found(e):
        
        return redirect(url_for('appCandidato.index'))

    app.run("0.0.0.0", 5001)


#para rodar o flask
#set FLASK_APP=__init__.py
#$env:FLASK_APP = "__init__.py"
#flask run

#para rodar no servidor
#flask run --host=0.0.0.0












#GERAL
#TODO (importancia: 2) (medio) Validar formulario de cadastro de candidato pelo javascript 
#PAGINA INFORMAÇÕES ADICIONAIS
#TODO obter lista de cargos com o RH (aguardar lucas)
#PAGINA CONFIRMAR
#TODO (importancia: 4) (dificil) Adicionar opções de editar qualquer informação inserida antes (com validação)

#PAGINA ADM (melhorar nome)
#DONE (importancia: 3) (facil) deixar a tabela mais personalizável 
#TODO (importancia: 4) (dificil) implementar função de relação entre os candidatos compativeis com a vaga e o processo 
#TODO (importancia: 3) (dificil) botao de vizualizar processo que leva para a pagina do processo específico 
#TODO (importancia: 2) (medio) tirar duvidas com lucas sobre como será a autenticação do gestor 
#PAGINA ADD PROCESSO
#DONE (importancia: 2) (facil) pegar a data automaticamente  
#DUVIDA a gestor e o setor também serão obtidos automaticamente? como? eu que devo resolver isso?