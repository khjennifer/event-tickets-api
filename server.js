require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ticketsRouter = require("./routes/tickets");

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => res.json({ ok: true, service: "event-tickets-api updated" }));

// Routes
app.use("/api/tickets", ticketsRouter);

const PORT = process.env.PORT || 4000;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });
