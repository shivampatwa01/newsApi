const express = require("express");
var cors = require('cors')

const app = express();

require("dotenv").config()
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cors());

//import routes for todo API
const userRoutes = require("./routes/user-routes");
const newsRoutes = require("./routes/news-routes");
//mount the todo API routes
app.use("/api/user", userRoutes);
app.use("/api/news", newsRoutes);

app.use("/", (req, res, next) => {
      res.send("welcome to news API
               Endpoints:

News Data: Access news articles using the endpoint /api/news.
User Data: Manage user-related information with the endpoint /api/user.
Authentication:

The API implements JWT (JSON Web Token) authentication, ensuring secure login and signup processes for users.
Data Models:

Comprehensive data models are in place for both news articles and user accounts, ensuring data integrity and efficient management.
CRUD Operations:

Authenticated users have the ability to perform CRUD (Create, Read, Update, Delete) operations on news articles, enabling dynamic content management.
Security Features:

User authentication is handled securely, safeguarding sensitive information and maintaining a high level of user privacy.
User-Friendly:

The API is designed to be intuitive and easy to use, making it accessible for developers looking to integrate news functionalities into their applications.");
})

app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});


//connect to  the database
const dbConnect = require("./database");
const router = require("./routes/user-routes");
dbConnect();
