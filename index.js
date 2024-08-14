const express = require("express");
var cors = require('cors')

const app = express();

require("dotenv").config()
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cors());

//import routes for todo API
const userRoutes = require("./routes/user-routes");
const blogRoutes = require("./routes/blog-routes");
//mount the todo API routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

app.use("/api", (req, res, next) => {
      res.send("wrong api");
})

app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});


//connect to  the database
const dbConnect = require("./database");
const router = require("./routes/user-routes");
dbConnect();
