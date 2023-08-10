-- migrate:up
ALTER TABLE users RENAME COLUMN password To crypted_password;

-- migrate:down

