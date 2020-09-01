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
alter table c
    add constraint fk_c__code foreign key (code) references b on delete cascade;

-- Entity: D
create table d
(
    code varchar(15) primary key,
    created timestamp
);
alter table d
    add constraint fk_d__code foreign key (code) references c on delete cascade;

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
alter table referring_r
    add constraint fk_referring_r__fk foreign key (fk) references a on delete cascade;
alter table referring_r
    add constraint fk_referring_r__ofk foreign key (ofk) references b on delete cascade;
alter table referring_r
    add constraint fk_referring_r__n_to_1 foreign key (n_to_1) references c on delete cascade;
alter table referring_r
    add constraint fk_referring_r__n_to_0_1 foreign key (n_to_0_1) references d on delete cascade;
alter table referring_r
    add constraint fk_referring_r__n_to_1_1 foreign key (n_to_1_1) references e on delete cascade;
alter table referring_r
    add constraint fk_referring_r__one_to_1 foreign key (one_to_1) references f on delete cascade;
alter table referring_r
    add constraint fk_referring_r__not_a_ref foreign key (not_a_ref) references varchar_42 on delete cascade;

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
alter table slave
    add constraint fk_slave__master foreign key (master) references master on delete cascade;
