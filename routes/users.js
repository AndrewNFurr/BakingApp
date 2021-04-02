const usersRouter = require('express').Router();

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
    getUsers,
    createUser,
    getUserById,
    getUserByUsername
  } = require("../db/index");

  const { requireUser, isActiveUser } = require("./utils");
//const { usersSlice } = require('../src/features/users/usersSlice');

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await getUsers();
        console.log(users)
        res.send(users);
    } catch (error) {
        next(error);
    }
});

usersRouter.post('/login', async(req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body)
    try {
        const user = await getUserByUsername(username);
        console.log(user);
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign({
                    id: user.id,
                    username
                }, secret);

                delete user.password;

                res.send({
                    user,
                    token,
                    message: `Thank for logging in ${user.firstName}`
                });
            } else {
                next({
                  name: "UserLoginError",
                  message: "Wrong username/password combination. Try again",
                });
              }
            } else {
              next({
                name: "UserLoginError",
                message: "Username not recognized. Try again",
              });
            }
    } catch(error) {
        next(error)
    }
});

usersRouter.post("/register", async (req, res, next) => {
    const {
        firstName,
        lastName,
        username,
        password,
        email,
        creditScore,
        type,
        isAdmin
    } = req.body;
    const userData = {
      firstName,
      lastName,
      username,
      password,
      email,
      creditScore,
      type,
      isAdmin
    };
  
    const passwordCheck = userData.password;
  
    if (passwordCheck.length < 8) {
      res.send({
        name: "password error",
        message: "password must be at least 8 characters long",
      });
    }
  
    try {
      const newUser = await createUser(userData);
  
      if (newUser.detail) {
        if (newUser.detail.includes("email")) {
          res.send({
            name: "emailError",
            message: "email is already in use. Try again",
          });
        } else if (newUser.detail.includes("username")) {
          res.send({
            name: "usernameError",
            message: "username already exists. Try another.",
          });
        }
      } else {
        const token = jwt.sign(
          {
            id: newUser.id,
            username: newUser.username,
          }, 
          process.env.JWT_SECRET);
  
        delete newUser.password;
        res.send({
          message: "thank you for signing up",
          token,
          user: newUser,
        });
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = usersRouter;