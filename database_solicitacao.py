from cs50 import SQL

#open("solicitacao.db", "w").close()
db = SQL("sqlite:///solicitacao.db")

#db.execute("CREATE TABLE vaga (id INTEGER NOT NULL,status INT NOT NULL, gestor TEXT NOT NULL, setor TEXT NOT NULL, data TEXT NOT NULL, motivo TEXT NOT NULL,justificativa TEXT, cargo TEXT NOT NULL, numero_de_vagas INTEGER NOT NULL, sexo INTEGER NOT NULL, empresa_contratante TEXT NOT NULL, local TEXT, turno INTEGER NOT NULL, horario_de_trabalho INTEGER NOT NULL, renumeracao_proposta INTEGER NOT NULL, PRIMARY KEY(id))")

#db.execute("CREATE TABLE candidato_solicitante (id_vaga INTEGER NOT NULL, id_candidato INTEGER NOT NULL, FOREIGN KEY(id_vaga) REFERENCES vaga(id))")
#db.execute("DROP TABLE processo ")
#db.execute("DROP TABLE candidato_solicitante ")
#db.execute("DROP TABLE etapa")
#db.execute("DROP TABLE pergunta ")

#db.execute("CREATE TABLE processo (id INTEGER NOT NULL, id_vaga INTEGER NOT NULL, PRIMARY KEY(id), FOREIGN KEY(id_vaga) REFERENCES vaga(id))")
#db.execute("CREATE TABLE candidato_solicitante (id_vaga INTEGER NOT NULL, id_candidato INTEGER NOT NULL, FOREIGN KEY(id_vaga) REFERENCES vaga(id))")
#db.execute("CREATE TABLE etapa (id INTEGER NOT NULL, id_vaga INTEGER NOT NULL,ordem INTEGER NOT NULL, PRIMARY KEY(id), FOREIGN KEY(id_vaga) REFERENCES vaga(id))")
#db.execute("CREATE TABLE pergunta (id_etapa INTEGER NOT NULL, ordem INTEGER NOT NULL, descricao_pergunta TEXT NOT NULL, tipo_pergunta TEXT NOT NULL, FOREIGN KEY(id_etapa) REFERENCES etapa(id))")

#print( db.execute("SELECT * FROM vaga"))
#print( db.execute("SELECT * FROM candidato_solicitante"))

#status = 0: aguardando aprovação
#status = 1: iniciado
#status = 2: em andamento
#status = 3: concluido