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
