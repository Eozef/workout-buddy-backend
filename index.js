require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

//express app
const app = express();

//middleware

//once the request comes in, it will check the if it has some body to the request, then pass in json()
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.static("public"));

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to DB
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connect to DB and listeneing on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
