const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Cloud Deployment Platform API",
        status: "running"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        service: "backend",
        uptime: process.uptime()
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});