const path = require("path");
require("dotenv").config();
const express = require("express");
const logger = require("./middlware/logger");

const itemsRouter = require("./routes/itemsRouter");
const { appGet } = require("./controllers/appController");

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(logger); // log requests
app.use(express.urlencoded({ extended: true })); // parse URL-encoded data using qs library
app.use(express.static("public"));
app.use(express.json());

// Router
app.use("/items", itemsRouter);

// Routes
app.get("/", appGet);

// Hey! Listen!
app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Running on ${url}`);
});
