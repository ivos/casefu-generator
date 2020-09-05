-- Tables
---------

-- Entity: Person
create table person
(
    id bigserial primary key,
    personal_number text not null,
    family_name text not null,
    given_names varchar(30),
    user_name text not null,
    email text
);
create unique index ui_person__user_name on person (user_name);
create unique index ui_person__email on person (email);

-- Entity: Multiple word default code
create table multiple_word_default_code
(
    natural_primary_key text primary key,
    description text,
    person bigint not null
);

-- Entity: Explicit code
create table some_explicit_code
(
    foreign_primary_key bigint primary key,
    description text
);

-- Entity: Plain PK
create table plain_pk
(
    primary_key bigint primary key,
    business_key text not null,
    description text,
    maybe_person bigint
);

-- Entity: Location
create table location
(
    id bigserial primary key,
    name text
);

-- Entity: Empty
create table empty
(
    id bigserial primary key
);

-- Entity: Event
create table event
(
    id bigserial primary key,
    time timestamp not null,
    location bigint not null,
    one_to_one bigint not null,
    one_to_one_empty bigint
);


-- Foreign keys
---------------

alter table multiple_word_default_code
    add constraint fk_multiple_word_default_code__person foreign key (person) references person on delete cascade;
alter table some_explicit_code
    add constraint fk_some_explicit_code__foreign_primary_key foreign key (foreign_primary_key) references person on delete cascade;
alter table plain_pk
    add constraint fk_plain_pk__maybe_person foreign key (maybe_person) references person on delete cascade;
alter table event
    add constraint fk_event__location foreign key (location) references location on delete cascade;
alter table event
    add constraint fk_event__one_to_one foreign key (one_to_one) references some_explicit_code on delete cascade;
alter table event
    add constraint fk_event__one_to_one_empty foreign key (one_to_one_empty) references empty on delete cascade;
