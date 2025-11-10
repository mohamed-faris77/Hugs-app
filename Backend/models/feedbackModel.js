import pool from '../config/database.js';

export const createFeedback = async (feedbackData) => {
  const { name, phone, message, rating } = feedbackData;
  const result = await pool.query(
    "INSERT INTO feedback (name, phone, message, rating, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
    [name, phone, message, rating]
  );
  return result.rows[0];
};

export const getAllFeedback = async () => {
  const result = await pool.query("SELECT * FROM feedback ORDER BY created_at DESC");
  return result.rows;
};

export const getFeedbackStats = async () => {
  const result = await pool.query(`
    SELECT
      COUNT(*) as total_feedback,
      AVG(CASE
        WHEN rating = 'happy' THEN 5
        WHEN rating = 'normal' THEN 3
        WHEN rating = 'sad' THEN 1
        ELSE 0
      END) as average_rating,
      COUNT(CASE WHEN rating = 'happy' THEN 1 END) as happy_count,
      COUNT(CASE WHEN rating = 'normal' THEN 1 END) as normal_count,
      COUNT(CASE WHEN rating = 'sad' THEN 1 END) as sad_count
    FROM feedback
  `);

  const stats = result.rows[0];
  return {
    totalFeedback: parseInt(stats.total_feedback),
    averageRating: parseFloat(stats.average_rating || 0).toFixed(1),
    ratingBreakdown: {
      happy: parseInt(stats.happy_count),
      normal: parseInt(stats.normal_count),
      sad: parseInt(stats.sad_count)
    }
  };
};
