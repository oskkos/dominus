CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE event_log
(
    id SERIAL PRIMARY KEY,
    target_model TEXT NOT NULL,
    target_id INTEGER NOT NULL,
    event TEXT NOT NULL,
    data JSON NOT NULL,
    event_user TEXT NOT NULL DEFAULT current_setting('dominus.username'),
    event_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles
(
    id SERIAL PRIMARY KEY,
    role TEXT UNIQUE
);
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role INTEGER REFERENCES roles (id)
);

CREATE OR REPLACE FUNCTION add_role(role_name text) RETURNS INTEGER
    LANGUAGE plpgsql
AS
$$
DECLARE
    new_id INTEGER;
BEGIN
    INSERT INTO roles (role) VALUES (role_name) RETURNING id INTO new_id;
    INSERT INTO event_log (target_model, target_id, event, data) VALUES('roles', new_id, 'roleAdded', json_build_object('role_name', role_name));
    RETURN new_id;
END;
$$;

CREATE OR REPLACE FUNCTION add_user(username text, password text, role integer) RETURNS INTEGER
    LANGUAGE plpgsql
AS
$$
DECLARE
    new_id INTEGER;
BEGIN
    INSERT INTO users (username, password, role) VALUES (username, crypt(password, gen_salt('bf')), role) RETURNING id INTO new_id;
    INSERT INTO event_log (target_model, target_id, event, data) VALUES('users', new_id, 'userAdded', json_build_object(
        'username', username,
        'password', '*****',
        'role', role));
    RETURN new_id;
END;
$$;

SET dominus.username = 'migration_runner';

SELECT add_role('user');
SELECT add_role('admin');
SELECT add_user('user', 'user', (SELECT id FROM roles WHERE role = 'user'));
SELECT add_user('admin', 'admin',  (SELECT id FROM roles WHERE role = 'admin'));
