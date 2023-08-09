-- migrate:up
CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT,
  user_account VARCHAR(200) NOT NULL,
  photo_url VARCHAR(200) NOT NULL,
  content VARCHAR(200) NOT NULL,
  tag VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down

