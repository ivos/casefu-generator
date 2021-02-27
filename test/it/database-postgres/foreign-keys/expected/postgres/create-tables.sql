-- Tables
---------

-- Entity: A
create table as
(
    code bigserial primary key,
    created timestamp,
    version bigint not null
);

-- Entity: B
create table bs
(
    code varchar(15) primary key,
    created timestamp,
    version bigint not null
);

-- Entity: C
create table cs
(
    code varchar(15) primary key,
    created timestamp,
    version bigint not null
);

-- Entity: D
create table ds
(
    code varchar(15) primary key,
    created timestamp,
    version bigint not null
);

-- Entity: E
create table es
(
    code SERIAL primary key,
    created TIMESTAMP,
    version bigint not null
);

-- Entity: F
create table fs
(
    id bigserial primary key,
    version bigint not null,
    name text
);

-- Entity: Referring R
create table referring_rs
(
    id bigserial primary key,
    version bigint not null,
    fk_code bigint not null,
    ofk_code varchar(15),
    n_to_1_code varchar(15) not null,
    n_to_0_1_code varchar(15),
    n_to_1_1_code integer not null,
    one_to_1_id bigint not null,
    not_a_ref_id bigint not null
);

-- Entity: Referring S
create table referring_s
(
    id bigserial primary key,
    version bigint not null
);

-- Entity: Master
create table masters
(
    id bigserial primary key,
    version bigint not null
);

-- Entity: Slave
create table slaves
(
    id bigserial primary key,
    version bigint not null,
    master_id bigint not null
);


-- Foreign keys
---------------

alter table cs
    add constraint fk_cs__code foreign key (code) references bs on delete cascade;
alter table ds
    add constraint fk_ds__code foreign key (code) references cs on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__fk foreign key (fk_code) references as on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__ofk foreign key (ofk_code) references bs on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__n_to_1 foreign key (n_to_1_code) references cs on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__n_to_0_1 foreign key (n_to_0_1_code) references ds on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__n_to_1_1 foreign key (n_to_1_1_code) references es on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__one_to_1 foreign key (one_to_1_id) references fs on delete cascade;
alter table referring_rs
    add constraint fk_referring_rs__not_a_ref foreign key (not_a_ref_id) references varchar_42_s on delete cascade;
alter table slaves
    add constraint fk_slaves__master foreign key (master_id) references masters on delete cascade;
