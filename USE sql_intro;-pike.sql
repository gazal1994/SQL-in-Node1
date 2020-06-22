USE sql_intro;

-- CREATE TABLE pokemon(
--   p_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   p_name VARCHAR(20),
--   p_height INT,
--   p_weight INT
-- );

-- CREATE TABLE pokemon_type(
--     type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     type_name VARCHAR(20)
-- );
--  CREATE TABLE trainer(
--      t_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
-- --   trainer_name VARCHAR(20)
--  );

--  CREATE TABLE town (
--      town_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
--     --   town_name VARCHAR(20)
--  );

--  CREATE TABLE pokemon_trainer(
--       pokemon_id INT,
--       trainer_id INT,
--       FOREIGN KEY( pokemon_id) REFERENCES pokemon(p_id),
--       FOREIGN KEY( trainer_id) REFERENCES pokemon(t_id)
--  );
 CREATE TABLE pokemon_trainer
(
    pokemon_id INT,
    trainer_id INT,

    FOREIGN KEY(pokemon_id) REFERENCES pokemon(p_id),
    FOREIGN KEY(trainer_id) REFERENCES trainer(t_id)
);
