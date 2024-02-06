const express = require("express");
const connectDB = require("./database/connection");
const userRoute = require("./routes/userRoutes");
const bookRoute = require("./routes/bookRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000; // Choose a port number

app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!"); // Test route
});

// mongodbConnect
connectDB();

// User route
app.use("/users", userRoute);
app.use("/books", bookRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
