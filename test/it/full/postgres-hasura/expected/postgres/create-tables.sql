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

-- Entity: Location
create table locations
(
    id bigserial primary key,
    name text
);

-- Entity: Event
create type events__status as enum ('active', 'disabled');
create table events
(
    id bigserial primary key,
    time timestamp not null,
    status events__status not null,
    location_id bigint not null
);


-- Foreign keys
---------------

alter table events
    add constraint fk_events__location foreign key (location_id) references locations on delete cascade;
