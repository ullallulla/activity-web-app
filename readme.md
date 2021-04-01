## Activity web app project for Aalto University's Web Development Project course

## Usage

Use this link

### https://wsd-website-project.herokuapp.com/

Or use locally

Database configuration
------------------------

Head to folder "config" and open "config.js".
Create .env file to the root of the project and enter your database variables

```
PGHOST=your-host
PGDATABASE=your-db
PGUSER=your-user
PGPASSWORD=your-password
PGPORT=your-port
```



Creating tables POSTGRESQL
---------------
```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);
```
```
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
```


Running the app
----------------
```
run deno with  --allow-read --allow-net --allow-env --unstable app.js
```