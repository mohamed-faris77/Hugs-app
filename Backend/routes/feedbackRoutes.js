import express from 'express';
import { submitFeedback, getFeedback, getFeedbackStatistics, testFeedbackAPI } from '../controllers/feedbackController.js';

const router = express.Router();

// Feedback routes
router.post('/feedback', submitFeedback);
router.get('/feedback', getFeedback);
router.get('/feedback/stats', getFeedbackStatistics);
router.get('/test-feedback', testFeedbackAPI);

export default router;
