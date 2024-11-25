import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let blogPosts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { blogs : blogPosts });
  });

  app.get("/create", (req, res) => {
    res.render("create.ejs");
  });

  app.post("/submit", (req, res) => {
    let newTitle = req.body.title;
    let newBody = req.body.body;
    let newId = blogPosts.length;
    let newTopics = 0;
    let now = new Date();
    let newDate = now.toISOString().split('T')[0];
    let newTime = now.toTimeString().split(' ')[0];
    blogPosts.push({id: newId, title: newTitle, body: newBody, topics: newTopics, date: newDate, time: newTime});
    res.redirect("/");
  });

  app.delete("/posts/:id", (req, res) => {
    let post = req.params.id;
    let index = 0;
    let found = 0;
    blogPosts.forEach(function(blog) {
        if (blog.id == post) {
            found = index;
        }
        index++;
    });
    blogPosts.splice(found, 1);
    console.log(blogPosts)
    res.sendStatus(200);

  });
    app.get("/posts/:id", (req, res) => {
        let index = 0;
        let found = 0;
        blogPosts.forEach(function(blog) {
        if (blog.id == req.params.id) {
            found = index;
        }
        index++;
    });
        res.render("post.ejs", { blog: blogPosts[found]});
    });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });