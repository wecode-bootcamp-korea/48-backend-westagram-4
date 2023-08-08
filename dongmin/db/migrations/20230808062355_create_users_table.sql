-- migrate:up
create table users (
  id int not null auto_increment,
  phone_number_or_email varchar(200) not null,
  account varchar(50) not null,
  name varchar(50) not null,
  password varchar(100) not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp null on update current_timestamp,
  primary key (id)
);

-- migrate:down
drop table users;
