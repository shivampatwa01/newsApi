const express = require("express");
const { getAllBlogs, postBlog, updateBlog, getById, deleteBlog, getByUserId } = require("../controllers/blog-controller");
const router = express.Router();

router.get("/", getAllBlogs);
router.post("/post", postBlog);
router.put("/update/:id", updateBlog);
router.get("/:id", getById);
router.delete("/:id", deleteBlog);
router.get("/user/:id", getByUserId);

module.exports = router; 
