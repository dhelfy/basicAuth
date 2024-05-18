# Project documentation

This is a simple website that provides basic authentication and registration.
Server built on Node.js using Express. For database i used PostgreSQL.

On server i used these packages:
* body-parser
* basic-auth
* pg

# Deploy
To deploy this website on your computer you must have installed PostgreSQL and Node.js on your PC. When you're ready clone this repository to your PC:

```
git clone https://github.com/dhelfy/basicAuth.git
```

Then you must set the database with table that contains users. First lets create DB, open SQL Shell and run this code:
```SQL
CREATE DATABASE "basicAuth"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```
Now connect to created DB with this command:
```SQL
\c basicAuth
```

And the last step, create a table for users:
```SQL
CREATE TABLE "UsersTable"
(
    username text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    CONSTRAINT "UsersTable_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;
```

Now you are ready. Run a server with the website, open cmd, go to the directory with website and type this command:

```
npm start
```