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

CREATE TABLE "Songs" (
  "song_id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "image" varchar ,
  "date_of_release" timestamp NOT NULL
);

CREATE TABLE "Artists" (
  "artist_id" SERIAL PRIMARY KEY,
  "artist_name" varchar NOT NULL,
  "dob" timestamp NOT NULL,
  "bio" varchar NOT NULL
);

CREATE TABLE "Song_Artists" (
  "id" SERIAL PRIMARY KEY,
  "song_id" int NOT NULL,
  "artist_id" int NOT NULL
);

CREATE TABLE "Songs_by_User" (
  "user_id" int,
  "song_id" int,
  "ratings" int
);

ALTER TABLE "Song_Artists" ADD FOREIGN KEY ("song_id") REFERENCES "Songs" ("song_id");

ALTER TABLE "Song_Artists" ADD FOREIGN KEY ("artist_id") REFERENCES "Artists" ("artist_id");

ALTER TABLE "Songs_by_User" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "Songs_by_User" ADD FOREIGN KEY ("song_id") REFERENCES "Songs" ("song_id");
