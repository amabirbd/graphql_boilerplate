# Graphql Boilerplate

## Install packages

`yarn install`

add `.env`

## change the DATABASE_URL

Replace database string `"postgresql://<USER>:<PASSWORD>@localhost:5432/<DATABASE_NAME>"` with your postgresql database string.

## Prisma setup

Run prisma db push and prisma generate with this command inside express-gql
`npm run prepare:db`

## Run the project

`npx lerna run dev`

Server should be running on port 4000

And you can access the graphiql visual editor at [http://localhost:4000/graphql](http://localhost:4000/graphql)
