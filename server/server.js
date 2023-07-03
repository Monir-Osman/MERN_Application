require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

//express app
const app = express();

//Middlewares
app.use(express.json()); //let the server to access coming data from client

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

//Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("something went wrong", err);
  });
