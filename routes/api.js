const express = require("express");
const router = express.Router();
const _ = require("lodash");
const url = "https://intent-kit-16.hasura.app/api/rest/blogs";

router.get("/blog-stats", async (req, res) => {
  try {
    // get data from url
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "x-hasura-admin-secret": req.header("x-hasura-admin-secret"),
        "x-hasura-admin-secret":"32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
      },
    })
      .then((data) => data.json())
      .catch((err) => res.send(err));
    const blogsData = response.blogs;

    // Calculate the total number of blogs fetched
    const totalBlogs = blogsData.length;

    // Find the blog with the longest title
    const longestTitleBlog = _.maxBy(blogsData, "title.length");

    // Determine the number of blogs with titles containing the word "privacy"
    const blogsWithPrivacy = _.filter(blogsData, (blog) =>
      _.includes(blog.title.toLowerCase(), "privacy")
    );

    // Create an array of unique blog titles (no duplicates)
    const uniqueBlogTitles = _.uniqBy(blogsData, "title").map(
      (blog) => blog.title
    );
    res.json({
      totalBlogs,
      longestTitleBlog,
      blogsWithPrivacy,
      uniqueBlogTitles,
    });
  } catch (err) {
    res.status(400).send("Internal Error Occured");
  }
});

router.get("/blog-search", async (req, res) => {
  try {
    const query = req.query.query; // Get the query parameter from the URL
    if (!query) {
      return res
        .status(400)
        .json({ error: "Query parameter 'query' is required." });
    }
    // get data from url
    const url = "https://intent-kit-16.hasura.app/api/rest/blogs";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "x-hasura-admin-secret": req.header("x-hasura-admin-secret"),
        "x-hasura-admin-secret":"32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
      },
    })
      .then((data) => data.json())
      .catch((err) => res.send(err));
    const blogsData = response.blogs;

    // Filter blogs based on the query string (case-insensitive)
    const filteredBlogs = blogsData.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
    res.json({ filteredBlogs });
  } catch (err) {
    res.status(400).send("Internal Error Occured");
  }
});

module.exports = router;
