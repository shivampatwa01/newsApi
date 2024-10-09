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
      res.send(`
    <h1>Welcome to the News API</h1>
    <h2>Endpoints:</h2>
    <ul>
      <li><b>News Data:</b> Access news articles using the endpoint <code>/api/news</code>.</li>
      <ul>
        <li><b>GET /api/news</b> - Fetch all news articles</li>
        <li><b>POST /api/news/post</b> - Create a new news article</li>
        <li><b>PUT /api/news/update/:id</b> - Update an existing news article by ID</li>
        <li><b>GET /api/news/:id</b> - Get a specific news article by ID</li>
        <li><b>DELETE /api/news/:id</b> - Delete a specific news article by ID</li>
        <li><b>GET /api/news/user/:id</b> - Fetch news articles posted by a specific user</li>
      </ul>
      <li><b>User Data:</b> Manage user-related information with the endpoint <code>/api/user</code>.</li>
      <ul>
        <li><b>GET /api/user</b> - Fetch all users</li>
        <li><b>POST /api/user/signup</b> - Sign up a new user</li>
        <li><b>POST /api/user/login</b> - Log in an existing user</li>
      </ul>
    </ul>
    <h2>Authentication:</h2>
    <p>The API implements <b>JWT (JSON Web Token)</b> authentication, ensuring secure login and signup processes for users.</p>
    <h2>Data Models:</h2>
    <p>Comprehensive data models are in place for both news articles and user accounts, ensuring data integrity and efficient management.</p>
    <h2>CRUD Operations:</h2>
    <p>Authenticated users have the ability to perform <b>CRUD (Create, Read, Update, Delete)</b> operations on news articles, enabling dynamic content management.</p>
    <h2>Security Features:</h2>
    <p>User authentication is handled securely, safeguarding sensitive information and maintaining a high level of user privacy.</p>
    <h2>User-Friendly:</h2>
    <p>The API is designed to be intuitive and easy to use, making it accessible for developers looking to integrate news functionalities into their applications.</p>
  `);
})

app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});


//connect to  the database
const dbConnect = require("./database");
const router = require("./routes/user-routes");
dbConnect();
