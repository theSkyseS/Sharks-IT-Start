import db = require("..");

export const getGenres = () => {
  return db.query("SELECT * FROM SIMPLE_FILM_DB.GENRES", []);
};

export const getGenreById = (genreId: number) => {
  return db.query(
    "SELECT * FROM SIMPLE_FILM_DB.GENRES GENRES WHERE GENRES.ID = $1",
    [genreId]
  );
};

export const getGenresByFilmId = (filmId: number) => {
  return db.query(
    `SELECT id, name
    FROM SIMPLE_FILM_DB.GENRES GENRES
    INNER JOIN SIMPLE_FILM_DB.FILM_GENRE F_G ON GENRES.ID = F_G.GENRE_ID
    WHERE F_G.FILM_ID = $1`,
    [filmId]
  );
};

export const addNewGenre = (name: string) => {
  return db.query(
    `INSERT INTO SIMPLE_FILM_DB.GENRES (name)
    VALUES($1) RETURNING *`,
    [name]
  );
};

export const updateGenre = (name: string, id: number) => {
  return db.query(
    `UPDATE SIMPLE_FILM_DB.GENRES
    SET name = $1 
    WHERE id = $2 RETURNING *`,
    [name, id]
  );
};

export const deleteGenre = (id: number) => {
  return db.query(
    `DELETE FROM SIMPLE_FILM_DB.GENRES
    WHERE id = $1 RETURNING *`,
    [id]
  );
};
