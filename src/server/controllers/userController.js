/* eslint-disable camelcase */
/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const db = require('../models/LetsGoModel');

const userController = {};
// set up middleware to see if email was already used to sign up:
userController.checkEmail = (req, res, next) => {
  const { email } = req.body;

  const query = `SELECT * FROM "public"."Users" WHERE email = '${email}'`;
  db.query(query)
    .then((data) => {
      if (data.rows.length > 0) {
        return next({
          log: 'error, email already exist',
          status: 500,
          message: { err: 'email already exist' },
        });
      }
      return next();
    });
};

// Create a userController as middleware to pass it userRouter:
userController.addUser = (req, res, next) => {
  // safety feature: VALUES ($1, $2, $3, $4, $5)
  // sanitizes i.e. saves from hackers...
  const query = `INSERT INTO "public"."Users" (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  // Deconstruct column names from req.body:
  const {
    firstName,
    lastName,
    email,
  } = req.body;
  const values = [
    firstName,
    lastName,
    email,
    res.locals.bcrypt, // this is the resulting hash after passing our password through bcrypt
  ];
  db.query(query, values)
    .then((data) => {
      res.locals.users = data.rows;
      return next();
    })
    .catch((err) => next({
      log: 'error in addUser controller',
      status: 500,
      message: { err },
    }));
};
// bcrypt middleware:
userController.bcrypt = (req, res, next) => {
  // deconstruct password from the req.body
  const { password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    // Store hash in database here
    if (err) {
      return next(err);
    }
    res.locals.bcrypt = hash;
    return next();
  });
};

// check if the inputted password matches the password used when the user signed up
userController.login = (req, res, next) => {
  const { email, password } = req.body;
  const inputtedPassword = password;

  const compare = () => bcrypt.compare(inputtedPassword, res.locals.hash, (err, result) => {
    if (result) {
      const query = `SELECT id, email, first_name FROM "public"."Users" WHERE email = '${email}';`;
      db.query(query)
        .then((data) => {
          res.locals.users = data.rows;
          res.locals.userId = data.rows[0].id;
          return next();
        })
        .catch((err) => next({
          log: 'error',
          status: 500,
          message: { err },
        }));
    } else return res.json('Email & password combination not found!');
  });
  // Retrieve the hash (original password) of the user's stored password from the database:
  const hash = `SELECT password FROM "public"."Users" WHERE email = '${email}';`;
  db.query(hash)
    .then((data) => {
      if (data.rows.length === 0) {
        res.status(400).json('Invalid: Email & password combination not found!');
      }
      res.locals.hash = data.rows[0].password;
      compare();
    });
};

module.exports = userController;
