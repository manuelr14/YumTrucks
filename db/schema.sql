DROP DATABASE IF EXISTS food_trucksDB;
CREATE DATABASE food_trucksDB;

USE food_trucksDB;

CREATE TABLE trucks
(
	id int NOT NULL AUTO_INCREMENT,
    truck_name varchar(100) NOT NULL,
	username varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    location varchar(50) NOT NULL,
    avatar varchar(50) NOT NULL,
    menu_image varchar(255),
    status varchar(50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(50) NOT NULL,
	password varchar(50) NOT NULL,
	location varchar(50) NOT NULL,
	avatar varchar(50) NOT NULL,
    status varchar(50) NOT NULL,
    favorite_trucks varchar(50) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (client_id) REFERENCES clients(id)
);
