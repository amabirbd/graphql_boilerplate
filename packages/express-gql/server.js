const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { importSchema } = require("graphql-import");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const typeDefs = importSchema("./schema.graphql");
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use((req, res, next) => {
  const authorizationHeader = req.headers.authorization || "";
  const token = authorizationHeader.replace("Bearer ", ""); // Extract the token value
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken.userId;
  } catch (error) {
    req.user = null;
  }
  next();
});

app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema,
    context: { user: req.user },
    graphiql: true,
  }))
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
