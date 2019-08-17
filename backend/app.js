const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();

// creates connection to database (node-angular)
// mongoose.connect('mongodb+srv://anand:fgFT9REHn5oWPU40@cluster0-0mek3.mongodb.net/node-angular?retryWrites=true&w=majority').then(() => {
//   console.log("Connected to database!");
// })
// .catch(() => {
//   console.log("Connection failed!");
// });

mongoose
  .connect(
    "mongodb+srv://anand:fgFT9REHn5oWPU40@cluster0-0mek3.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//mongo password: fgFT9REHn5oWPU40
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
  
});

app.delete("/api/posts/:_id", (req, res, next) => {
  Post.deleteOne({_id: req.params._id}).then(result =>{
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
});

module.exports = app;
