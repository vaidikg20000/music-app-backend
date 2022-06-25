CREATE database musicApp;
-- to list all databases : \l
-- to connect to database : \c musicapp

CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "full_name" varchar NOT NULL,
  "created_at" timestamp ,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL
);

CREATE TABLE "songs" (
  "song_id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "image" varchar ,
  "date_of_release" date NOT NULL
);

CREATE TABLE "artists" (
  "artist_id" SERIAL PRIMARY KEY,
  "artist_name" varchar NOT NULL,
  "dob" date NOT NULL,
  "bio" varchar NOT NULL
);

CREATE TABLE "song_artists" (
  "id" SERIAL PRIMARY KEY,
  "song_id" int NOT NULL,
  "artist_id" int NOT NULL
);

CREATE TABLE "songs_by_user" (
  "user_id" int,
  "song_id" int,
  "ratings" int
);

ALTER TABLE "song_artists" ADD FOREIGN KEY ("song_id") REFERENCES "songs" ("song_id");

ALTER TABLE "song_artists" ADD FOREIGN KEY ("artist_id") REFERENCES "artists" ("artist_id");

ALTER TABLE "songs_by_user" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "songs_by_user" ADD FOREIGN KEY ("song_id") REFERENCES "songs" ("song_id");

ALTER TABLE "users" ALTER  "created_at" SET DEFAULT now();