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

// 2. Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  try {
    if (!req.userId) return next();
    const user = await db.query.user(
      { where: { id: req.userId } },
      '{ id, permission, email, name }'
    );
    req.user = user;
    next();
  } catch (e) {
    next();
  }
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
