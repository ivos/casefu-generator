-- Tables
---------

-- Entity: Person
create table people
(
    id bigserial primary key,
    personal_number text not null,
    family_name text not null,
    given_names varchar(30),
    user_name text not null,
    email text,
    sex text,
    version bigint not null
);
create unique index ui_people__user_name on people (user_name);
create unique index ui_people__email on people (email);
alter table people
    add constraint ck_people__sex check ( sex in ('male', 'female') );

-- Entity: Location
create table locations
(
    id bigserial primary key,
    version bigint not null,
    name text
);

-- Entity: Event
create table events
(
    id bigserial primary key,
    version bigint not null,
    time timestamp not null,
    status text not null,
    location_id bigint not null
);
alter table events
    add constraint ck_events__status check ( status in ('active', 'disabled') );


-- Foreign keys
---------------

alter table events
    add constraint fk_events__location foreign key (location_id) references locations on delete cascade;
