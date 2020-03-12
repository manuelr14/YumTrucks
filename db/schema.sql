DROP DATABASE IF EXISTS food_trucksDB;
CREATE DATABASE food_trucksDB;

USE food_trucksDB;

CREATE TABLE trucks
(
	id int NOT NULL AUTO_INCREMENT,
    truck_name varchar(100) NOT NULL,
	first_name varchar (50) NOT NULL,
	last_name varchar (50) NOT NULL,
	email varchar (50) NOT NULL,
	street varchar (50) NOT NULL,
	city varchar (50) NOT NULL,
	state varchar (50) NOT NULL,
	zip INT,
    password varchar(50) NOT NULL,
    avatar varchar(50) NOT NULL,
    -- menu_image varchar(255),
    status varchar(50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar (50) NOT NULL,
	last_name varchar (50) NOT NULL,
	email varchar (50) NOT NULL,
	street varchar (50) NOT NULL,
	password varchar(50) NOT NULL,
	avatar varchar(50) NOT NULL,
    status varchar(50) NOT NULL,
    favorite_trucks varchar(50) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (client_id) REFERENCES clients(id)
);


