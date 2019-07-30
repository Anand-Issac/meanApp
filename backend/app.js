const express = require('express');

const app = express();

const port = '3000';
app.set('port', port);

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "abcd",
      title: "First server post",
      content: "On my way from server"
    },
    {
      id: "efgh",
      title: "Second server post",
      content: "On my way from server again"
    }
  ];
  res.status(200).json({
    message: "Posts retrieved successfully!",
    posts: posts
  });
});


module.exports = app;
