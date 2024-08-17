const express = require("express");
const { getAllNewss, postNews, updateNews, getById, deleteNews, getByUserId } = require("../controllers/news-controller");
const router = express.Router();

router.get("/", getAllNewss);
router.post("/post", postNews);
router.put("/update/:id", updateNews);
router.get("/:id", getById);
router.delete("/:id", deleteNews);
router.get("/user/:id", getByUserId);

module.exports = router; 
