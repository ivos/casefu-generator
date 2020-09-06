-- Tables
---------

-- Entity: Person
create type people__sex as enum ('male', 'female');
create table people
(
    id bigserial primary key,
    personal_number text not null,
    family_name text not null,
    given_names varchar(30),
    user_name text not null,
    email text,
    sex people__sex
);
create unique index ui_people__user_name on people (user_name);
create unique index ui_people__email on people (email);

-- Entity: Multiple word default code
create table multiple_word_default_codes
(
    natural_primary_key text primary key,
    description text,
    person bigint not null
);

-- Entity: Explicit code
create table some_explicit_codes
(
    foreign_primary_key bigint primary key,
    description text
);

-- Entity: Plain PK
create table plain_pks
(
    primary_key bigint primary key,
    business_key text not null,
    description text,
    maybe_person bigint
);

-- Entity: Location
create table locations
(
    id bigserial primary key,
    name text
);

-- Entity: Empty
create table empties
(
    id bigserial primary key
);

-- Entity: Event
create type events__status as enum ('active', 'preApproved', 'disabled', 'multi_word');
create table events
(
    id bigserial primary key,
    time timestamp not null,
    status events__status not null,
    location bigint not null,
    one_to_one bigint not null,
    one_to_one_empty bigint
);


-- Foreign keys
---------------

alter table multiple_word_default_codes
    add constraint fk_multiple_word_default_codes__person foreign key (person) references people on delete cascade;
alter table some_explicit_codes
    add constraint fk_some_explicit_codes__foreign_primary_key foreign key (foreign_primary_key) references people on delete cascade;
alter table plain_pks
    add constraint fk_plain_pks__maybe_person foreign key (maybe_person) references people on delete cascade;
alter table events
    add constraint fk_events__location foreign key (location) references locations on delete cascade;
alter table events
    add constraint fk_events__one_to_one foreign key (one_to_one) references some_explicit_codes on delete cascade;
alter table events
    add constraint fk_events__one_to_one_empty foreign key (one_to_one_empty) references empties on delete cascade;
