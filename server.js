const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');


const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // 🔥 This allows your React frontend to call the backend
app.use(express.json()); // For parsing JSON


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connection established");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

app.use("/employees", employeeRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
