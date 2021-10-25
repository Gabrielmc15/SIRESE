from cs50 import SQL

#open("candidatos.db", "w").close()
db = SQL("sqlite:///candidatos.db")

#db.execute("CREATE TABLE candidato (id INTEGER NOT NULL, cpf INTEGER NOT NULL, nome TEXT NOT NULL, email TEXT NOT NULL, sexo INTEGER NOT NULL, estado_civil INTEGER NOT NULL, data_nascimento TEXT NOT NULL, telefone INTEGER NOT NULL, cep TEXT NOT NULL, dias_disponiveis INTEGER NOT NULL, turno_disponivel INTEGER NOT NULL, disponibilidade_viagens INTEGER NOT NULL, renumeracao_pretendida INTEGER NOT NULL, PRIMARY KEY(id))")

#db.execute("CREATE TABLE formacao (id_candidato INTEGER NOT NULL, curso TEXT NOT NULL, instituicao TEXT NOT NULL, nivel TEXT NOT NULL, inicio TEXT NOT NULL, terminio_formacao TEXT, situacao INTEGER NOT NULL, FOREIGN KEY(id_candidato) REFERENCES candidato(id))")

#db.execute("CREATE TABLE experiencia (id_candidato INTEGER NOT NULL, empresa TEXT NOT NULL, cargo TEXT NOT NULL, ano_inicio_experiencia INTEGER NOT NULL, ano_fim_experiencia INTEGER NOT NULL, descricao_experiencia TEXT NOT NULL, FOREIGN KEY(id_candidato) REFERENCES candidato(id))")

#db.execute("INSERT INTO experiencia(id_candidato,empresa,cargo,ano_inicio_experiencia,ano_fim_experiencia,descricao_experiencia) VALUES(?,?,?,?,?,?)",1,"Dimensão","Cargo de exemplo",2000,2003,"exemplo da descrição")
#db.execute("INSERT INTO experiencia(id_candidato,empresa,cargo,ano_inicio_experiencia,ano_fim_experiencia,descricao_experiencia) VALUES(?,?,?,?,?,?)",3,"Aço","Empreendedor",2005,2006,"Trabalhava com Empreendedorismo")
#db.execute("INSERT INTO experiencia(id_candidato,empresa,cargo,ano_inicio_experiencia,ano_fim_experiencia,descricao_experiencia) VALUES(?,?,?,?,?,?)",3,"Dimensão","Programador",2010,2013,"Programação")
#db.execute("INSERT INTO experiencia(id_candidato,empresa,cargo,ano_inicio_experiencia,ano_fim_experiencia,descricao_experiencia) VALUES(?,?,?,?,?,?)",4,"Nova Empresa","Ator",2010,2021,"Atuação")
#db.execute("INSERT INTO experiencia(id_candidato,empresa,cargo,ano_inicio_experiencia,ano_fim_experiencia,descricao_experiencia) VALUES(?,?,?,?,?,?)",6,"ITA","Administrador",2009,2015,"Trabalhava no setor administrativo")
#db.execute("INSERT INTO experiencia(id_candidato,empresa,cargo,ano_inicio_experiencia,ano_fim_experiencia,descricao_experiencia) VALUES(?,?,?,?,?,?)",12,"dimensao engenharia","engenheiro",2019,2020,"bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..bla..")

#db.execute("CREATE TABLE cargo_pretendido (id_candidato INTEGER NOT NULL, descricao_cargo TEXT NOT NULL, FOREIGN KEY(id_candidato) REFERENCES candidato(id))")

#db.execute("CREATE TABLE deficiencia (id_candidato INTEGER NOT NULL, descricao_pcd TEXT NOT NULL, laudo INTEGER NOT NULL, observacoes_pcd TEXT, FOREIGN KEY(id_candidato) REFERENCES candidato(id))")

#db.execute("CREATE TABLE cnh (id_candidato INTEGER NOT NULL, categoria TEXT NOT NULL, FOREIGN KEY(id_candidato) REFERENCES candidato(id))")

#db.execute("CREATE TABLE habilidade (id_candidato INTEGER NOT NULL, tag TEXT NOT NULL, FOREIGN KEY(id_candidato) REFERENCES candidato(id))")

#print( db.execute("SELECT * FROM candidato"))
#print( db.execute("SELECT * FROM formacao"))
#print( db.execute("SELECT * FROM experiencia"))
#print( db.execute("SELECT * FROM cargo_pretendido"))
#print( db.execute("SELECT * FROM deficiencia"))
#print( db.execute("SELECT * FROM cnh"))

#GERAL
#DONE (importancia: 3) (facil) método de nao permitir que o canditado acesse uma pagina do formulario sem ter acessado a pagina anterior antes 
#TODO (importancia: 2) (facil) pensar em um nome melhor para as páginas 
#TODO (importancia: 2) (facil) pensar em um título melhor para as páginas 
#TODO (importancia: 2) (facil) melhorar o nome dos arquivos e verificar se estão bem organizados 
#OBS POSSIVEL SOLUÇÃO PARA O BOTAO VOLTAR: FAZER TUDO EM UMA PÁGINA (talvez falar com lucas)
#PAGINA INDEX:
#DONE (importancia: 4) (medio) Criptografar CPF 
#DONE (importancia: 4) (medio) não permitir que o mesmo candidato se cadastre 2 vezes 
#PAGINA FORMAÇÃO
#DONE (importancia: 1) (facil) (talvez) mudar o input de nivel da formação para select 
#DONE (importancia: 4) (dificil) botão de voltar que salve os valores da pagina anterior 
#PAGINA INFORMAÇÕES ADICIONAIS
#DONE (importancia: 1) (facil) caso o candidato preencha somente um cargo e não adicione, adicionar automaticamente
#DONE (importancia: 3) (facil) adicionar o campo de observações da deficiencia no banco de dados 
#TODO (importancia: 1) (facil) CNH, mmudar para checkbox que marque as CHNs que possui 
#DONE (importancia: 4) (dificil) botão de voltar que salve os valores da pagina anterior 
#TODO obter lista de cargos com o RH (aguardar lucas)
#PAGINA CONFIRMAR
#DONE (importancia: 4) (dificil) botão de voltar que salve os valores da pagina anterior 
#PAGINA SUCCESS (melhorar nome)

#PAGINA ADM (melhorar nome)
#DONE (importancia: 3) (facil) adicionar o status do processo, e ID 
#done (importancia: 3) (facil) criar o banco de dados novamente para atualizar as novas informações sobre status 
#DONE (importancia: 3) (facil) unificar as  tabelas do banco de dados? 
#TODO (importancia: 4) (dificil) implementar função de relação entre os candidatos compativeis com a vaga e o processo 
#TODO (importancia: 2) (medio) tirar duvidas com lucas sobre como será a autenticação do gestor 
#PAGINA ADD PROCESSO
#DUVIDA a gestor e o setor também serão obtidos automaticamente? como? eu que devo resolver isso?
#PAGINA BUSCAR
#TODO  (importancia 2) (facil)a dicionar mais filtros? 