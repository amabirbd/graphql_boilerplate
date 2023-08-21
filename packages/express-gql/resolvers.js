const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { PrismaClient } = require("@prisma/client");
require("dotenv").config(); // Load environment variables from .env file
const prisma = require("./lib/prisma");
// const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY;

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      console.log(context);
      if (!context.user) {
        throw new Error("Authentication required");
      }
      // Retrieve user data based on the user ID
      let user;
      try {
        user = await prisma.user.findUnique({
          where: {
            id: context.user,
          },
        });
        console.log("user: ", user);
        return user;
      } catch (error) {
        throw new Error("Failed to retrieve user data");
      }
    },
  },
  Mutation: {
    signup: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      return user;
    },
    signin: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: "4h",
      });
      return token;
    },
  },
};

module.exports = resolvers;
