const express = require("express");
const mongoose = require("mongoose");

const Task = require("./models/tasks.model");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get all tasks
app.get("/getTasks", async (req, res) => {
  try {
    const response = await Task.find();
    res.json(response);
  } catch (err) {
    res.json({ message: err });
  }
});

// post a task
app.post("/postTask", async (req, res) => {
  try {
    const response = await Task.create(req.body);
    res.json(response);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete a task
app.delete("/deleteTask/:id", async (req, res) => {
  try {
    const response = await Task.deleteOne({ _id: req.params.id });
    res.json(response);
  } catch (err) {
    res.json({ message: err });
  }
});

// edit a task
app.patch("/editTask/:id", async (req, res) => {
  try {
    const response = await Task.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(response);
  } catch (err) {
    res.json({ message: err });
  }
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log("Server stated on port 5000"));
  })
  .catch((err) => {
    console.log(err);
  });
