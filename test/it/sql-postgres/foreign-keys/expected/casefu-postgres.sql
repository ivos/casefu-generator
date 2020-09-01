-- Entity: A
create table a
(
    code bigserial primary key,
    created timestamp
);

-- Entity: B
create table b
(
    code varchar(15) primary key,
    created timestamp
);

-- Entity: C
create table c
(
    code varchar(15) primary key,
    created timestamp
);

-- Entity: D
create table d
(
    code varchar(15) primary key,
    created timestamp
);

-- Entity: E
create table e
(
    code SERIAL primary key,
    created TIMESTAMP
);

-- Entity: F
create table f
(
    id bigserial primary key,
    name text
);

-- Entity: Referring R
create table referring_r
(
    id bigserial primary key,
    fk bigint not null,
    ofk varchar(15),
    n_to_1 varchar(15) not null,
    n_to_0_1 varchar(15),
    n_to_1_1 integer not null,
    one_to_1 bigint not null,
    not_a_ref bigint not null
);

-- Entity: Referring S
create table referring_s
(
    id bigserial primary key
);

-- Entity: Master
create table master
(
    id bigserial primary key
);

-- Entity: Slave
create table slave
(
    id bigserial primary key,
    master bigint not null
);
