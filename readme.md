# Activity web app project for Aalto University's Web Development Project course

## https://wsd-website-project.herokuapp.com/



Database configuration
------------------------

Head to file "config" and open "config.js".
Setup your hostname, database, user, password and port for your ElephantSQL.


Creating tables
---------------

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  reported_on TIMESTAMP WITH TIME ZONE,
  sleep_duration DECIMAL,
  sleep_quality INTEGER,
  exercise_duration DECIMAL,
  study_duration DECIMAL,
  eating_habits INTEGER,
  mood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id)
);



Running the app
----------------
run deno with  --allow-read --allow-net --allow-env --unstable app.js