require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/weatherResolvers');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173', 
}));

const schema = makeExecutableSchema({ typeDefs, resolvers });
console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
