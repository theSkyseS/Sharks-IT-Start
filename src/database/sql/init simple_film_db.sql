CREATE TABLE simple_film_db.film (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name text,
  year integer
);

CREATE TABLE simple_film_db.genre (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name varchar(30)
);

CREATE TABLE simple_film_db.film_genre (
  film_id integer,
  genre_id integer,
  PRIMARY KEY (film_id, genre_id)
);

ALTER TABLE simple_film_db.film_genre ADD FOREIGN KEY ("film_id") REFERENCES simple_film_db.film (id);

ALTER TABLE simple_film_db.film_genre ADD FOREIGN KEY ("genre_id") REFERENCES simple_film_db.genre (id);

