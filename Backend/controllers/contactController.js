import { createContact, getAllContacts } from '../models/contactModel.js';

export const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const contact = await createContact(name, email, subject, message);
    res.status(201).json({ message: "Contact form submitted successfully", contact });
  } catch (error) {
    console.error("Contact form submission error:", error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    // Keep response shape consistent with frontend expectations (data.contact)
    res.json({ contact: contacts });
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};
