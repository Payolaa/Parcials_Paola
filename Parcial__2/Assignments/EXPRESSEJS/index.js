const express = require("express");
const app = express();
const https = require("https");
const path = require('path');

app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');
app.use(express.static("public"));


let posts = [];
let team = "";

// GET
app.get("/login", (req,res) =>{
  const name = req.query.name;
  if(name){
    team = name;
    res.render('server', {name: team, method : 'GET'});
  }else{
    res.send('ERROR');
  }
});

// POST
app.post("/login", (req,res) =>{
  const name = req.body.name;
  if(name){
    team = name;
    res.render('server', {name: team, method : 'POST'});
  }else{
    res.send('ERROR');
  }
});

//create log in space
app.post('/add-post', (req,res) => { 
  const {title, content} = req.body;
  const NPost = {id:posts.length + 1, title, content};
  posts.push(NPost);
  res.render('home', {name : team, posts : posts});
});


//post team
app.post('/blog', (req,res) => {
  const name = req.body.name;
  team = name;
  res.render('home', {name : team, posts : posts})
});

//

app.get('/post/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (post){
    res.render ('post', {post});
  } else{
    res.send('Post not found.');
  }
});

app.post('/delete-post/:id', (req,res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter(post=> post.id != postId);
  res.redirect('/blog');
});

app.get('/post', (req,res) => {
  res.render('post');
});

app.get('/blog', (req,res) => {
  res.render('post');
});


app.get('/blog', (req,res) => {
  res.render('home', {name: team, posts : posts })
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});

