
INSERT INTO ROLE (id ,name) VALUES (1, 'ROLE_EDITOR');
INSERT INTO ROLE (id ,name) VALUES (2, 'ROLE_VIEWER');
/*sifra: 123*/
INSERT INTO users (dtype,id,enabled ,first_name, last_name, last_password_reset_date,password,username) values ('EDITOR',1,true,'Magdalena','Reljin','2022-01-04 15:31:53.899','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra','megi@gmail.com');
INSERT INTO users (dtype,id,enabled ,first_name, last_name, last_password_reset_date,password,username) values ('VIEWER',2,true,'Magdalena','Reljin','2022-01-04 15:31:53.899','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra','megi2@gmail.com');
INSERT INTO USER_ROLE (user_id, role_id) VALUES (1, 1);
INSERT INTO USER_ROLE (user_id, role_id) VALUES (2, 2);