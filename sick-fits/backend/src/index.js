require('dotenv').config();
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO use express middlware to handle cookies (JWT)
// TODO use express middleware to populate current users

server.start(
    {
        cors: {
            credentials: true,
            origin: process.env.FRONTEND_URL
        },
        playground: '/playground'
    },
    data => {
        console.log(
            `Server is now running on port http://localhost:${
                data.port
            }\nPlayground is now running at http://localhost:${data.port}/playground`
        );
    }
);
