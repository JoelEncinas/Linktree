const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.pug2uxj.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.listen(port, () => console.log(`Server started on port ${port}`));
