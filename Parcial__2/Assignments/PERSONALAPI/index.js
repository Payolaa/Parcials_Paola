const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));

const names = [];
const tasks = [];

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/greet", (req, res) => {
    const name = req.query.name;
    if (name) names.push(name);
    res.redirect("/");
});

app.get("/names", (req, res) => {
    res.json(names);
});

app.get("/wazzup/:name", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "wazzup.html"));
});

app.post("/task", (req, res) => {
    tasks.push(req.body.task);
    res.redirect("/");
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/task/delete/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < tasks.length) tasks.splice(index, 1);
    res.redirect("/");
});

app.get("/task/up/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index > 0) [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
    res.redirect("/");
});

app.get("/task/down/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index < tasks.length - 1) [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
    res.redirect("/");
});

app.listen(9000, () => console.log("Server running on port 9000"));

  
  