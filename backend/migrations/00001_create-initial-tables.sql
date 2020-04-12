CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE event_log
(
    id SERIAL PRIMARY KEY,
    target_model TEXT NOT NULL,
    target_id INTEGER NOT NULL,
    event TEXT NOT NULL,
    data JSON NOT NULL,
    event_user TEXT NOT NULL DEFAULT CURRENT_USER,
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

SELECT add_role('user');
SELECT add_role('admin');
