const cookierParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO use express middlware to handle cookies (JWT)
server.express.use(cookierParser());
// TODO use express middleware to populate current users

server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        req.userId = userId;
    }
    next();
});

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
