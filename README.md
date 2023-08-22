# Graphql Boilerplate

## Install packages

`yarn install`

add `.env`

## change the DATABASE_URL

Replace database string `"postgresql://<USER>:<PASSWORD>@localhost:5432/<DATABASE_NAME>"` with your postgresql database string.

## Run prisma db push and prisma generate with this command in express-gql

`npm run prepare:db`

## Run the project

`npx lerna run dev`
