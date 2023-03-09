CREATE TYPE "rating" AS ENUM (
  'G',
  'PG',
  'PG-13',
  'R',
  'NC-17'
);

CREATE TYPE "role" AS ENUM (
  'Actor',
  'VoiceActor'
);

CREATE TABLE "person" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "genre" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar(30)
);

CREATE TABLE "viewers" (
  "film_id" integer,
  "country_id" integer,
  "view_count" integer NOT NULL,
  PRIMARY KEY ("film_id", "country_id")
);

CREATE TABLE "country" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar(30)
);

CREATE TABLE "cast" (
  "film_id" integer,
  "person_id" integer,
  "role" role NOT NULL,
  PRIMARY KEY ("film_id", "person_id")
);

CREATE TABLE "box_office" (
  "film_id" integer PRIMARY KEY,
  "budget" money,
  "marketing" money,
  "money_made_in_usa" money,
  "money_made_in_world" money
);

CREATE TABLE "film" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL,
  "slogan" text,
  "year" integer,
  "director_id" integer,
  "screenwriter_id" integer,
  "composer_id" integer,
  "artist_id" integer,
  "editor_id" integer,
  "cameraman_id" integer,
  "premiere_date" Date,
  "premiere_date_ru" Date,
  "dvd_release_date" Date,
  "age_restriction" integer,
  "mpaa_rating" rating,
  "length" interval
);

CREATE INDEX "person_name_index" ON "person" ("name");

CREATE INDEX "film_name_index" ON "film" ("name");

ALTER TABLE "cast" ADD FOREIGN KEY ("film_id") REFERENCES "film" ("id");

ALTER TABLE "cast" ADD FOREIGN KEY ("person_id") REFERENCES "person" ("id");

ALTER TABLE "box_office" ADD FOREIGN KEY ("film_id") REFERENCES "film" ("id");

ALTER TABLE "viewers" ADD FOREIGN KEY ("film_id") REFERENCES "film" ("id");

CREATE TABLE "film_genre" (
  "film_id" integer,
  "genre_id" integer,
  PRIMARY KEY ("film_id", "genre_id")
);

ALTER TABLE "film_genre" ADD FOREIGN KEY ("film_id") REFERENCES "film" ("id");

ALTER TABLE "film_genre" ADD FOREIGN KEY ("genre_id") REFERENCES "genre" ("id");


ALTER TABLE "film" ADD FOREIGN KEY ("director_id") REFERENCES "person" ("id");

ALTER TABLE "film" ADD FOREIGN KEY ("screenwriter_id") REFERENCES "person" ("id");

ALTER TABLE "film" ADD FOREIGN KEY ("composer_id") REFERENCES "person" ("id");

ALTER TABLE "film" ADD FOREIGN KEY ("artist_id") REFERENCES "person" ("id");

ALTER TABLE "film" ADD FOREIGN KEY ("editor_id") REFERENCES "person" ("id");

ALTER TABLE "film" ADD FOREIGN KEY ("cameraman_id") REFERENCES "person" ("id");

ALTER TABLE "viewers" ADD FOREIGN KEY ("country_id") REFERENCES "country" ("id");
