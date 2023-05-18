CREATE DATABASE hirejob_app;

CREATE TABLE users (
    id varchar primary key not null,
    name varchar not null,
    email varchar not null,
    password varchar not null,
    phone varchar not null,
    company varchar,
    position varchar,
    description varchar,
    photo varchar,
    role varchar not null,
    instagram varchar,
    github varchar,
    linkedin varchar,
    created_date date
);
insert into users(id,name,email,password,phone,company,position,description,photo,role,instagram,github,linkedin,created_date)
values('1a','rizal','rizalyuniar123@gmail.com','123456','081231135423','PT. Sejahtera','HRD','loremdescription','photo.jpg','workers',
'@rizalyuniar','rrizalyuniar','R.Rizal','01/01/2021');

CREATE TABLE workers(
    id varchar primary key not null,
    jobdesk varchar,
    address varchar,
    workplace varchar,
    skills varchar [],
    id_user varchar not null references users on delete cascade,
    foreign key (id_user) references users(id)
);
insert into workers(id,jobdesk,address,workplace,skills,id_users)
values('1','Web Developer','Surabaya','Jakarta','{Java,Javascript}','1a');

CREATE TABLE portofolios(
    id varchar primary key not null,
    name varchar not null,
    repository varchar,
    type varchar not null,
    photo varchar,
    id_user varchar not null references users on delete cascade,
    foreign key (id_user) references users(id),
    created_at date not null
);
insert into portofolios(id,name,repository,type,photo,id_users,created_at)
values('1','Blanja App','github.com','Aplikasi web','photo.jpg','1a','2023-03-06');

CREATE TABLE recruiters(
    id varchar primary key not null,
    division varchar,
    address varchar,
    id_user varchar not null references users on delete cascade,
    foreign key (id_user) references users(id)
);
insert into recruiters(id,division,address,id_users)
values('1','financial','Bandung','1a');











-- create
insert into products(id,name,price,color,size,stock,rating,photo,description) 
values(1,'baju muslim pria',60000,'white','m',4,'sangat bagus','foto1','ini adalah baju muslim pria'),
(2,'baju batik pria',100000,'black','l',7,'bagus','foto2','ini adalah baju batik pria');
insert into categorys(id,name) values(1,'baju');

-- get detail by id
select * from products where id=1;
-- update
update products
set price=70000,
stock=7
where id=1;
-- delete
delete from products where id=4;