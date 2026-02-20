import Contact from "../models/Contact.js";

// Create Contact (Submit Form)
export const createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ success: true, message: "Message sent successfully", data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Contacts (Admin only)
export const getAllContacts = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};
        if (status) filter.status = status;

        const contacts = await Contact.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Contact
export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Contact Status
export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
        res.status(200).json({ success: true, message: "Contact updated", data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Contact
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
        res.status(200).json({ success: true, message: "Contact deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
