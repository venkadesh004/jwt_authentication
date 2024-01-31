const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

// View Engine
app.set("view engine", "ejs");

// Database Connection
mongoose
  .connect(process.env.DB_URL)
  .then((result) =>
    app.listen(process.env.PORT, () => {
      console.log("Listening in PORT: 3000");
    })
  )
  .catch((err) => console.log(err));

// Routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

// cookies

// app.get("/set-cookies", (req, res) => {
//   // res.setHeader('Set-Cookie', 'newUser=true');
//   res.cookie("newUser", false);
//   res.cookie("isEmployee", true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     httpOnly: true,
//   });
//   res.send("You got the cookies");
// });

// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies.newUser);

//   res.json(cookies);
// });
