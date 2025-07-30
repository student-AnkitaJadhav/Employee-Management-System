const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authenticateToken = require('./middleware/authMiddleware');
const path = require("path");


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/auth",require("./routes/authRoutes.js"));
app.use('/api/demo', authenticateToken, require("./routes/demoRoutes"))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(" MongoDB connection error:", err);
});

app.listen(5000,()=>{
    console.log("Server listening at port 5000");
});