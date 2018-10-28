# Kelson's TriviaTime Demo

This is a quick microservices based configuration for a simple demo app

- Frontend built with Create-react-app

  - Redux
  - Material UI

- Backend Runs on a seperate express/node.js server

# File structure!

- Everything for the frontend is in the root `/triviatime` folder
- Everything for the backend is in the `/triviatime/server` folder

Also:

- This app is built using a MongoDB database hosted on Mlab, so there is no need to seed a local db

# Setup

The directions must be followed in order to get up and running.

### After cloning or forking this app:

run these commands to install dependencies for the client and server

```sh
$ cd triviatime
$ npm run setup
$ npm start
```

| BROWSER ROUTES                 |
| ------------------------------ |
| http://localhost:3000          |
| http://localhost:3000/signin   |
| http://localhost:3000/question |
| http://localhost:3000/history  |

- The server will start on port 3000, but you can change this if you would like. The backend must be running on port 5000 however.

### API Endpoints

These are the endpoints that the react app is making requests for gathering and sending the data and storing the User and their responses in mongo

| PURPOSE                               | LOCATION                              |
| ------------------------------------- | ------------------------------------- |
| POST /users/account - Signup user     | http://localhost:5000/users/account   |
| GET /users/:username - Get user       | http://localhost:5000/users/:username |
| POST /questions - Save question to DB | http://localhost:5000/questions       |

### Development / Would-like-to-dos

- Built a full featured material ui, with avatar etc

- Add more RESTful CRUD api endpoints

- Build out GET/PATCH/DELETE for each answer

- There is always testing to be do ( ALWAYS, which is such a fun thing to do right? )

### Questions?

Please reach out, I would love to answer questions or help you get the app running.

- kelson@null.net

- 510-229-7968
