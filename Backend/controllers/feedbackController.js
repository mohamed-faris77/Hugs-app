import { createFeedback, getAllFeedback, getFeedbackStats } from '../models/feedbackModel.js';

export const submitFeedback = async (req, res) => {
  const feedbackData = req.body;

  try {
    const feedback = await createFeedback(feedbackData);
    res.json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedback = await getAllFeedback();
    res.json({ feedback });
  } catch (error) {
    console.error("Fetch feedback error:", error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

export const getFeedbackStatistics = async (req, res) => {
  try {
    const stats = await getFeedbackStats();
    res.json(stats);
  } catch (error) {
    console.error("Feedback stats error:", error);
    res.status(500).json({ error: "Failed to fetch feedback statistics" });
  }
};

export const testFeedbackAPI = async (req, res) => {
  console.log("Testing Feedback API Endpoints...");

  const testFeedback = {
    name: "Test User",
    phone: "+1234567890",
    message: "This is a test feedback message.",
    rating: "happy"
  };

  try {
    // Test 1: Insert test feedback
    console.log("Testing feedback insertion...");
    const insertResult = await createFeedback(testFeedback);
    console.log("Test feedback inserted:", insertResult);

    // Test 2: Fetch all feedback
    console.log("Testing feedback retrieval...");
    const fetchResult = await getAllFeedback();
    console.log(`Retrieved ${fetchResult.length} feedback entries`);

    // Test 3: Get feedback statistics
    console.log("Testing feedback statistics...");
    const stats = await getFeedbackStats();

    res.json({
      message: "Feedback API test completed successfully",
      testResults: {
        inserted: insertResult,
        totalEntries: fetchResult.length,
        statistics: stats
      }
    });

  } catch (error) {
    console.error("Test failed:", error);
    res.status(500).json({
      error: "Feedback API test failed",
      details: error.message
    });
  }
};
