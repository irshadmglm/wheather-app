# 🌦 Weather App Backend (Node.js + GraphQL + MongoDB)

A backend service for a mobile-friendly weather application. It fetches current weather data using the OpenWeatherMap API, stores historical data in a MongoDB database, and allows filtering weather history by city and date range.

---

## 🧑‍💻 Tech Stack

- **Node.js** – Backend runtime
- **Express.js** – Web server
- **GraphQL** – API layer for flexible querying
- **express-graphql** – Middleware to integrate GraphQL with Express
- **MongoDB** – Database to store weather history
- **Mongoose** – ODM for MongoDB
- **Axios** – HTTP client to fetch weather from external API
- **dotenv** – For managing environment variables

---

## ⚙️ Features

- Fetch current weather for a predefined list of cities
- Save every weather fetch to MongoDB
- Query historical weather data
- Filter by:
  - City (Delhi, Moscow, Paris, New York, Sydney, Riyadh)
  - Date range (max: 30 days)
- GraphQL Playground enabled via `/graphql` endpoint

---

## 🔑 Requirements

- Node.js and npm installed
- MongoDB installed and running
- A free [OpenWeatherMap API key](https://openweathermap.org/api)

---

## 📁 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-app-backend.git
cd weather-app-backend
