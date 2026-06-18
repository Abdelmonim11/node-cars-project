# Cars API

A RESTful API built with Node.js, Express, MongoDB, and JWT authentication.

## Features

* User registration and login
* Password hashing
* JWT authentication
* Protected routes
* Role-based authorization
* CRUD operations for cars
* Request validation
* Pagination
* MongoDB database integration

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt
* dotenv

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| POST   | /users/register | Register a new user   |
| POST   | /users/login    | Login and receive JWT |

### Users

| Method | Endpoint   | Description         |
| ------ | ---------- | ------------------- |
| GET    | /users     | Get all users       |

### Cars

| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| GET    | /cars     | Get all cars       |
| GET    | /cars/:id | Get a specific car |
| POST   | /cars     | Create a new car   |
| PATCH  | /cars/:id | Update a car       |
| DELETE | /cars/:id | Delete a car       |


## Authentication

Protected routes require a JWT token:

```http
Authorization: Bearer <token>
```

## Project Structure

```text
project/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env
├── index.js
└── package.json
```

## Future Improvements

* React frontend
* API documentation with Swagger
* Unit and integration testing
* Docker support
