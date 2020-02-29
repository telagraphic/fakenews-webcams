CREATE TABLE IF NOT EXISTS stories (
  id SERIAL PRIMARY KEY NOT NULL,
  headline TEXT NOT NULL,
  img TEXT NULL,
  href TEXT NOT NULL,
  source VARCHAR(256) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT now()
);


-- heroku pg:psql --app fakenew-webcams

-- run sql script
-- psql -h ec2-3-234-169-147.compute-1.amazonaws.com -p 5432 -d d44ka3h9ke3271 -U qdwfsgaufmeyyo -f server/models/stories.sql sslmode=disable;
