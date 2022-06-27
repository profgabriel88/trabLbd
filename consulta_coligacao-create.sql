create table consulta_coligacao(
    dt_geracao date,
    hh_geracao time,
    ano_eleicao integer,
    cd_tipo_eleicao int,
    nm_tipo_eleicao varchar(255),
    nr_turno integer
    cd_eleicao integer
    ds_eleicao varchar(255),
    dt_eleicao varchar(255),
    sg_uf varchar(2),
    sg_ue varchar(255),
    nm_ue varchar(255),
    cd_cargo integer,
    ds_cargo varchar(255),
    tp_agremiacao varchar(255),
    nr_partido integer,
    sg_partido varchar(255),
    nm_partido varchar(255),
    sq_coligacao varchar(255),
    nm_coligacao varchar(255),
    ds_composicao_coligacao varchar(255),
    cd_situacao_legenda varchar(1),
    ds_situacao varchar(255)
)