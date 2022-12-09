
INSERT INTO ROLE (id ,name) VALUES (1, 'ROLE_EDITOR');
INSERT INTO ROLE (id ,name) VALUES (2, 'ROLE_VIEWER');
/*sifra: 123*/
INSERT INTO users (dtype,id,enabled ,first_name, last_name, last_password_reset_date,password,username) values ('EDITOR',1,true,'Magdalena','Reljin','2022-01-04 15:31:53.899','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra','megi@gmail.com');
INSERT INTO users (dtype,id,enabled ,first_name, last_name, last_password_reset_date,password,username) values ('VIEWER',2,true,'Magdalena','Reljin','2022-01-04 15:31:53.899','$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra','megi2@gmail.com');
INSERT INTO USER_ROLE (user_id, role_id) VALUES (1, 1);
INSERT INTO USER_ROLE (user_id, role_id) VALUES (2, 2);

INSERT INTO sport_club (id, name) VALUES (1,'CLUB1');
INSERT INTO sport_club (id, name) VALUES (2,'CLUB2');

INSERT INTO skill (id, name , description) VALUES (1, 'skill1', 'desc1');
INSERT INTO skill (id, name , description) VALUES (2, 'skill2', 'desc2');
INSERT INTO skill (id, name , description) VALUES (3, 'skill3', 'desc3');
INSERT INTO skill (id, name , description) VALUES (4, 'skill4', 'desc4');



INSERT INTO player (id, image, player_name , salary, sport_club_id) VALUES (1, '360_F_248288358_UdWGdhVoSzal0qyNROatW7whWe0hRRQl.jpg', 'player1',50000,1);
INSERT INTO player (id, image, player_name , salary, sport_club_id) VALUES (2, '360_F_248288358_UdWGdhVoSzal0qyNROatW7whWe0hRRQl.jpg', 'player2',450000,1);
INSERT INTO player (id, image, player_name , salary, sport_club_id) VALUES (3, '360_F_248288358_UdWGdhVoSzal0qyNROatW7whWe0hRRQl.jpg', 'player3',70000,1);
INSERT INTO player (id, image, player_name , salary, sport_club_id) VALUES (4, '360_F_248288358_UdWGdhVoSzal0qyNROatW7whWe0hRRQl.jpg', 'player4',3000,null);
