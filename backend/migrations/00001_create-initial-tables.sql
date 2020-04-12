CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE event_log
(
    id SERIAL PRIMARY KEY,
    target_uuid UUID NOT NULL,
    event TEXT NOT NULL,
    data JSON NOT NULL,
    event_user TEXT NOT NULL DEFAULT CURRENT_USER,
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles
(
    id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT uuid_generate_v1mc(),
    role TEXT UNIQUE
);
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT uuid_generate_v1mc(),
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role INTEGER REFERENCES roles (id)
);

CREATE FUNCTION add_role(role_name text) RETURNS INTEGER
    LANGUAGE plpgsql
AS
$$
DECLARE
    new_id INTEGER;
    new_uuid UUID;
BEGIN
    INSERT INTO roles (role) VALUES (role_name) RETURNING id, uuid INTO new_id, new_uuid;
    INSERT INTO event_log (target_uuid, event, data) VALUES(new_uuid, 'roleAdded', json_build_object('role_name', role_name));
    RETURN new_id;
END;
$$;

SELECT add_role('user');
SELECT add_role('admin');
