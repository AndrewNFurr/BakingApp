const apiRouter = require("express").Router();

const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  

  next();
});

const usersRouter = require("./users");
const cardsRouter = require("./cards");
// const billsRouter = require("./bills");
const accountsRouter = require("./accounts");
apiRouter.use("/users", usersRouter);
apiRouter.use("/cards", cardsRouter);
// apiRouter.use("/bills", billsRouter);
apiRouter.use("/accounts", accountsRouter);

apiRouter.use((error, req, res, next) => {
  console.error(error);
  res.send(error);
});

module.exports = apiRouter;