const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API running'
    });
});

module.exports = app;