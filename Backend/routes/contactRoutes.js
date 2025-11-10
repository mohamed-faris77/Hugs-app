import express from 'express';
import { submitContactForm, getContacts } from '../controllers/contactController.js';

const router = express.Router();

// List contact submissions
router.get('/', getContacts);

// Save contact form submission
router.post("/", submitContactForm);

export default router;
