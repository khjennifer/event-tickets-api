const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
    {
        eventName: { type: String, required: true, trim: true },
        customerName: { type: String, required: true, trim: true },
        customerEmail: { type: String, required: true, trim: true, lowercase: true },
        quantity: { type: Number, required: true, min: 1, max: 20 },
        price: { type: Number, required: true, min: 0 },
        status: { type: String, enum: ["active", "cancelled"], default: "active" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
