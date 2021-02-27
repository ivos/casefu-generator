-- Tables
---------

-- Entity: Person
create table people
(
    custom_id serial primary key,
    custom_version int not null,
    personal_number text not null,
    family_name text not null,
    given_names varchar(30),
    user_name text not null,
    email text,
    sex text
);
create unique index ui_people__user_name on people (user_name);
create unique index ui_people__email on people (email);
alter table people
    add constraint ck_people__sex check ( sex in ('male', 'female') );

-- Entity: Multiple word default code
create table multiple_word_default_codes
(
    natural_primary_key text primary key,
    description text,
    person_custom_id integer not null,
    version bigint not null
);

-- Entity: Explicit code
create table some_explicit_codes
(
    foreign_primary_key integer primary key,
    description text,
    version bigint not null
);

-- Entity: Plain PK
create table plain_pks
(
    primary_key bigint primary key,
    business_key text not null,
    description text,
    maybe_person_custom_id integer,
    version bigint not null
);

-- Entity: Location
create table locations
(
    id bigserial primary key,
    version bigint not null,
    name text
);

-- Entity: Empty
create table empties
(
    id bigserial primary key,
    version bigint not null
);

-- Entity: Event
create table events
(
    id bigserial primary key,
    custom_version int not null,
    time timestamp not null,
    status text not null,
    location_id bigint not null,
    one_to_one_foreign_primary_key integer not null,
    one_to_one_empty_id bigint
);
alter table events
    add constraint ck_events__status check ( status in ('active', 'preApproved', 'disabled', 'multi_word') );


-- Foreign keys
---------------

alter table multiple_word_default_codes
    add constraint fk_multiple_word_default_codes__person foreign key (person_custom_id) references people on delete cascade;
alter table some_explicit_codes
    add constraint fk_some_explicit_codes__foreign_primary_key foreign key (foreign_primary_key) references people on delete cascade;
alter table plain_pks
    add constraint fk_plain_pks__maybe_person foreign key (maybe_person_custom_id) references people on delete cascade;
alter table events
    add constraint fk_events__location foreign key (location_id) references locations on delete cascade;
alter table events
    add constraint fk_events__one_to_one foreign key (one_to_one_foreign_primary_key) references some_explicit_codes on delete cascade;
alter table events
    add constraint fk_events__one_to_one_empty foreign key (one_to_one_empty_id) references empties on delete cascade;
