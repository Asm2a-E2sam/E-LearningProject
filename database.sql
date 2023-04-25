CREATE DATABASE IF NOT EXISTS e_learning;
USE e_learning;

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(20) NOT NULL
);



CREATE TABLE IF NOT EXISTS courses(
    name VARCHAR(60) NOT NULL,
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    image VARCHAR(120),
    price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS enrollment(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    courses_id INT NOT NULL 
);

ALTER TABLE enrollment
ADD FOREIGN KEY (user_id) REFERENCES user(id);

ALTER TABLE enrollment
ADD  FOREIGN KEY (courses_id) REFERENCES courses(id);
