const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// Create ticket
// POST /api/tickets
router.post("/", async (req, res) => {
    try {
        const { eventName, customerName, customerEmail, quantity, price } = req.body;

        if (!eventName || !customerName || !customerEmail || !quantity || price === undefined) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const ticket = await Ticket.create({
            eventName,
            customerName,
            customerEmail,
            quantity,
            price
        });

        return res.status(201).json(ticket);
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Delete ticket by id
// DELETE /api/tickets/:id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Ticket.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Ticket not found." });

        return res.json({ message: "Ticket deleted successfully.", id });
    } catch (err) {
        return res.status(400).json({ message: "Invalid ticket id.", error: err.message });
    }
});

module.exports = router;
