CREATE database musicApp;
-- to list all databases : \l
-- to connect to database : \c musicapp

CREATE TABLE "Users" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar NOT NULL,
  "created_at" timestamp NOT NULL,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL
);

CREATE TABLE "Songs" (
  "song_id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "image" varchar,
  "date_of_release" timestamp NOT NULL
);

CREATE TABLE "Artists" (
  "artist_id" SERIAL PRIMARY KEY,
  "artist_name" varchar NOT NULL,
  "dob" timestamp NOT NULL,
  "bio" varchar
);

CREATE TABLE "Song_Artists" (
  "song_id" int NOT NULL,
   PRIMARY KEY("song_id", "artist_id"),
  "artist_id" int NOT NULL
);

ALTER TABLE "Song_Artists" ADD FOREIGN KEY ("song_id") REFERENCES "Songs" ("song_id");

ALTER TABLE "Song_Artists" ADD FOREIGN KEY ("artist_id") REFERENCES "Artists" ("artist_id");
