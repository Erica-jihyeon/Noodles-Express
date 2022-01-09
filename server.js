// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const myPageRoutes = require("./routes/mypage");
const orderRoutes = require("./routes/order");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/mypage", myPageRoutes(db));
app.use("/order", orderRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const queryString1 = `SELECT thumbnail_url, item_name, price, description
  FROM menu_items
  LIMIT 6;
  `;
  const queryString2 = `
  SELECT DISTINCT ON (category) category, thumbnail_url
  FROM menu_items
  LIMIT 4;
  `;
  const userID = 1;

  const templateVars = {};
  templateVars.userID = userID;

  db.query(queryString1)
    .then((result) => {
      // console.log(result.rows);
      for (let i = 0; i < result.rows.length; i++) {
        templateVars[`menu${i+1}`]=result.rows[i];
      }
      return db.query(queryString2)
    })
    .then((result) => {
      for (let i = 0; i < result.rows.length; i++) {
        templateVars[`category${i+1}`]=result.rows[i];
      }
      // console.log(templateVars);
      res.render('index', templateVars);
    })
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
