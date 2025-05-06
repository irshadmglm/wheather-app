const { gql } = require('graphql-tag');

module.exports = gql`
  type Weather {
    id: ID!
    city: String!
    temperature: Float!
    description: String!
    icon: String!
    timestamp: String!
  }

  type Query {
    getWeatherHistory(city: String!, from: String!, to: String!): [Weather]
  }

  type Mutation {
    fetchWeather(city: String!): Weather
    fetchAndStoreWeather(city: String!): Weather
  }
`;
