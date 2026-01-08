CREATE TABLE IF NOT EXISTS maintenance (
  id INT PRIMARY KEY,
  enabled BOOLEAN DEFAULT 0,
  message VARCHAR(255) DEFAULT 'Bakımdayız.'
);
