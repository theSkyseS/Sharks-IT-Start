import db = require("..");

export const getFilms = () => {
  return db.query("SELECT * FROM SIMPLE_FILM_DB.FILMS", []);
};

export const getFilmById = (filmId: number) => {
  return db.query(
    "SELECT * FROM SIMPLE_FILM_DB.GENRES GENRES WHERE GENRES.ID = $1",
    [filmId]
  );
};

export const getFilmsByGenreId = (genreId: number) => {
  return db.query(
    `SELECT id, name, year
    FROM SIMPLE_FILM_DB.FILMS FILMS
    INNER JOIN SIMPLE_FILM_DB.FILM_GENRE F_G ON FILMS.ID = F_G.FILM_ID
    WHERE F_G.GENRE_ID = $1`,
    [genreId]
  );
};

export const addNewFilm = (name: string, year: number) => {
  return db.query(
    `INSERT INTO SIMPLE_FILM_DB.FILMS (name, year)
    VALUES($1, $2) RETURNING *`,
    [name, year]
  );
};

export const updateFilm = (name: string, year: number, id: number) => {
  return db.query(
    `UPDATE SIMPLE_FILM_DB.FILMS
    SET name = $1, year = $2 
    WHERE id = $3 RETURNING *`,
    [name, year, id]
  );
};

export const deleteFilm = (id: number) => {
  return db.query(
    `DELETE FROM SIMPLE_FILM_DB.FILMS
    WHERE id = $1 RETURNING *`,
    [id]
  );
};
