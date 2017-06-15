create database graphql character set utf8;
CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45),
    pw VARCHAR(45),
    salt VARCHAR(45),
    signTime VARCHAR(15),
    PRIMARY KEY(id)
) DEFAULT CHARSET=utf8;
