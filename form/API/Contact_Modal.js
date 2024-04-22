import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    gmail: {
        type: String,
        required: false,
    },
    phone: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        required: false,
    },
});

export const Contact = mongoose.model("Contact", contactSchema);

