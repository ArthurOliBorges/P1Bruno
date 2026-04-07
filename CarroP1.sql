CREATE DATABASE livro;
USE livro;

CREATE TABLE carro(
id int auto_increment not null,
nome varchar(100) null,
tipo varchar(100) null,
primary key(id));

insert into carro values
(1, 'Ferrari', 'esportivo'),
(2, 'Lambo', 'esportivo'),
(3, 'Maclaren', 'esportivo'),
(4, 'Fusca', 'popular'),
(5, 'T-cross', 'popular'),
(6, 'Nivus', 'popular');

select * from carro;

