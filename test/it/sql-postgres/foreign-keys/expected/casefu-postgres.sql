-- Tables
---------

-- Entity: A
create table as
(
    code bigserial primary key,
    created timestamp
);

-- Entity: B
create table bs
(
    code varchar(15) primary key,
    created timestamp
);

-- Entity: C
create table cs
(
    code varchar(15) primary key,
    created timestamp
);

-- Entity: D
create table ds
(
    code varchar(15) primary key,
    created timestamp
);

-- Entity: E
create table es
(
    code SERIAL primary key,
    created TIMESTAMP
);

-- Entity: F
create table fs
(
    id bigserial primary key,
    name text
);

-- Entity: Referring R
create table referring_rs
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
create table masters
(
    id bigserial primary key
);

-- Entity: Slave
create table slaves
(
    id bigserial primary key,
    master bigint not null
);


-- Foreign keys
---------------

alter table cs
    add constraint fk_cs__code foreign key (code) references bs on delete cascade;
alter table ds
    add constraint fk_ds__code foreign key (code) references cs on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__fk foreign key (fk) references as on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__ofk foreign key (ofk) references bs on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__n_to_1 foreign key (n_to_1) references cs on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__n_to_0_1 foreign key (n_to_0_1) references ds on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__n_to_1_1 foreign key (n_to_1_1) references es on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__one_to_1 foreign key (one_to_1) references fs on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__not_a_ref foreign key (not_a_ref) references varchar_42_s on delete cascade;
alter table slaves
    add constraint fk_slaves__master foreign key (master) references masters on delete cascade;
